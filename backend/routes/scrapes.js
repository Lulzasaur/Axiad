/** API routes for questions. */
const db = require("../db");
const express = require("express");
const probe = require('probe-image-size');
const cheerio = require('cheerio');
const rp = require('request-promise-native')
const router = new express.Router();

/** GET /     get all url's in database with largest images
 *
 *
 */
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, url, largest_image
      FROM scrapes 
      ORDER BY id
      `
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** POST /     add a new url
 *
 *
 */

router.post("/", async function (req, res) {
 
    try{

      const {url} = req.body;

      const newUrl = await db.query(
        `INSERT INTO scrapes (url) 
          VALUES ($1)
          RETURNING id`,
        [url]);

      let urlId = newUrl.rows[0].id

      let biggestImageSize=0,
          biggestImage=''

      rp(url)
      .then(function(body){
        let $ = cheerio.load(JSON.stringify(body))

        $('img').each(function(i,image){
          let modifiedImageSrc = image.attribs.src
          if(!modifiedImageSrc) modifiedImageSrc=''
          modifiedImageSrc = modifiedImageSrc.substring(2,modifiedImageSrc.length-2)

          probe(modifiedImageSrc)
          .then(async (result)=>{
              if(result.length>biggestImageSize){
                biggestImageSize = result.length
                biggestImage = modifiedImageSrc

                const updateUrl = await db.query(
                  `UPDATE scrapes SET largest_image=$1
                  WHERE id = $2 
                  RETURNING id, largest_image`,
                  [biggestImage,urlId]);
              }
          })
          .catch((error=>{
            console.log(error)
          }))
        }) 
      })
      return res.status(200);
    } catch (err) {
      return next(err);
    }
  });
  
module.exports = router;
