'use strict';

const $ = require('jquery');
const alt = require('../alt');
const API = require('../lib/api');

class Action {
  update(data) {
    this.dispatch(data);
  }
  failed(msg) {
    this.dispatch(msg);
  }
  fetch() {
    this.dispatch();

    API.getScrapersIssues((err, data) => {
      if (err) {
        return this.actions.failed(err);
      }

      // Update the tab counter
      $('[data-key="scrapers"] .counter').html(data.length);

      this.actions.update(data);
    });
  }
}

module.exports = alt.createActions(Action);
