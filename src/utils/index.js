export const moviesURL = {
    upcoming: page => {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    topRated: page => {
        return `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    similar: (page,id) => {
        return `
        https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
    },
    recommend: (page,id) => {
        return `
        https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
    }
}
export const tvshowsURL = {
    upcoming: page => {
        return `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    topRated: page => {
        return `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    popular: page => {
        return `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    },
    similar: (page,id) => {
        return `
        https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
    },
    recommend: (page,id) => {
        return `
        https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=${page}`
    }
}
export const busquedaURL = {
    busqueda : (query) => {
    return `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
}
}
export const comentariosURL = {URL : `http://localhost:3010/comments`}
    