'use strict';

/**
 * This pages manages the branch pages
 */

let $ = require('jquery');
let Base = require('./_base');
let tplButton = require('../../../template/button.github.all.html');

module.exports = function() {
  let AllPages = new Base();

  AllPages.init = function() {
    this.setup();
  };

  /**
   * Add buttons to the page and setup the event handler
   */
  AllPages.setup = function() {
    let button;

    // Insert the kernel button right after the code button in the navigation
    // if it's there
    // We also make sure to not show it multiple times
    if (!$('.sunken-menu-group li[aria-label="Kernel Scheduling"]').length) {
      button = tplButton({
        url: '#'
      });
      $('.sunken-menu-group li[aria-label="Code"]')
        .after(button)
        .end()
        .find('li.k2-extension a')
          .click(function(e) {
            let url = $('.entry-title strong a').first().attr('href');
            // When the link is clicked, we need to take them to the homepage
            // of the repo with something in the hash.
            e.preventDefault();

            window.location = url + '#k2';

            // If we are staying on the same page, but adding the hash, then
            // we need to do a full reload
            if (url === window.location.pathname) {
              window.location.reload(true);
            }

            return false;
          });
    }
  };

  return AllPages;
};