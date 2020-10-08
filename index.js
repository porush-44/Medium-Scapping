const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.use(expressLayouts);
app.use(bodyParser.json());

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assests"));

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
