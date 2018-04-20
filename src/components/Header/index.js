import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as busquedaActions from "../../actions/busquedaActions";
import logo from "../../images/logo.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfMovies: props.numberOfMovies,
      listaBusqueda: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      numberOfMovies: nextProps.numberOfMovies,
      listaBusqueda: nextProps.listaBusqueda
    });
  }
  buscar = oEnv => {
    const query = document.getElementById("buscar").value;
    const { busquedaActions } = this.props;
    if (query && query.length>1) busquedaActions.loadBusqueda(query);
    else this.setState({listaBusqueda:[]})
  };
  irABusqueda = e => {
    const { listaBusqueda } = this.state;
    console.log(listaBusqueda[0]);
    if (listaBusqueda[0]) {
      this.props.history.push(
        `/${listaBusqueda[0].media_type}/${listaBusqueda[0].id}`
      );
    }
  };
  render() {
    const { numberOfMovies, listaBusqueda } = this.state;
    return (
      <div className="row">
        <header
          className="main-nav d-flex col-12"
          style={{ flexDirection: "column" }}
        >
          <Link to={`/`}>
            {" "}
            <div className="logo-wrapper d-flex">
              <img src={logo} alt="TMDB" />
              {numberOfMovies > 0 && (
                <h1 style={{ color: "white" }}>{numberOfMovies}</h1>
              )}
            </div>
          </Link>

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample08"
              aria-controls="navbarsExample08"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-md-center"
              id="navbarsExample08"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={`/movie`}>
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/tv`}>
                    TV Shows
                  </Link>
                </li>
              </ul>
              <input
                type="text"
                id="buscar"
                onChange={this.buscar}
                name="q1"
                placeholder="Search"
                autoComplete="on"
              />
              <button
                type="button"
                onClick={this.irABusqueda}
                className="btn btn-default"
              >
                Search
              </button>

              {listaBusqueda.length > 0 ? (
                <div className="dropdown col-2">
                  <ul
                    className="navbar-nav dropdown-menu"
                    style={{ flexDirection: "column" }}
                  >
                    {listaBusqueda.map((element, i) => {
                      return (
                        <li className="dropdown-item " key={i}>
                          <Link to={`/${element.media_type}/${element.id}`}>
                            {element.title || element.original_name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let busquedaFiltrada = []
  if(state.busqueda){
    let i=0;
     state.busqueda.forEach(elem => {
      if(i<5 && (elem.title || elem.original_name) && (elem.media_type==='tv' || elem.media_type==='movie')){
        busquedaFiltrada[i] = elem
        i++
       }
    });
  }
   return {
    numberOfMovies: state.movies.length,
    listaBusqueda: busquedaFiltrada
  };
}

function mapDispatchToProps(dispatch) {
  return {
    busquedaActions: bindActionCreators(busquedaActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
