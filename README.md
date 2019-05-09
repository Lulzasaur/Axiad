This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

This is a very simple full stack React app.  The main form takes in a name, email and answers to six GOT questions fed from a database. On submition, the name, email and answers are added to a PSQL database and the form is cleared. 

The database can be pre-seeded with information to play around with. Setup instructions are below.

## Set Up

In backend folder, we will create a database named 'sinwaves' and feed it seed data. Then, we will start the server using nodemon:

```shell
createdb sinwaves
node seed.js
nodemon server.js
```

In frontend folder:

```shell
npm start
```




