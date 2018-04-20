import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux' 

import App from '../../layouts/App'
import Home from '../../views/Home'
import Movies from '../../views/Movies'
import Movie from '../../views/Movie'
import NotFound from '../../views/NotFound'
import TVShows from '../../views/TVShows'
import TVShow from '../../views/TVShow'

const Router = ({history}) => (
    <ConnectedRouter history={history}>
        <App  history={history}>
            <Switch>
                <Route path="/movie/:id" component={Movie} />
                <Route path="/movie" component={Movies} />
                <Route path="/tv/:id" component={TVShow} />
                <Route path="/tv" component={TVShows} />
                <Route exact path="/" component={Home} />
               
                <Route component={NotFound} />
            </Switch>
        </App>
    </ConnectedRouter>
)

export default Router