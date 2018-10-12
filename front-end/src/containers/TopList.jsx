import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
import TitleTag from '../components/TitleTag';
import axios from '../axios';
import { Link } from "react-router-dom";
import moment from 'moment'
import Loader from '../components/Loader';
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";

class TopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        try {
            this.setState({ loading: true })
            axios.get(`api/lists/top10`)
                .then(data => { this.setState({ list: data.data }) })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ loading: false })
        }
    }



    render() {
        const renderList = this.state.list.map((value, index) => {
            const onErrorImage = (e) => {
                e.target.src = defaultUser;
            }
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
                            <div style ={{ display: 'flex',  flexDirection: 'column' , justifyContent: 'space-between'}} >
                                <div className="profileCard">
                                    <Link to={`/profile/${value.createdBy[0]._id}`} ><img alt = {value.createdBy[0].username} onError={onErrorImage} src={config.url + `/api/users/${value.createdBy[0]._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                                    <div>
                                        <Link to={`/profile/${value.createdBy[0]._id}`}   >{value.createdBy[0].username}</Link>
                                        <p className="date" >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                                    </div>
                                </div>
                                <p className="listName">{value.name}</p>
                            </div>
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
        return (
            <div>
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                {this.state.loading ? <Loader />
                    :
                    (
                        <div className="paddingResponsive" >
                            <TitleTag title="Top 10" />
                            <div className="row">
                                {renderList}
                            </div>
                        </div>)
                }
            </div>
        )
    }
}

export default (TopList);
