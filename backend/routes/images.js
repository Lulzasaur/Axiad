/** API routes for questions. */

const db = require("../db");
const express = require("express");
const probe = require('probe-image-size');
const cheerio = require('cheerio');
const rp = require('request-promise-native')
const url = require('url');
const router = new express.Router();

router.get("/", (req, res) => {

  let address = 'https://www.brothers-brick.com/',
      results = []

  rp(address)
    .then(function(body){
      let $ = cheerio.load(JSON.stringify(body))

      $('img').each(function(i,image){
        let modifiedImage = image.attribs.src
        modifiedImage? modifiedImage=modifiedImage.substring(2,modifiedImage.length-2):''
        results.push(modifiedImage)
      })
    })
    .then(function(resolve){
    console.log(results)
  })
  
      
  // async function getBiggest(){
  //   let scraper = new Scraper(address)
  //   let results = []
    
  //   await scraper.scrape(function(image){
  //     results.push(image.address)
  //   })

  //   console.log(results)

  //   return results
  // }

  // getBiggest().then((resolve)=>console.log(resolve))

});

/** POST /     add a new user with their questions
 *
 * { name, email, questions }  =>  { }
 *
 */

router.post("/", async function (req, res, next) {
    
    try {
      const {name, email, questions} = req.body;
      
      const newUser = await db.query(
        `INSERT INTO users (name, email) 
          VALUES ($1, $2)
          RETURNING id`,
        [name, email]);

      let userId = newUser.rows[0].id

      for(let question of questions){
        await db.query(
            `INSERT INTO answers (answer, user_id, question_id) 
                VALUES ($1, $2, $3)`,
            [question.answer, userId, question.id ]);
      }
      return res.status(200);
    } catch (err) {
      return next(err);
    }
  });
  
module.exports = router;
