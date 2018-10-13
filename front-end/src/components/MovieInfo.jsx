import React from 'react';
import axios from '../axios';
import SmallLoader from '../components/SmallLoader';
import { translate } from "react-i18next";
import i18n from "../locales/i18n";
class MovieInfo extends React.Component {
    state = {
        movieData: ""
    }

    componentDidMount() {
        axios.get(`/api/movies/${this.props.id}?language=${this.props.language}`).then(
            data => this.setState({ movieData: data.data })
        )
            .catch(err => console.log(err))
    }

    render() {
        const {t} = this.props;
        const { movieData } = this.state;
        const renderGenres = movieData.genres ? movieData.genres.map((value, index) => {
            return (<span key={index} >{value.name} . </span>)
        }) : `${i18n.t('listDetails.uploading')}`
        const renderActor = movieData.actor ? movieData.actor.splice(0, 5).map((value, index) => {
            return (<span key={index} >{value.name} . </span>)
        }) : `${i18n.t('listDetails.uploading')}`
        return (
            <div>
                {!movieData ?
                    <SmallLoader />
                    : (
                        <div className="noPadding movieDetail">
                            <h6 style={{ fontWeight: 'bold' }} >{movieData.title}</h6>
                            <div className="row sd_phone_list" >
                                <div className="col-md-4 col-12 noPadding" >
                                    <div className="moviePosterInfo"
                                        style={{
                                            backgroundImage: `url('${movieData.posterUri}')`
                                        }}>
                                    </div>
                                </div>
                                <div className="col-md-8 col-12 infoDetail " >
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{t('listDetails.overView')}</span> {movieData.overview || `${t('listDetails.uploading')}` }</p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{t('listDetails.release')}</span> {movieData.release_date || `${t('listDetails.uploading')}` }</p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{t('listDetails.genres')}</span> {renderGenres}</p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{t('listDetails.homePage')}</span>
                                        <a style={{ fontWeight: 'bold' }} target='_blank' href={`${movieData.homepage || ''}`} > {movieData.homepage || `${t('listDetails.uploading')}` } </a>
                                    </p>
                                    <p style={{ color: '#000' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{t('listDetails.actor')}</span> {renderActor}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default translate()(MovieInfo);
