var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");
var serviceAccount = require("../smartparking-eee98-firebase-adminsdk-7a0r5-ea86d7e4a2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartparking-eee98.firebaseio.com"
});

var db = admin.database();

router.post('/', function (req, res, next) {
  var ref = db.ref("Devices/Node-001");
  ref.once("value", (snapshot) =>{
  console.log(snapshot.val().Sensor);
  res.send(snapshot.val().Sensor);
});
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "p'Aouงง" });
});

module.exports = router;