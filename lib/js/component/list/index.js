'use strict';

/**
 * List
 *
 * Display a list of items depending on the type
 *
 * @param {array} data which will be displayed as items
 * @param {object} options
 */

let React = require('react');
let ListItemIssue = require('../list-item/issue');
let ListItemPull = require('../list-item/pull');
let ListItemForm = require('../list-item/form');

module.exports = React.createClass({
  getInitialState() {
    return this.props.store.getState();
  },

  fetch() {
    this.props.action.fetch();
  },

  componentDidMount() {
    // Listen to our store
    this.props.store.listen(this.onStoreChange);
  },

  componentWillUnmount() {
    // Stop listening to our store
    this.props.store.unlisten(this.onStoreChange);
  },

  onStoreChange() {
    // Update our state when the store changes
    this.setState(this.props.store.getState());
  },

  /**
   * Gets the items to display using the proper item
   * component
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-06-10
   *
   * @return {array}
   */
  _getItems: function() {
    let type = this.props.type;
    let options = this.props.options;

    return this.state.data.map(function(item) {
      let result;
      switch (type) {
        case 'issue': result = (<ListItemIssue key={item.id} data={item} options={options} />); break;
        case 'pull': result = (<ListItemPull key={item.id} data={item} options={options} />); break;
        case 'form': result = (<ListItemForm key={item.id} data={item} options={options} />); break;
      }
      return result;
    });
  },

  render: function() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.data.length) {
      return (
        <div className="blankslate capped clean-background">
          <span className="mega-octicon octicon-thumbsup"></span>
          <h3>{this.props.emptyTitle}</h3>
          <p>{this.props.emptyText}</p>
        </div>
      );
    }

    return (
      <div>
        {this._getItems()}
      </div>
    );
  }
});