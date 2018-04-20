import * as types from '../types/comentarios'
import initialState from './initialState'

export default function comentariosReducer(state = initialState.comentarios, action){
    switch(action.type){
        case types.LOAD_COMENTARIOS_SUCCESS:
            return action.comentarios.filter(elem => elem.contextId === action.contextId)
        case types.WRITE_COMENTARIOS_SUCCESS:
        return [
            ...state,
            action.objectComentario,
        ]
        case types.DELETE_COMENTARIOS_SUCCESS:
        console.log( state.filter(elem => elem.id !== action.id ))
        return [
            ...state.filter(elem => elem.id !== action.id )

        ]
        case types.UPDATE_COMENTARIOS_SUCCESS:
        const index = state.findIndex(elem => {return elem.id===action.id})
        console.log(index)
        return [
            ...state.slice(0,index),
            {...state[index], ...action.objectComentario},
            ...state.slice(index+1,state.length)

        ]
        default:
            return state
  }
}
