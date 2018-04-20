import * as types from "../types/comentarios";
import { comentariosURL } from "../utils";

export function loadComentariosSuccess(comentarios,contextId) {
  return { type: types.LOAD_COMENTARIOS_SUCCESS, comentarios,contextId };
}

export function loadComentariosFailure() {
  return { type: types.LOAD_COMENTARIOS_FAILURE };
}
export function writeComentariosSuccess(objectComentario) {
    return { type: types.WRITE_COMENTARIOS_SUCCESS, objectComentario };
  }
  
  export function writeComentariosFailure() {
    return { type: types.WRITE_COMENTARIOS_FAILURE };
  }
  export function deleteComentariosSuccess(id) {
    return { type: types.DELETE_COMENTARIOS_SUCCESS, id };
  }
  
  export function deleteComentariosFailure() {
    return { type: types.DELETE_COMENTARIOS_FAILURE };
  }
  export function updateComentariosSuccess(id,objectComentario) {
    return { type: types.UPDATE_COMENTARIOS_SUCCESS, id,objectComentario };
  }
  
  export function updateComentariosFailure() {
    return { type: types.UPDATE_COMENTARIOS_FAILURE };
  }
  
  
export function loadComentarios(contextId) {
  return dispatch => {
    fetch(comentariosURL.URL)
      .then(response => response.json())
      .then(comentarios => dispatch(loadComentariosSuccess(comentarios,contextId)))
      .catch(error => {
        dispatch(loadComentariosFailure());
        alert("We could not load the page at this time.");
      });
  };
}
export function escribirComentario(userName, comentario, contextId) {
    const objectComentario = {
        name: userName,
        body: comentario,
        contextId: contextId
      }
  return dispatch => {
    fetch(comentariosURL.URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(objectComentario)
    })
      .then(comentarios => dispatch(writeComentariosSuccess(objectComentario)))
      .catch(error => {
        dispatch(writeComentariosFailure());
        alert("We can't process your petition now.");
      });
  };
}
export function borrarComentario(id) {
    
  return dispatch => {
    fetch(comentariosURL.URL+`/${id}`, {
      method: "DELETE",
    })
      .then(comentarios =>{
        dispatch(deleteComentariosSuccess(id))})
      .catch(error => {
        dispatch(deleteComentariosFailure());
        alert("We can't process your petition now.");
      });
  };
}
export function editarComentario(commentId,userName,comentario,contextId) {
    const objectComentario = {
        id:commentId,
        name: userName,
        body: comentario,
        contextId: contextId
      }
  return dispatch => {
    fetch(comentariosURL.URL+`/${commentId}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(objectComentario)
    })
      .then(comentarios => dispatch(updateComentariosSuccess(commentId,objectComentario)))
      .catch(error => {
        dispatch(updateComentariosFailure());
        alert("We can't process your petition now.");
      });
  };
}