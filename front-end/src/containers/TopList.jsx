import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
import TitleTag from '../components/TitleTag';
import axios from '../axios';
import { Link } from "react-router-dom";
import moment from 'moment'

class TopList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.get(`api/lists/top10`)
            .then(data => { this.setState({ list: data.data }) })
            .catch(err => console.log(err))
    }



    render() {
        const renderList = this.state.list.map((value, index) => {
            // console.log(value.posterUri)
            return (
                <div className="col-12 sd-phone" key={index}>
                    <div className=" listCard row" >
                        <div className="col-md-10 col-12 row nonPadding">
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
                            <p className="listName">{value.name}</p>
                            <p className="date" >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                            <div className="listStats">
                                <p ><i className="fas fa-heart" style={{ color: '#ED4956', marginRight: '3px' }} ></i>{value.view}</p>
                                <p ><i className="far fa-eye" style={{ color: '#4267B2', marginRight: '3px' }}></i>{value.commentNum}</p>
                                <p ><i className="far fa-comment" style={{ color: '#FDB616', marginRight: '3px' }}></i>{value.likeNum}</p>
                            </div>
                            <Link to="/" style={{ fontWeight: 'bold' }} >View details</Link>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="container-fluid animation">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <div className="paddingResponsive" >
                    <TitleTag title="Top 10" />
                    <div className="row">
                        {renderList}
                    </div>
                </div>
            </div>
        )
    }
}

export default (TopList);
