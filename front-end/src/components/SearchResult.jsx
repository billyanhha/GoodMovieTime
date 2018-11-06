import React, { Component } from 'react';
import { translate } from "react-i18next";
import defaultUser from "../images/defaultUser.jpg";
import config from '../config';
import axios from "../axios";
import i18n from "../locales/i18n";
import { Link } from "react-router-dom";
import moment from 'moment'

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onErrorImage = (e) => {
        e.target.src = defaultUser;
    }

    renderUser = this.props.data && this.props.type === 'USER' && this.props.data.data && this.props.data.data.map((value, index) => {
        const id = value._id;
        const avatar = config.url + `/api/users/${id}/imageData`;
        return (
            <div key={index} className="profile-result" >
                <div className="profileRow"   >
                    <div className="roundedDiv" style={{ backgroundImage: `url(${avatar})` }} >
                    </div>
                </div>
                <div className="profile-result-info" >
                    <p className="bigText" >{value.username}
                    </p>
                    <p className="normalBlackBoldText" ><i className="fas fa-info-circle info"></i>{value.fullname}</p>
                    <div className="stats">
                        <span><span className="normalBlackBoldText" >{value.numberOfPost}   </span> {i18n.t('profile.post')} </span>
                    </div>
                    <div>
                        <Link className="normalBlackBoldText" to={`/profile/${id}`} >{i18n.t('profile.detail')}</Link>
                    </div>
                </div>
            </div>
        );
    })

    renderList = this.props.data && this.props.type === 'LIST' && this.props.data.data && this.props.data.data.map((value, index) => {
        return (
            <div className="col-12 sd-phone " key={index}>
                <div className=" listCard row " >
                    <div className="col-md-10 col-12 row nonPadding" style={{ justifyContent: "center" }}>
                        {
                            value && value.posterUri && (value.posterUri).map((image, index) => {
                                return (
                                    <div className="col-md-2 col-4 postedMovieBig" key={index} style={{
                                        backgroundImage: `url('${image}')`,
                                    }}>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-md-2 col-12  listInfo ">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                            <p className="listName">{value.name}</p>
                        </div>
                        <div className="listStats">
                            <p ><i className="fas fa-eye" style={{ color: '#ED4956', marginRight: '3px' }} ></i>{value.view}</p>
                            <p ><i className="far fa-heart" style={{ color: '#FDB616', marginRight: '3px' }}></i>{value.likeNum}</p>
                        </div>
                        <Link to={`/lists/${value._id}`} style={{ fontWeight: 'bold' }} >{i18n.t('profile.detail')}</Link>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    })

    renderMovie = this.props.data && this.props.type === 'MOVIE' && this.props.data.map((value, index) => {
        return (
            <div key={index} className="searchMovieResult">
                <img alt={value.title} src={value.posterUri !== 'https://image.tmdb.org/t/p/w500null' ? value.posterUri : 'https://vnkings.com/wp-content/uploads/2018/01/unknown_01.jpg'} style={{ width: 'auto', height: '300px' }} />
                <div className="searchMovie-detail-result">
                    <p style={{ color: '#000', fontWeight: 'bold', paddingLeft: '10px' }} >{value.title}</p>
                    <p style={{ color: '#000' , paddingLeft: '10px' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{i18n.t('listDetails.overView')}</span> {value.overview || `${i18n.t('listDetails.uploading')}`}</p>
                    <p style={{ color: '#000' , paddingLeft: '10px' }}><span style={{ fontWeight: 'bold', color: '#000' }}>{i18n.t('listDetails.release')}</span> {value.release_date || `${i18n.t('listDetails.uploading')}`}</p>
                    <p style={{ color: '#000'  , paddingLeft: '10px'}}><span style={{ fontWeight: 'bold', color: '#000' }}>{i18n.t('listDetails.homePage')}</span>
                        <a style={{ fontWeight: 'bold' }} target='_blank' href={`${value.homepage || ''}`} > {value.homepage || `${i18n.t('listDetails.uploading')}`} </a>
                    </p>
                    <p style={{ color: '#000' , paddingLeft: '10px' }}><span style={{ fontWeight: 'bold', color: '#000' }}>IDMB: </span> {value.vote_average || `${i18n.t('listDetails.uploading')}`}</p>
                </div>
            </div>
        )
    })

    renderResult = () => {
        const type = this.props.type;
        if (type === 'USER') {
            return this.renderUser;
        } else if (type === 'LIST') {
            return this.renderList;
        } else if (type === 'MOVIE') {
            return this.renderMovie;
        }
    }


    render() {
        const { data, t } = this.props;

        return (
            <div>
                {
                    data && (
                        <div>
                            {
                                this.props.type !== 'MOVIE'
                                    ?
                                    (<p className="result-number" >{data.total || 0} result</p>)
                                    :
                                    (<p className="result-number" >{data.length || 0} result</p>)
                            }
                            <hr />
                            {this.renderResult()}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default translate()(SearchResult);
