import * as types from '../types/tvshows'
import { tvshowsURL } from '../utils'

export function loadTVShowsSuccess(tvshows, page){
    return { type: types.LOAD_TVSHOWS_SUCCESS, tvshows, page }
}

export function loadTVShowsFailure(){
    return { type: types.LOAD_TVSHOWS_FAILURE }
}

export function loadTVShows(page = 1, endpoint = 'popular'){
    return dispatch => {
        fetch(tvshowsURL[endpoint](page))
        .then(response => response.json())
        .then(json => json.results)
        .then(tvshows => dispatch(loadTVShowsSuccess(tvshows, page)))
        .catch(error => {
            dispatch(loadTVShowsFailure())
            alert('We could not load the page at this time.')
        })
    }
}
export function loadTVShowsRelacionate(page = 1, endpoint, id){
    return dispatch => {
        fetch(tvshowsURL[endpoint](page,id))
        .then(response => response.json())
        .then(json => json.results)
        .then(tvshows => dispatch(loadTVShowsSuccess(tvshows, page)))
        .catch(error => {
            dispatch(loadTVShowsFailure())
            alert('We could not load the page at this time.')
        })
    }
}
export function deleteTVShow(id){
    
}






