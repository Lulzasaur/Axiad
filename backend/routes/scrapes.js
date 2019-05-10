/** API routes for questions. */
const db = require("../db");
const express = require("express");
const cheerio = require('cheerio');
const rp = require('request-promise')
const router = new express.Router();

/** GET /     get all scrapes in database
 *
 *
 */
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, url, largest_image, date, status
      FROM scrapes 
      ORDER BY id
      `
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** GET /     get scrape by id
 *
 *
 */
router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT id,url, largest_image, date, status
      FROM scrapes
      WHERE id=$1
      `,
      [req.params.id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

/** POST /     add a new scrape
 *
 *
 */
router.post("/", async function (req, res, next) {
 
    try{

      const {url} = req.body;

      let dt = new Date()
      let utcDate = dt.toUTCString()

      const newUrl = await db.query(
        `INSERT INTO scrapes (url,date,status) 
          VALUES ($1,$2,$3)
          RETURNING id`,
        [url,utcDate,'loading']);

      let urlId = newUrl.rows[0].id,
          biggestImageSize=0,
          biggestImage=''
      
      //get body of URL and parse it
      let body = await rp(url),
          $ = cheerio.load(JSON.stringify(body))
         
          //for each <img> tag, get the src and parse it
          
          $('img').each(async function(i,image){
            
            let modifiedImageSrc = image.attribs.src
            if(!modifiedImageSrc) modifiedImageSrc=''
            modifiedImageSrc = modifiedImageSrc.substring(2,modifiedImageSrc.length-2)
            
            if(modifiedImageSrc){
              //send a request for each src received and find the size ('content-length)
              let imageReq = await rp({url:modifiedImageSrc,method:'HEAD'})
            
              if(imageReq['content-length']>biggestImageSize){
                biggestImageSize = imageReq['content-length']
                biggestImage = modifiedImageSrc
              }
              
              //while query is going, find the largest size so far and add to database.
              await db.query(
                `UPDATE scrapes SET largest_image=$1
                WHERE id = $2`,
                [biggestImage,urlId]);
            } 
          })
          
          //when query is completed, update database with complete status. Currently not working, must be updated.
          await db.query(
          `UPDATE scrapes SET status=$1
          WHERE id = $2`,
          ['complete',urlId])
          
      return res.json(urlId)
    } catch (err) {
      return next(err);
    }
});

/** DELETE /[id]      delete scrape...currently not used. only path created.
 * 
 *
 */
router.delete("/:id", async function (req, res, next) {
  try {
    await db.query("DELETE FROM scrapes WHERE id=$1", [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});
  
module.exports = router;
