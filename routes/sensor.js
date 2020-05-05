var express = require('express')
var router = express.Router()

var admin = require('firebase-admin')
var serviceAccount = require('../smartparking-eee98-firebase-adminsdk-7a0r5-ea86d7e4a2.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smartparking-eee98.firebaseio.com'
})

var sensor = []
var db = admin.database()
var ref = db.ref('Devices')
ref.on('value', (snapshot) => {
  const sensorArr = Object.values(snapshot.val()).map(({ Sensor }) => Sensor)

  const filterSensor = sensorArr.map((sensor) => {
    if (sensor > 1200) {
      return 0
    } else {
      return 1
    }
  })
  console.log('filterSensor: ', filterSensor)
  sensor = filterSensor
})

/* GET page. */
router.get('/', function (req, res, next) {
  res.json(sensor)
})

module.exports = router
