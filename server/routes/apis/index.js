const ip = require('./v1/ip')

module.exports = function (router) {
  router.route('/api/v1/ip')
    .get(ip.get)
    .post(ip.post)
}