hi im matt and this is:

projectdeci!
basically a backend API for an e-commerce type website.
this project includes: node.js with packages, integration from mongodb and mongoose.

project made in node version: 24.16.0
and made in mongodb compass version: 1.49.8
and tested in postman version: 12.17

Before opening visual studio code, please install node.js so you can install the packages needed for the server

how to run this project smoothly:

in visual studio code terminal, install packages:
npm install express@4 (INSTALL VERSION 4 SO IT WORKS FINE WITH SANITIZE)
npm install cors
npm install mongoose
npm install --save-dev nodemon
npm install dotenv --save
npm install express-mongo-sanitize

after this go to .env.example and check it out, now remove ".example" and add your own port and database (prefered to use NODE_ENV:development)

install mongodb compass and in mongodb compass

in mongo_uri, youll name the database exactly like the database you named in compass, such as if you have a database in mongodb compass named "testreview", change mongo_uri to "mongodb://localhost:20127/testreview".

install postman so you can use GET/POST/PUT/PATCH/DELETE easily.


