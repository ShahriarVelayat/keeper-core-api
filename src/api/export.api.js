'use strict'

const controller = require('../controller')

/**
 * Export API.
 */
module.exports = function (router) {
  /**
   * @swagger
   * /v2/exports:
   *   get:
   *     summary: Download export file
   *     tags:
   *       - Export
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/zip:
   *             schema:
   *               type: string
   *               format: binary
   *     security:
   *       - authenticated:
   *         - user
   */
  router.get('/exports', controller.exports.download)

  /**
   * @swagger
   * /v2/exports:
   *   post:
   *     summary: Schedule an export of all documents
   *     tags:
   *       - Export
   *     responses:
   *       202:
   *         description: Success
   *     security:
   *       - authenticated:
   *         - user
   */
  router.post('/exports', controller.exports.schedule)

  /**
   * @swagger
   * /v2/exports/status:
   *   get:
   *     summary: Get export status
   *     description: The response is an event stream of the export job.
   *     tags:
   *       - Export
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           text/event-stream:
   *           schema:
   *             type: string
   *             example: 'data: {progress: 20, data: {}}'
   *     security:
   *       - authenticated:
   *         - user
   */
  router.get('/exports/status', controller.exports.getStatus)
}