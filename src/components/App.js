import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Loadable from 'react-loadable'

import Head from './Head'

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading: () => <div>Loading...</div>,
})

const LoadableAqIndex = Loadable({
  loader: () => import(/* webpackChunkName: 'aq-index' */ './aq-index'),
  loading: () => <div>Loading...</div>,
})

const App = () => (
  <div className="app">
    <Head />

    <nav aria-label="main navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>{' '}
      <NavLink exact to="/aq-index" activeClassName="active">
        Calculate quality
      </NavLink>
    </nav>

    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/aq-index" component={LoadableAqIndex} />
      </Switch>
    </main>

    <footer />
  </div>
)

export default App
