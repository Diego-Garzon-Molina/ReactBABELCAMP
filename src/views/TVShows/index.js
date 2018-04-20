import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import ElementList from '../../components/ElementList'

import * as tvshowsActions from '../../actions/tvshowsActions'

class TVShows extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            tvshows: [],
            page: 1,
            loadingTVS: false,
            nowViewing: 'popular',
            sortBy: 'title-asc',
            viewingThisYearOnly: false
        }
    }

    componentDidMount(){
        const { tvshows, nowViewing, page } = this.state
        const { tvshowsActions } = this.props

        tvshowsActions.loadTVShows(page, nowViewing)

        window.addEventListener("scroll", this.infiniteScroller, false);
    }

    infiniteScroller =  e => {
        const { tvshowsActions } = this.props
        const { page, nowViewing } = this.state
        const scrollTop = window.scrollY
        const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
        const pctScrolled = Math.floor(scrollTop/trackLength * 100)
        if(pctScrolled > 95 && !this.state.loadingTVS) {
            tvshowsActions.loadTVShows(page, nowViewing)
            this.setState({
                loadingTVS: true
            })
        }
    }

    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.infiniteScroller, false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tvshows.length > this.state.tvshows.length) {
            this.setState({
                loadingTVS: false,
                page: this.state.page + 1,
                tvshows: nextProps.tvshows
            })
        }
        else {
            this.setState({
                tvshows: nextProps.tvshows,
                loadingTVS: false
            })
        }
    }

    onViewingChange = e => {
        const nowViewing = e.target.value
        const { tvshowsActions } = this.props
        tvshowsActions.loadTVShows(1, nowViewing)
        this.setState({
            page: 2,
            loadingTVS: true,
            nowViewing
        })
    }

    onSortChange = e => {
        this.setState({sortBy: e.target.value})
    }
    sortTVShows = tvshows => {
        const { sortBy } = this.state
        const sorting = sortBy.split('-')
        return _.orderBy(tvshows, sorting[0], sorting[1])
    }

    onToggleViewingThisYearOnly = e => {
        this.setState({viewingThisYearOnly: !this.state.viewingThisYearOnly})
    }

    filterTVShows = tvshows => {
        return tvshows.filter(tvshow => {
          
            return tvshow.first_air_date.includes('2018')
        })
    }
    prepareTVShows = tvshows => {
        const { viewingThisYearOnly } = this.state
        let filteredTVShows = viewingThisYearOnly ? this.filterTVShows(tvshows) : tvshows
        return this.sortTVShows(filteredTVShows)
    }
    deleteElement = (id) => {
        let {tvshows} = this.state
        _.remove(tvshows,(tvshow) => {return tvshow.id === id})
        this.setState({tvshows:tvshows})
    }
    render() {
        const { tvshows, nowViewing, sortBy, viewingThisYearOnly } = this.state
        const path = this.props.match.path
        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                        <h1>{tvshows.length > 0 ? 'TV Shows' : 'Loading...'}</h1>
                    </div>
                </header>
                <aside className="row">
                    <div className="form-group">
                        <label>Now viewing:</label>
                        <select className="form-control" onChange={this.onViewingChange} defaultValue={nowViewing}>
                            <option value="popular">Popular</option>
                            <option value="topRated">Top Rated</option>
                            <option value="upcoming">Airing Today</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select className="form-control" onChange={this.onSortChange} defaultValue={sortBy}>
                            <option value="original_name-asc">Title (Asc)</option>
                            <option value="original_name-desc">Title (Desc)</option>
                            <option value="popularity-asc">Less Popular</option>
                            <option value="popularity-desc">More Popular</option>
                            <option value="vote_average-asc">Worst</option>
                            <option value="vote_average-desc">Best</option>
                            <option value="first_air_date-asc">Oldest</option>
                            <option value="first_air_date-desc">Newest</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" onChange={this.onToggleViewingThisYearOnly} type="checkbox" checked={viewingThisYearOnly} />
                            View this year only
                        </label>
                    </div>
                </aside>
                <div className="row movie-list-wrapper">
                {this.prepareTVShows(tvshows).map((tvshow, i) => {
                     
                        return (
                            <ElementList path={path} deleteElement={this.deleteElement}
                                key={i}
                                {...tvshow}
                            />
                        )
                    })}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        tvshows: state.tvshows
    }
}

function mapDispatchToProps(dispatch){
    return {
        tvshowsActions: bindActionCreators(tvshowsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShows)

