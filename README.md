how to run this project smoothly:

in visual studio code terminal, install packages:
npm install express@4 (DO NOT INSTALL THE NORMAL EXPRESS PACKAGE, INSTALL EXPRESS VERSION 4 BECAUSE SANITIZE WORKS BEST WITH VERSION 4)
npm install cors
npm install mongoose
npm install --save-dev nodemon
npm install dotenv --save
npm install express-mongo-sanitize

use .env-example as an example on how to setup an environment, after this remove ".example" from ".env.example" and setup your port and database name whatever you like. (P.S: It's recommended to put NODE_ENV: DEVELOPMENT)
example of a MONGO uri: "mongodb://localhost:20127/example" example being your database name.

install mongodb compass and in mongodb compass: make a new server, it has to be equal to the name of the server that you set up in .env

install postman so you can use GET/POST/PUT/PATCH/DELETE easily.
