/** API routes for questions. */

const db = require("../db");
const express = require("express");
const probe = require('probe-image-size');
const Scraper = require('image-scraper');
const router = new express.Router();

router.get("/", async function (req, res, next) {

  let   address = 'https://www.brothers-brick.com/'
      
  async function getBiggest(){
    
    let results = []

    let scraper = new Scraper(address)

    await scraper.scrape(function(image){
        results.push(image.address)
    })

    return results
  }

  let urls = getBiggest().then((res)=>{
    return res
  })

  console.log(urls)
  
  return ;

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
