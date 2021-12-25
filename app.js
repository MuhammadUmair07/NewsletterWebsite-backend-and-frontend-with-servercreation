//jshint esversion:6
// api and sensitive data is removed . this is just a sourcecoede demo

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  // mailchimp Data
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,

      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "Sensitive data removed";
  const options = {
    method: "POST",
    auth: "Removed",
  };
  const request = https.request(url, options, function(response) {


    response.on("data", function(data) {
      console.log(JSON.parse(data));
      const recievedData = JSON.parse(data);
      if (recievedData.error_count != 0) {
        res.sendFile(__dirname + "/failure.html");
      } else {
        res.sendFile(__dirname + "/success.html");
      }
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


// Server Creation
app.listen(process.env.PORT || 3000, function() {
  console.log("Our Server is running at port 3000.");
});
