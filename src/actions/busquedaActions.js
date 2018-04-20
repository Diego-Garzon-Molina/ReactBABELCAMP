import * as types from '../types/busqueda'
import { busquedaURL } from '../utils'

export function loadBusquedaSuccess(busqueda, page){
    return { type: types.LOAD_BUSQUEDA_SUCCESS, busqueda, page }
}

export function loadBusquedaFailure(){
    return { type: types.LOAD_BUSQUEDA_FAILURE }
}

export function loadBusqueda(query){
    return dispatch => {
        fetch(busquedaURL['busqueda'](query))
        .then(response => response.json())
        .then(json => json.results)
        .then(busqueda => dispatch(loadBusquedaSuccess(busqueda)))
        .catch(error => {
            dispatch(loadBusquedaFailure())
            alert('We could not load the page at this time.')
        })
    }
}






