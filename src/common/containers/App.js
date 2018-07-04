import React from 'react';
import { bindActionCreators } from 'redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Animal from '../components/Animal';
import MasonryBoard from '../components/MasonryBoard';
import NotFound from '../components/NotFound';
import * as actions from '../actions';
// could also access defaultState values.
// import defaultState from '../../common/defaultState';

const mapStateToProps = state => state;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = props => (
  <div>
    <nav>
      {props.routes.map((route, i) => (
        <Link key={i} to={route.path}>
          [ {route.name} ]
        </Link>
      ))}
    </nav>
    <Switch>
      <Route path='/' exact render={() => (
        <MasonryBoard {...props} />
      )} />
      <Route path='/animal/:species?' render={routeProps => (
        <Animal {...props} {...routeProps} />
      )} />
      < Route path='/' component={NotFound} />
    </Switch>
  </div>
)

// https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
