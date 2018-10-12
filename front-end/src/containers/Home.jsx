import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
import Slide from '../components/Slider.jsx';
import TitleTag from '../components/TitleTag';
import Loader from '../components/Loader';
import axios from '../axios';
import { Link } from "react-router-dom";
import moment from 'moment'
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";
import { translate } from "react-i18next";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        try {
            this.setState({ loading: true })
            axios.get(`api/lists/home`)
                .then(data => {
                    this.setState({
                        recommendList: data.data[0],
                        newList: data.data[1],
                        topUser: data.data[2]
                    })
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ loading: false })
        }
    }

    onErrorImage = (e) => {
        e.target.src = defaultUser;
    }

    render() {
        const { t } = this.props;
        const renderRecommendList = this.state.recommendList && this.state.recommendList.map((value, index) => {
            return (
                <div className="col-12 sd-phone " key={index}>
                    <div className=" listCard row noMargin" >
                        <div className="col-md-10 col-12 row nonPadding" style={{ justifyContent: "center" }}>
                            {
                                (value.posterUri).map((image, index) => {
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
                            <div className="profileCard">
                                <Link to={`/profile/${value.createdBy[0]._id}`} ><img alt={value.createdBy[0].username} onError={this.onErrorImage} src={config.url + `/api/users/${value.createdBy[0]._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                                <div>
                                    <Link to={`/profile/${value.createdBy[0]._id}`} >{value.createdBy[0].username}</Link>
                                    <p className="date" >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                                </div>
                            </div>
                            <p className="listName">{value.name}</p>
                            <div className="listStats">
                                <p ><i className="fas fa-eye" style={{ color: '#ED4956', marginRight: '3px' }} ></i>{value.view}</p>
                                <p ><i className="far fa-comment" style={{ color: '#4267B2', marginRight: '3px' }}></i>{value.commentNum}</p>
                                <p ><i className="far fa-heart" style={{ color: '#FDB616', marginRight: '3px' }}></i>{value.likeNum}</p>
                            </div>
                            <Link to={`/lists/${value._id}`} style={{ fontWeight: 'bold' }} >View details</Link>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            )
        })
        const renderNewList = this.state.newList && this.state.newList.map((value, index) => {
            // console.log(value.posterUri)
            return (
                <div className="col-md-4 col-xs-12 sd-phone" key={index}>
                    <div className=" listCard" >
                        <div className="col-12 row nonPadding" style={{ justifyContent: "center" }}>
                            {
                                (value.posterUri).map((image, index) => {
                                    return (
                                        <div className="col-4 postedMovieImage" key={index} style={{
                                            backgroundImage: `url('${image}')`,
                                        }}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12  listInfo ">
                            <div className="profileCard">
                                <Link to={`/profile/${value.createdBy[0]._id}`} ><img alt={value.createdBy[0].username} onError={this.onErrorImage} src={config.url + `/api/users/${value.createdBy[0]._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                                <div>
                                    <Link to={`/profile/${value.createdBy[0]._id}`} >{value.createdBy[0].username}</Link>
                                    <p className="date" >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                                </div>
                            </div>
                            <p className="listName">{value.name}</p>
                            <div className="listStats">
                                <p ><i className="fas fa-eye" style={{ color: '#ED4956', marginRight: '3px' }} ></i>{value.view}</p>
                                <p ><i className="far fa-comment" style={{ color: '#4267B2', marginRight: '3px' }}></i>{value.commentNum}</p>
                                <p ><i className="far fa-heart" style={{ color: '#FDB616', marginRight: '3px' }}></i>{value.likeNum}</p>
                            </div>
                            <Link to={`/lists/${value._id}`} style={{ fontWeight: 'bold' }} >View details</Link>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            )
        })
        const renderUserTable = this.state.topUser && this.state.topUser.map((value, index) => {
            return (
                <tr key={index} >
                    <th>
                        <Link to={`/profile/${value._id}`} ><img alt={value.username} onError={this.onErrorImage} src={config.url + `/api/users/${value._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                        <Link to={`/profile/${value._id}`} >{value.username}</Link>
                    </th>
                    <th>{value.numberOfPost}</th>
                    <th>{value.like}</th>
                    <th>#{index + 1}</th>
                </tr>
            )
        })
        return (
            <div className="container-fluid">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <Slide />
                <div className="paddingResponsive ">
                    {
                        this.state.loading
                            ?
                            (<Loader />)
                            :
                            (
                                <div>
                                    <TitleTag title={t("home.recommendedList")} />
                                    <div className="row ">
                                        {renderRecommendList}
                                    </div>
                                    <TitleTag title={t("home.newList")} />
                                    <div className="row ">
                                        {renderNewList}
                                    </div>
                                    <TitleTag title={t("home.mostRank")} />
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>{t('home.user')}</th>
                                                <th>{t('home.post')}</th>
                                                <th>{t('home.like')}</th>
                                                <th>{t('home.rank')}</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {renderUserTable}
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default translate()(Home);
