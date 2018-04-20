import React from 'react'


const Comentario = props => {
    return (
       <div className="card" key={props.i}>
              <div className="card-header">
                  <h4 className="card-title  hide" hide={props.i}>{props.comentario.name}</h4>
                  <input type='text' hide={props.i} className='hidden hide' name='userNameEdit' id='userNameEdit' onChange={props.comentarioEditandoName} value={props.comentarioEditando.name}/>
         
              </div>
              <div className="card-body">
                <label className=" hide" hide={props.i}>{props.comentario.body}</label>
                <input type='text' className='hidden hide' hide={props.i} name='userBodyEdit' id='userBodyEdit' onChange={props.comentarioEditandoBody} value={props.comentarioEditando.body}/>
                <button type="button" className="btn btn-ligth m-2 hidden hide" hide={props.i} onClick = {e => {props.editarComentario(props.comentario.id,props.i)}}>Aceptar</button>

                <button type="button" className="btn btn-ligth m-2" onClick = {e => {props.mostrarEditarComentario(props.comentario,props.i)}}>Editar</button>

                <button type="button" className="btn btn-ligth m-2" onClick = {e => {props.borrarComentario(props.comentario.id)}}>Borrar</button>

            </div>
            </div>
    )}
    
    


export default Comentario