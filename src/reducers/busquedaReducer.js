import * as types from '../types/busqueda'
import initialState from './initialState'

export default function moviesReducer(state = initialState.busqueda, action){
    switch(action.type){
        case types.LOAD_BUSQUEDA_SUCCESS:
                return action.busqueda
        default:
        return state
  }
}
