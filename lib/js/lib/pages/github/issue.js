'use strict';

/**
 * This pages manages the issue page
 */

const $ = require('jquery');
const Base = require('./_base');
const K2picker = require('../../../module/k2picker/index');
const K2pickerType = require('../../../module/k2pickertype/index');
const K2pickerArea = require('../../../module/k2pickerarea/index');
const ToggleReview = require('../../../module/togglereview/index');

const refreshPicker = function () {
  if (!$('.k2picker-wrapper').length) {
    $('.sidebar-labels').after(`
      <div class="discussion-sidebar-item js-discussion-sidebar-item no-border k2pickerarea-wrapper"></div>
      <div class="discussion-sidebar-item js-discussion-sidebar-item no-border k2picker-wrapper"></div>
      <div class="discussion-sidebar-item js-discussion-sidebar-item no-border k2pickertype-wrapper"></div>
      <div class="discussion-sidebar-item js-discussion-sidebar-item no-border k2togglereviewing-wrapper"></div>`);
    new K2picker().draw();
    new K2pickerType().draw();
    new K2pickerArea().draw();
    new ToggleReview().draw();
  }
};

module.exports = function () {
  const IssuePage = new Base();

  /**
   * Add buttons to the page and setup the event handler
   */
  IssuePage.urlPath = '^(/[\\w-]+/[\\w-]+/issues/[0-9]+)$';

  /**
   * Add buttons to the page and setup the event handler
   */
  IssuePage.setup = function() {
    setInterval(refreshPicker, 500);
  };

  return IssuePage;
};
