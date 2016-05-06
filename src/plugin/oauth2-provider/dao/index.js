'use strict'

const mongoose = require('mongoose')
const Client = require('./client')
const AccessToken = require('./access-token')
const RefreshToken = require('./refresh-token')
const AuthorizationCode = require('./authorization-code')
const User = require('../../../models').User

/**
 * Get MongoDB URI.
 * @return {String} MongoDB string URI
 */
var getMongoDBUri = function () {
  var uri = 'mongodb://localhost/oauth2'
  if (process.env.APP_MONGO_URI) {
    uri = process.env.APP_MONGO_URI
  } else if (process.env.DB_PORT_27017_TCP) { // Docker
    uri = process.env.DB_PORT_27017_TCP.replace(/^tcp/, 'mongodb')
    uri = uri + '/oauth2'
  }
  return uri
}

var conn = mongoose.createConnection(getMongoDBUri())

module.exports = {
  User: User,
  Client: Client(mongoose, conn),
  AccessToken: AccessToken(mongoose, conn),
  RefreshToken: RefreshToken(mongoose, conn),
  AuthorizationCode: AuthorizationCode(mongoose, conn)
}

