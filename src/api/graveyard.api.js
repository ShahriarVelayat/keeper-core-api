'use strict'

const controller = require('../controller')

/**
 * Gravatar API.
 */
module.exports = function (router) {
  /**
   * @api {get} /graveyard Find documents of graveyard.
   * @apiVersion 2.0.0
   * @apiName FindGhosts
   * @apiGroup graveyard
   * @apiPermission user
   *
   * @apiParam {Integer} [from]  Item index from
   * @apiParam {Integer} [size]  Nb of items to retrieve
   * @apiParam {String}  [order] Sort order (asc or desc)
   *
   * @apiSuccess {Integer}  total             Total nb of documents found.
   * @apiSuccess {Object[]} hits              Documents found.
   * @apiSuccess {String}   hits._id          ID of the document.
   * @apiSuccess {String}   hits.title        Title of the document.
   * @apiSuccess {String[]} hits.labels       Labels of the document.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "total": 123,
   *        hits: [{
   *          "_id": "544272014c7473672f95d849",
   *          "title": "Foo",
   *          "labels": ["123456789", "987654321"]
   *        },
   *        {...}
   *        ]
   *     }
   */
  router.get('/graveyard', controller.graveyard.find)

  /**
   * @api {delete} /graveyard Remove permanently all documents of the graveyard.
   * @apiVersion 2.0.0
   * @apiName EmptyGraveyard
   * @apiGroup graveyard
   * @apiPermission user
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 204 OK
   */
  router.delete('/graveyard', controller.graveyard.empty)
}