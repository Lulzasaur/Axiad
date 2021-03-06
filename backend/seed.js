const db = require("./db");

// Database DDL (for testing)
const DDL = `

  CREATE TABLE scrapes (
      id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      url TEXT,
      largest_image TEXT,
      date TEXT,
      status TEXT
  );`
;

async function seedData() {
  try {
    await db.query(DDL);
    
    //Initial seed data. Not necessary.
    // const urls = await db.query(`
    // INSERT INTO scrapes(id, url, largest_image,date,status) VALUES
    // (1, 'www.google.com','https://www.google.com/logos/doodles/2019/lucy-wills-131st-birthday-5156345727680512.2-l.png','test', 'complete')`
    // );
  } catch (err) {
    console.log("Something went wrong!");
    console.log(err);
    process.exit(1);
  }
}

seedData().then(() => {
  console.log("Successful seed!");
  process.exit();
});
