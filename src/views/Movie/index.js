import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as movieActions from '../../actions/movieActions'
import Comentario from '../../components/Comment'

import ElementList from '../../components/ElementList'
import * as moviesActions from '../../actions/moviesActions'
import * as comentariosActions from '../../actions/comentariosActions'

class Movie extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movie: {},
            id:props.match.params.id,
            chargeMovie:false,
            comentarios:[],
            showComentarios: false,
            showRecomendados:false,
            showSimilares:false,
            moviesRelationate: [],
            comentarioEditando:{
                name:'',
                body:''
            }
        }
    }

    componentDidMount(){
        const { movieActions } = this.props
        const {id,movie} =this.state
        console.log(movie.title)
        if(!movie.title)movieActions.loadMovie(id)
        if(!movie.title)this.setState({chargeMovie:true})
    }

    componentWillReceiveProps({movie,match,moviesRelationate, comentarios}) {
        const { movieActions } = this.props
        //console.log(match.params.id)
        if(!movie.title) {
            movieActions.loadMovie(Math.floor(Math.random() * match.params.id) + 30)
        }
        this.setState({movie:movie,id:match.params.id,chargeMovie:false,moviesRelationate:moviesRelationate, comentarios:comentarios})
    }
    similares = e =>{
        const { moviesActions } = this.props
        const {showSimilares,showRecomendados} = this.state
        moviesActions.loadMoviesRelacionate(1,'similar',this.state.movie.id)
        if(showSimilares==showRecomendados) this.setState({showSimilares: !showSimilares})               
        else this.setState({showSimilares: !showSimilares,showRecomendados: !showRecomendados})
    }
    recomendados = e => {
        const { moviesActions } = this.props
        const {showRecomendados,showSimilares} = this.state   
        moviesActions.loadMoviesRelacionate(1,'recommend',this.state.movie.id) 
        if(showSimilares==showRecomendados) this.setState({showRecomendados: !showRecomendados})                
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
        const { movie,comentarios,showComentarios,showRecomendados,showSimilares,moviesRelationate,comentarioEditando  } = this.state
        const path = this.props.match.path
        return <div>
            <section className="container main movie" style={{ backgroundImage: movie.id ? `url(https://image.tmdb.org/t/p/w342/${movie.backdrop_path})` : "" }}>
              <div className="overlay" />
              <header className="row">
                <div className="col-12">
                  <h1 style={{ color: "white" }}>
                    {movie.id ? movie.title : "Loading..."}
                  </h1>
                </div>
              </header>
              <article className="row movie-item">
                <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})` }} />
                <div className="col-md-6 my-4">
                  <header className="w-100">
                    <h1>{movie.title}</h1>
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
                  <p className="d-block">{movie.overview}</p>
                </div>
              </article>
            </section>
            <section className="container main">
              <header className="row">
                <div className="col-12">
                  {showSimilares ? <h1> Peliculas Similares</h1> : ""}
                  {showRecomendados ? <h1>
                      {" "}
                      Peliculas Recomendados
                    </h1> : ""}
                </div>
              </header>
              <div className="row movie-list-wrapper">
                {!moviesRelationate ? <h2> Loading...</h2> : ""}
                {(showSimilares || showRecomendados) && moviesRelationate ? moviesRelationate.map(
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
                {showComentarios && comentarios ? <article className="col-8">
                    <header className="row">
                      <div className="col-12">
                        <h1> Comentarios</h1>
                      </div>
                      <input type="text" name="userName" id="userName" placeholder="User Name" />
                      <input type="text" name="commentBody" id="commentBody" placeholder="Comment" />
                      <button type="button" className="btn btn-primary" onClick={this.comentar}>
                        Comentar
                      </button>
                    </header>
                    {comentarios.map((comentario, i) => {
                    return <Comentario key={i} mostrarEditarComentario={this.mostrarEditarComentario} 
                    comentario={comentario} 
                    comentarioEditando={comentarioEditando}
                     i={i}
                     borrarComentario={this.borrarComentario}
                     editarComentario={this.editarComentario}
                     comentarioEditandoBody= {this.comentarioEditandoBody}
                     comentarioEditandoName={this.comentarioEditandoName}
                     /> 
                   })}
                  </article> : ""}
              </div>
            </section>
          </div>;
    }
}

function mapStateToProps(state, ownProps){
    return {
        movie: state.movie,
        moviesRelationate:state.movies,
        comentarios: state.comentarios
    }
}

function mapDispatchToProps(dispatch){
    return {
        movieActions: bindActionCreators(movieActions, dispatch),
        comentariosActions: bindActionCreators(comentariosActions, dispatch),
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)

