import React from 'react'
import { Link } from 'react-router-dom'

const ElementList = ({poster_path, id, title, original_name, overview, path, deleteElement}) => (
    <article 
        className="col-md-3 my-4 movie-item"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${poster_path})`}}
    >
        <div className="overlay">
            <header className="w-100 pt-3 px-3">
                <Link className="d-block" to={`${path}/${id}`}>{title}</Link>
                <Link className="d-block" to={`${path}/${id}`}>{original_name}</Link>
            </header>
            <p>{overview}
            <button type="button" className ="btn btn-primary" onClick={e => {deleteElement(id)}}>
            Don't show me this</button>
            </p>
        </div>
    </article>
)

export default ElementList