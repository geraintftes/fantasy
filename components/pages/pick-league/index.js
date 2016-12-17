import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { leagueList } from '../../../redux/actions';
import { getLeagueList } from '../../../lib/internal-api';
import StandardLayout from '../../layouts/standard';

const pageName = 'PickLeague';

if (process.env.CLIENT_RENDER) {
  require('./styles.less')
}

class PickLeague extends Component {
  static fetchData(dispatch, { leaguesList }) {
    return leagueList(Promise.resolve(leaguesList), pageName)(dispatch);
  }

  componentDidMount() {
    document.title = pageName;
    if (this.props.page !== pageName) this.props.leagueList(getLeagueList(), pageName);
  }

  renderLeaguesList() {
    const newList = this.props.leaguesList;
    if (process.env.NODE_ENV !== 'production') newList.push({
      leagueId: '',
      leagueName: 'Sample League Data',

    });

    return (
      <ul className="classic-leagues--list">
        {newList.map(league => {
          return (
            <li key={league.leagueId} className="league-list-item">
              <Link to={"/standings/" + league.leagueId}>
                <span className="league-name col-9-of-10">{league.leagueName}</span>
                <span className="link--right col-1-of-10">{'>'}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return this.props.updating ?
      <span>Updating</span> // Put inside page wrapper
      :
      <div className='pick-league'>
        <StandardLayout title="Welcome to the new, improved view of Fantasy Premier League">
          <h1>League Lists</h1>

          <div className='classic-leagues--wrapper'>
            <h2>Classic Leagues</h2>
            <p>Pick a league to view the standings:</p>
            {this.props.leaguesList && this.renderLeaguesList()}
          </div>

          <div className="classic-leagues--wrapper">
            <h2>Head-to-head Leagues</h2>
            <p>... Coming soon!</p>
          </div>
        </StandardLayout>
      </div>;
  }
}

function mapStateToProps({ updating, leaguesList, page }) {
  return { updating, leaguesList, page }
}

export default connect(mapStateToProps, { leagueList })(PickLeague)