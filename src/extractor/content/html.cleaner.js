'use strict'

const _ = require('lodash')
const url = require('url')
const logger = require('../../helper').logger
const validators = require('../../helper').validators

const blacklistedAttributes = [
  'class', 'id'
]

/**
 * Remove node with blacklisted source.
 * @param {Object} node DOM node
 * @return {Object} DOM node
 */
const filterBlacklistedSites = function (node) {
  if (!node) {
    return null
  }
  const src = node.getAttribute('src') ||
    node.getAttribute('href') ||
    node.getAttribute('data-src')
  if (src && validators.isBlacklisted(src)) {
    logger.debug('Removing blacklisted source: %s', src)
    node.parentNode.removeChild(node)
    // Break the chain.
    return null
  } else {
    // Continue filter chain
    return node
  }
}

/**
 * Remove blacklisted attributes.
 * @param {Object} node DOM node
 * @return {Object} DOM node
 */
const filterAttributes = function (node) {
  if (!node) {
    return null
  }
  blacklistedAttributes.forEach(function (attr) {
    if (node.hasAttribute(attr)) {
      // logger.debug('Removing blacklisted attribute: %s', attr);
      node.removeAttribute(attr)
    }
  })
  return node
}

/**
 * Filter images src.
 * - Change src attribute into 'app-src' attribute.
 * - Remove 1px images.
 * - Fix relative URL into absolute.
 * @param {Object} document DOM
 */
const filterImages = function (document, options) {
  var images = document.getElementsByTagName('img')
  for (var i = 0; i < images.length; ++i) {
    var image = images[i]

    if (image.hasAttribute('app-src')) {
      image.removeAttribute('src')
    } else {
      // Remove 1px images
      if (image.hasAttribute('height') || image.hasAttribute('width')) {
        const height = image.getAttribute('height')
        const width = image.getAttribute('width')
        if (height === 1 && width === 1) {
          logger.debug('Removeing 1px image: %s', image.getAttribute('src'))
          image.parentNode.removeChild(image)
          return
        }
      }
      var src = image.getAttribute('src') || image.getAttribute('data-src')
      if (src) {
        // Create absolute URL if possible
        if (options && options.baseUrl && !/^https?:\/\//i.test(src)) {
          src = url.resolve(options.baseUrl, src)
        }
        // Swapping src and app-src attributes.
        image.removeAttribute('src')
        image.removeAttribute('data-src')
        image.setAttribute('app-src', src)
      }
    }
  }
}

/**
 * Filter links href.
 * - Add target _blank.
 * @param {Object} document DOM
 */
const filterLinks = function (document /*, options*/) {
  var links = document.getElementsByTagName('a')
  for (var i = 0; i < links.length; ++i) {
    var link = links[i]
    if (link.hasAttribute('href')) {
      link.setAttribute('target', '_blank')
    }
  }
}

/**
 * HTML cleaner.
 * @module cleaner
 */
module.exports = {
  /**
   * HTML cleanup chain.
   * @param {Object} document DOM
   * @param {Object} options options
   * @return {String} cleaned HTML
   */
  cleanup: function (document, options) {
    // Filter all nodes...
    var nodes = document.getElementsByTagName('*')
    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i]
      var filterChain = _.flow(
        filterBlacklistedSites,
        filterAttributes
      )
      filterChain(node)
    }

    // Filter images...
    filterImages(document, options)
    // Filter links...
    filterLinks(document, options)
    // Return document.
    return document
  }
}
