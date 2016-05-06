'use strict'

const crypto = require('crypto')

/**
 * Get a hashed name.
 * The name can be a file name or an url.
 * @param {String} name
 * @returns {String} hash
 */
const getHashName = function (name) {
  // Clean query if URL
  const cleanName = name.replace(/\?.*$/, '')
  // Extract extension
  let ext = cleanName.split('.').pop()
  if (ext) {
    ext = ext.match(/^[a-zA-Z0-9]+/)[0]
  }
  // Return hash
  return crypto.createHash('md5').update(cleanName).digest('hex') + (ext ? '.' + ext : '')
}

/**
 * Hash helper.
 * @module hash
 */
module.exports = {
  hashUrl: getHashName,
  hashFilename: getHashName
}

