const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const pageRoute = require("./routes/student.routes");

//require template  engine
const expressLayout = require("express-ejs-layouts");
  
//init express
const app = express();

//environment variables
dotenv.config();
const port = process.env.PORT || 5005;
const hostname = process.env.HOST_NAME;

//static folder
app.use("/", express.static("public"));

//init json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ejs init
app.set("view engine", "ejs");
app.use(expressLayout);
 
//change layout file
app.set("layout", "layouts/layout");

//routes    
app.use("/students", pageRoute);

//server listen
app.listen(port, hostname, () => {
  console.log(
    `server is running on http://${hostname}:${port}/students`.bgGreen
  );
});
 