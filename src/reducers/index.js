import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import movies from './moviesReducer'
import movie from './movieReducer'
import tvshows from './tvshowsReducer'
import tvshow from './tvshowReducer'
import comentarios from './comentariosReducer'
import busqueda from './busquedaReducer'

const rootReducer = combineReducers({
    movies, 
    movie,
    tvshows,
    tvshow,
    comentarios,
    busqueda,
    router: routerReducer
})

export default rootReducer
