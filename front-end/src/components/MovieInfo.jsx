import React from 'react';
import axios from '../axios';
import SmallLoader from '../components/SmallLoader';

class MovieInfo extends React.Component {
    state = {
        movieData: ""
    }

    componentDidMount() {
        axios.get(`/api/movies/${this.props.id}`).then(
            data => this.setState({ movieData: data.data })
        )
            .catch(err => console.log(err))
    }

    render() {
        const { movieData } = this.state;
        const renderGenres = movieData.genres ? movieData.genres.map((value, index) => {
            return (<span key={index} >{value.name} . </span>)
        }) : 'Updating'
        const renderActor = movieData.actor ? movieData.actor.splice(0, 5).map((value, index) => {
            return (<span key={index} >{value.name} . </span>)
        }) : 'Updating'
        return (
            <div>
                {!movieData ?
                    <SmallLoader />
                    : (
                        <div className="noPadding movieDetail animation">
                            <h6 style={{ fontWeight: 'bold' }} >{movieData.title}</h6>
                            <div className="row" >
                                <div className="col-md-4 col-12 noPadding" >
                                    <div className="moviePosterInfo"
                                        style={{
                                            backgroundImage: `url('${movieData.posterUri}')`
                                        }}>
                                    </div>
                                </div>
                                <div className="col-md-8 col-12 infoDetail " >
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>Overview :</span> {movieData.overview || 'Updating'}</p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>Release time :</span> {movieData.release_date || 'Updating'}</p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>Genres :</span> {renderGenres}</p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>Home page :</span>
                                        <a style={{ fontWeight: 'bold' }} target='_blank' href={`${movieData.homepage || ''}`} > {movieData.homepage || 'Updating'} </a>
                                    </p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>Actor :</span> {renderActor}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default MovieInfo;
