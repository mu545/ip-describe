const https = require('https')
const { body, validationResult } = require('express-validator')

function validationInput(req, res, next) {
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ err: errors.array({ onlyFirstError: true }) })
  } else {
    next()
  }
}

function getInput(req, res, next) {
  res.locals.input = {
    ip: req.headers['x-forwarded-for']
  }

  next()
}

function lookUpIp(req, res, next) {
  let options = {
    'method': 'GET',
    'hostname': 'jkosgei-free-ip-geolocation-v1.p.rapidapi.com',
    'port': null,
    'path': `/${res.locals.input.ip}?api-key=test`,
    'headers': {
      'x-rapidapi-host': 'jkosgei-free-ip-geolocation-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  }
  let fetchIp = https.request(options, function(getIp){
    let chunks = []

    getIp.on('data', function (chunk) {
      chunks.push(chunk)
    })

    getIp.on('end', function () {
      res.locals.info = JSON.parse(Buffer.concat(chunks))

      if (typeof res.locals.info.message != 'undefined') {
        res.status(400).json({err: res.locals.info.message})
      } else {
        next()
      }
    })
  })
  fetchIp.on('error', function (err) {
    res.status(400).json({ err: err.message })
  })
  fetchIp.end()
}

function createInput(req, res, next) {
  req.body.ip = req.body.ip.replace(/[^\d|\.]/g, '')

  res.locals.input = {
    ip: req.body.ip
  }

  next()
}

module.exports.get = [
  validationInput,
  getInput,
  lookUpIp,
  function (req, res) {
    let info = {
      ip,
      is_eu,
      city,
      region,
      region_code,
      country_name,
      country_code,
      continent_name,
      continent_code,
      latitude,
      longitude,
      asn,
      organisation,
      posta,
      calling_code,
      flag,
      emoji_flag,
      emoji_unicode,
      carrier,
      languages,
      currency,
      time_zone,
      threat,
      count
    } = res.locals.info

    res.json({
      info
    })
  }
]

module.exports.post = [
  body('ip')
    .exists({ checkFalsy: true }).withMessage('ip address is required'),
  validationInput,
  createInput,
  lookUpIp,
  function (req, res) {
    let info = {
      ip,
      is_eu,
      city,
      region,
      region_code,
      country_name,
      country_code,
      continent_name,
      continent_code,
      latitude,
      longitude,
      asn,
      organisation,
      posta,
      calling_code,
      flag,
      emoji_flag,
      emoji_unicode,
      carrier,
      languages,
      currency,
      time_zone,
      threat,
      count
    } = res.locals.info

    res.json({
      info
    })
  }
]