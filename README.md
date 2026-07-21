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
npm install mongoose
npm install --save-dev nodemon
npm install dotenv --save
npm install express-mongo-sanitize

after this go to .env.example and check it out, now remove ".example" and add your own port and database (prefered to use NODE_ENV:development)

install mongodb compass and in mongodb compass

in mongo_uri, youll name the database exactly like the database you named in compass, such as if you have a database in mongodb compass named "testreview", change mongo_uri to "mongodb://localhost:27017/testreview".

install postman so you can use GET/POST/PUT/PATCH/DELETE easily.
and there will be variables named {{baseUrl}} and others,
for baseUrl just take the localhost url that you ran the server on
for productid run get in product and pick a random productid from what was sent
for categoryid same thing but in category, pick a random categoryid and put it in the variable
for orderid same thing but in order, pick a random orderid and put it in the variable


finally, when everything is ready, run these two commands in order.
npm run seed (to put test products and categories)
npm run start (to start the server.)
npm run dev (optional) (this is if you want to see what happens behind the scene)

thanks for downloading and reviewing :)