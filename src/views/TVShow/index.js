import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ElementList from '../../components/ElementList'
import * as tvshowActions from '../../actions/tvshowActions'
import * as comentariosActions from '../../actions/comentariosActions'
import * as tvshowsActions from '../../actions/tvshowsActions'


class TVShow extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            tvshow: {},
            comentarios: [],
            showComentarios: false,
            showRecomendados:false,
            showSimilares:false,
            tvShowsRelationate:[],
            comentarioEditando:{
                name:'',
                body:''
            }
        }
    }

    componentDidMount(){
        const { tvshowActions, match } = this.props
        tvshowActions.loadTVShow(match.params.id)
    }

    componentWillReceiveProps({tvshow,comentarios,tvShowsRelationate}) {
        this.setState({tvshow,comentarios,tvShowsRelationate})
    }
    similares = e =>{
        const { tvshowsActions } = this.props
        const {showSimilares,showRecomendados} = this.state
        tvshowsActions.loadTVShowsRelacionate(1,'similar',this.state.tvshow.id)
        if(showSimilares===showRecomendados) this.setState({showSimilares: !showSimilares})               
        else this.setState({showSimilares: !showSimilares,showRecomendados: !showRecomendados})
    }
    recomendados = e => {
        const { tvshowsActions } = this.props
        const {showRecomendados,showSimilares} = this.state   
        tvshowsActions.loadTVShowsRelacionate(1,'recommend',this.state.tvshow.id) 
        if(showSimilares===showRecomendados) this.setState({showRecomendados: !showRecomendados})                   
        else this.setState({showRecomendados: !showRecomendados,showSimilares: !showSimilares})
    }
    comentarios = e => {
        const {comentariosActions} = this.props
        comentariosActions.loadComentarios(this.props.match.params.id)
        const {showComentarios} = this.state
        this.setState({showComentarios: !showComentarios})
        
    }
    comentar = e => {
        const {comentariosActions} = this.props
        const userName = document.getElementById('userName').value
        const commentBody = document.getElementById('commentBody').value
        comentariosActions.escribirComentario(userName,commentBody, this.props.match.params.id)
    }
    borrarComentario = comentarioId => {
        const {comentariosActions} = this.props
        comentariosActions.borrarComentario(comentarioId)
    }
    mostrarEditarComentario = (comentario,i) => {
       
        document.querySelectorAll(`[hide='${i}']`).forEach((elem=>
        {
           elem.classList.toggle('hidden')
        }
        ))
        this.setState({comentarioEditando:comentario})
       
    }
    editarComentario = (commentId,i)  => {
        
        document.querySelectorAll(`[hide='${i}']`).forEach((elem=>
            {
               elem.classList.toggle('hidden')
            }
            ))
        const {comentariosActions} = this.props
       
       const name= document.getElementById("userNameEdit").value
       const body= document.getElementById("userBodyEdit").value
        comentariosActions.editarComentario(commentId,name,body, this.props.match.params.id)
    }
    comentarioEditandoName = objEven =>{
        let {comentarioEditando} = this.state
        this.setState({
            comentarioEditando: {
                ...comentarioEditando,
                name: objEven.target.value
            }
        })
      
    }
    comentarioEditandoBody = objEven =>{
        let {comentarioEditando} = this.state
        this.setState({
            comentarioEditando: {
                ...comentarioEditando,
                body: objEven.target.value
            }
        })
        
    }

    render() {
        const { tvshow,comentarios,showComentarios,showRecomendados,showSimilares,tvShowsRelationate,comentarioEditando } = this.state
        const path = this.props.match.path
      
        return <div>
            <section className="container main movie" style={{ backgroundImage: tvshow.id ? `url(https://image.tmdb.org/t/p/w342/${tvshow.backdrop_path})` : "" }}>
              <div className="overlay" />
              <header className="row">
                <div className="col-12">
                  <h1 style={{ color: "white" }}>
                    {tvshow.id ? tvshow.title : "Loading..."}
                  </h1>
                </div>
              </header>
              <article className="row movie-item">
                <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${tvshow.poster_path})` }} />
                <div className="col-md-6 my-4">
                  <header className="w-100">
                    <h1>{tvshow.title}</h1>
                  </header>
                  <div>
                    <button type="button" className="btn btn-primary" onClick={this.similares}>
                      Similares
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.recomendados}>
                      Recomendados
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.comentarios}>
                      Comentarios
                    </button>
                  </div>
                  <p className="d-block">{tvshow.overview}</p>
                </div>
              </article>
            </section>
            <section className="container main">
              <header className="row">
                <div className="col-12">
                  {showSimilares ? <h1> TV Shows Similares</h1> : ""}
                  {showRecomendados ? <h1>
                      {" "}
                      TV Shows Recomendados
                    </h1> : ""}
                </div>
              </header>
              <div className="row movie-list-wrapper">
                {!tvShowsRelationate ? <h2> Loading...</h2> : ""}
                {(showSimilares || showRecomendados) && tvShowsRelationate ? tvShowsRelationate.map(
                      (tvshow, i) => {
                        return (
                          <ElementList
                            path={path}
                            deleteElement={this.deleteElement}
                            key={i}
                            {...tvshow}
                          />
                        );
                      }
                    ) : ""}
                {showComentarios && comentarios ? 
                <article className="col-8">
                    <header className="row">
                      <div className="col-12">
                        <h1> Comentarios</h1>
                      </div>
                      <input type='text' name='userName' id='userName' placeholder = 'User Name'/>
                      <input type='text' name='commentBody' id='commentBody' placeholder = 'Comment'/>
                      <button type="button" className="btn btn-primary" onClick={this.comentar}>
                          Comentar
                        </button>
                    </header>
                        {comentarios.map((comentario,i) => {
                          return   <div className="card" key={i}>
                          <div className="card-header">
                              <h4 className="card-title  hide" hide={i}>{comentario.name}</h4>
                              <input type='text' hide={i} className='hidden hide' name='userNameEdit' id='userNameEdit' onChange={this.comentarioEditandoName} value={comentarioEditando.name}/>
                     
                          </div>
                          <div className="card-body">
                            <label className=" hide" hide={i}>{comentario.body}</label>
                            <input type='text' className='hidden hide' hide={i} name='userBodyEdit' id='userBodyEdit' onChange={this.comentarioEditandoBody} value={comentarioEditando.body}/>
                            <button type="button" className="btn btn-ligth m-2 hidden hide" hide={i} onClick = {e => {this.editarComentario(comentario.id,i)}}>Aceptar</button>
            
                            <button type="button" className="btn btn-ligth m-2" onClick = {e => {this.mostrarEditarComentario(comentario,i)}}>Editar</button>
            
                            <button type="button" className="btn btn-ligth m-2" onClick = {e => {this.borrarComentario(comentario.id)}}>Borrar</button>
            
                        </div>
                        </div>
                        })}
                  </article> : ""}
              </div>
            </section>
          </div>;
    }
}

function mapStateToProps(state, ownProps){ 
  
    return {
        tvshow: state.tvshow,
        tvShowsRelationate: state.tvshows,
        comentarios: state.comentarios,
        
    }
}

function mapDispatchToProps(dispatch){
    return {
        tvshowActions: bindActionCreators(tvshowActions, dispatch),
        comentariosActions: bindActionCreators(comentariosActions, dispatch),
        tvshowsActions:  bindActionCreators(tvshowsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShow)

