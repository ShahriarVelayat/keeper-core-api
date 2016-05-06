'use strict'

const controller = require('../controller')

/**
 * User API.
 */
module.exports = function (router) {
  /**
   * @apiDefineSuccessStructure User
   * @apiSuccess {String}  uid              ID of the User (email).
   * @apiSuccess {String}  username         Name of the User.
   * @apiSuccess {String}  publicAlias      Public alias of the User.
   * @apiSuccess {Date}    date             Date of the registration.
   * @apiSuccess {Object}  twitter             Twitter configuration.
   * @apiSuccess {Object}  twitter.screen_name Twitter alias.
   * @apiSuccess {Object}  twitter.user_id     Twitter ID.
   * @apiSuccess {Object}  pocket              Pocket configuration.
   * @apiSuccess {Object}  twitter.username    Pocket username.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "uid": "jhon.doe@foo.bar",
   *       "username": "Jhon Doe",
   *       "publicAlias": "jdoe",
   *       "date": "1373964740026"
   *     }
   */

  /**
   * @api {get} /user/current Request current user information
   * @apiVersion 0.0.1
   * @apiName GetUser
   * @apiGroup user
   * @apiPermission user
   *
   * @apiSuccessStructure User
   */
  router.get('/user/current', controller.user.get)

  /**
   * @api {put} /user/current Update current user information
   * @apiVersion 0.0.1
   * @apiName UpdateUser
   * @apiGroup user
   * @apiPermission user
   *
   * @apiParam {String}  publicAlias Public alias of the User.
   *
   * @apiSuccessStructure User
   */
  router.put('/user/current', controller.user.update)
}
