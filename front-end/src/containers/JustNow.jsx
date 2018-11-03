import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
import TitleTag from '../components/TitleTag';
import Loader from '../components/Loader';
import axios from '../axios';
import { Link } from "react-router-dom";
import moment from 'moment'
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";
import { translate } from "react-i18next";


class JustNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: false
        }
    }

    componentDidMount() {
        try {
            this.setState({ loading: true })
            axios.get(`api/lists`)
                .then(data => {
                    const list = { ...data.data };
                    delete list.listSize;
                    this.setState({ list, numberOfList: data.data['listSize'] })
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

        const paging = this.state.numberOfList && Array.apply(null, Array(Math.floor(this.state.numberOfList / 10) + 1)).map((value, index) => {
            const goto = () => {
                axios.get(`api/lists?page=${index + 1}`)
                    .then(data => {
                        const list = { ...data.data };
                        delete list.listSize;
                        this.setState({ list })
                    })
                    .catch(err => console.log(err))
            }
            return (
                <li className="page-item" key={index}>
                    <span className="page-link" onClick={goto}>
                        {index + 1}
                    </span>
                </li>
            )
        })
        const renderList = Object.keys(this.state.list).map((key, index) => {
            const value = this.state.list[key]
            return (
                <div className="col-12 sd-phone " key={index}>
                    <div className=" listCard row " >
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
                                <Link to={`/profile/${value.createdBy[0]._id}`} ><img alt = {value.createdBy[0].username} onError={this.onErrorImage} src={config.url + `/api/users/${value.createdBy[0]._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                                <div>
                                    <Link to={`/profile/${value.createdBy[0]._id}`}  >{value.createdBy[0].username}</Link>
                                    <p className="date" >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                                </div>
                            </div>
                            <p className="listName">{value.name}</p>
                            <div className="listStats">
                                <p ><i className="fas fa-eye" style={{ color: '#ED4956', marginRight: '3px' }} ></i>{value.view}</p>
                                <p ><i className="far fa-comment" style={{ color: '#4267B2', marginRight: '3px' }}></i>{value.commentNum}</p>
                                <p ><i className="far fa-heart" style={{ color: '#FDB616', marginRight: '3px' }}></i>{value.likeNum}</p>
                            </div>
                            <Link to={`/lists/${value._id}`} style={{ fontWeight: 'bold' }} >{t('profile.detail')}</Link>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div style ={{height: '100%'}} >
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                {this.state.loading || !this.state.numberOfList
                    ? <Loader />
                    :
                    (
                        <div className="paddingResponsive" >
                            <TitleTag title= {t('home.newList')} />
                            <div className="row">
                                {renderList}
                            </div>
                            <nav aria-label="Page navigation example " className="myPg">
                                <ul className="pagination">
                                    {paging}
                                </ul>
                            </nav>
                        </div>)
                }
            </div>
        )
    }
}

export default translate()(JustNow);
