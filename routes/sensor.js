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

/* GET page. */
router.get('/:namePlace', function (req, res, next) {
  const {namePlace} = req.params

  ref.on('value', (snapshot) => {
    const sensorArr = Object.values(snapshot.val()).map(({Place: {name}, Sensor }) => ({name,Sensor}))
    const filterSensor = sensorArr.filter((e) => e.name === `${namePlace}` )
    const setSensor = filterSensor.map((e,i) => {
     if (e.Sensor > 1200) {
        return 0
      } else {
        return 1
      }
    })
    sensor = setSensor
  })

  res.json(sensor)
})

module.exports = router
