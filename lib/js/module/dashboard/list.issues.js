'use strict';
/* global console */

const React = require('react');
const prefs = require('../../lib/prefs');
const Tabs = require('../../component/tabs/tabs');
const PanelList = require('../../component/panel/list');

const StoreIssueHourly = require('../../store/issue.hourly');
const StoreIssueDaily = require('../../store/issue.daily');
const StoreIssueWeekly = require('../../store/issue.weekly');
const StoreIssueMonthly = require('../../store/issue.monthly');
const StoreIssueNone = require('../../store/issue.none');
const StorePullAssigned = require('../../store/pull.assigned');
const StorePullAuthored = require('../../store/pull.authored');
const StoreIssueWeb = require('../../store/issue.web');
const StoreIssueCore = require('../../store/issue.core');
const StoreIssueIntegrations = require('../../store/issue.integrations');
const StoreIssueScrapers = require('../../store/issue.scrapers');
const StoreIssueArea51 = require('../../store/issue.area51');

const ActionsIssueHourly = require('../../action/issue.hourly');
const ActionsIssueDaily = require('../../action/issue.daily');
const ActionsIssueWeekly = require('../../action/issue.weekly');
const ActionsIssueMonthly = require('../../action/issue.monthly');
const ActionsIssueNone = require('../../action/issue.none');
const ActionsPullAssigned = require('../../action/pull.assigned');
const ActionsPullAuthored = require('../../action/pull.authored');
const ActionsIssueWeb = require('../../action/issue.web');
const ActionsIssueCore = require('../../action/issue.core');
const ActionsIssueIntegrations = require('../../action/issue.integrations');
const ActionsIssueScrapers = require('../../action/issue.scrapers');
const ActionsIssueArea51 = require('../../action/issue.area51');

module.exports = React.createClass({
  propTypes: {
    pollInterval: React.PropTypes.number
  },

  /**
   * Sign out the user so they are prompted for their password again
   */
  signOut() {
    prefs.clear('ghPassword');
    window.location.reload(true);
  },

  render() {
    let listOptions = {
      emptyTitle: 'No Issues Here',
      emptyText: 'You completed all issues'
    };
    return (
      <div className="issueList">

        <div className="legend">
          <button onClick={this.signOut} className="btn tooltipped tooltipped-sw" aria-label="Sign Out">Sign Out</button>

          <br />
          <div className="issue reviewing">Under Review</div>
          <div className="issue overdue">Overdue</div>
          <div className="issue"><sup>B</sup> Bug</div>
          <div className="issue"><sup>T</sup> Task</div>
          <div className="issue"><sup>F</sup> Feature</div>
        </div>

        <div className="columns">
          <div className="one-fifth column">
            <PanelList title="Hourly" extraClass="hourly" action={ActionsIssueHourly} store={StoreIssueHourly} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="Daily" extraClass="daily" action={ActionsIssueDaily} store={StoreIssueDaily} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="Weekly" extraClass="weekly" action={ActionsIssueWeekly} store={StoreIssueWeekly} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="Monthly" extraClass="monthly" action={ActionsIssueMonthly} store={StoreIssueMonthly} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="None" extraClass="none" action={ActionsIssueNone} store={StoreIssueNone} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
        </div>
        <br />
        <div>
          <PanelList title="Pull Requests - Assigned to You" action={ActionsPullAssigned} store={StorePullAssigned} options={{showAssignee: false}} item="pull" pollInterval={this.props.pollInterval} />
        </div>
        <br />
        <div>
          <PanelList title="Pull Requests - You Created" action={ActionsPullAuthored} store={StorePullAuthored} options={{showAssignee: true}} item="pull" pollInterval={this.props.pollInterval} />
        </div>
        <br />
        <div>
          <Tabs
            items={[
              {
                title: 'Web',
                icon: 'octicon-globe',
                id: 'web'
              },
              {
                title: 'Core',
                icon: 'octicon-circuit-board',
                id: 'core'
              },
              {
                title: 'Integrations',
                icon: 'octicon-plug',
                id: 'integrations'
              },
              {
                title: 'Scrapers',
                icon: 'octicon-credit-card',
                id: 'scrapers'
              },
              {
                title: 'Area51',
                icon: 'octicon-credit-card',
                id: 'area51'
              }
            ]}
          >
            <PanelList id="web" title="Things to Work On" action={ActionsIssueWeb} store={StoreIssueWeb} item="issue" pollInterval={this.props.pollInterval} />
            <PanelList id="core" title="Things to Work On" action={ActionsIssueCore} store={StoreIssueCore} item="issue" pollInterval={this.props.pollInterval} />
            <PanelList id="integrations" title="Things to Work On" action={ActionsIssueIntegrations} store={StoreIssueIntegrations} item="issue" pollInterval={this.props.pollInterval} />
            <PanelList id="scrapers" title="Things to Work On" action={ActionsIssueScrapers} store={StoreIssueScrapers} item="issue" pollInterval={this.props.pollInterval} />
            <PanelList id="area51" title="Things to Work On" action={ActionsIssueArea51} store={StoreIssueArea51} item="issue" pollInterval={this.props.pollInterval} />
          </Tabs>
        </div>
      </div>
    );
  }
});
