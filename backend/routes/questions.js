/** API routes for questions. */

const db = require("../db");
const express = require("express");
const router = new express.Router();

/** GET /   get 6 questions from DB
 *
 * Returns:
 *
 * => [ question1,question2,
 *      ...
 *    ]
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT question, id
      FROM questions 
      ORDER BY id
      `
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
