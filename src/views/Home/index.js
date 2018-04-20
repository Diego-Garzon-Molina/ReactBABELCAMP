import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Movie from '../../views/Movie'

import * as moviesActions from '../../actions/moviesActions'

class Home extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movie:{},
        }
    }

    componentDidMount(){
        const { movie } = this.state
        fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => {return response.json()})
        .then(movie =>{
            console.log(movie)
             this.setState({movie:movie})})
    }


   

    render () {
        const { movie } = this.state
        const match = {params: { id: movie.id}}
        return (
            <section className="container main home">
                <header className="row">
                    <div className="col-12">
                        <h1>Home</h1>
                    </div>
                </header>
                <Movie match={match}/>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movies: state.movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

