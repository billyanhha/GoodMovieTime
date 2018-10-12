import React, { Component } from 'react';
import axios from '../axios';
import { Link } from "react-router-dom";
import moment from 'moment'


class ProfilePostedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.get(`api/users/${this.props.id}/list`)
            .then(data => { this.setState({ list: data.data }) })
            .catch(err => console.log(err))
    }


    render() {
        const renderList = this.state.list.map((value, index) => {
            return (
                <div className="col-md-4 col-xs-12 sd-phone" key={index}>
                    <div className=" listCard" >
                        <div className="col-12 row nonPadding" style = {{ justifyContent: "center" }}>
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
                            <p className="listName" >{value.name}</p>
                            <p className="bigDate">{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                            <div className="listStats">
                                <p><i className="fas fa-eye" style={{ color: '#ED4956', marginRight: '3px' }} ></i>{value.view}</p>
                                <p><i className="far fa-heart" style={{ color: '#4267B2', marginRight: '3px' }}></i>{value.like.length}</p>
                                <p><i className="far fa-comment" style={{ color: '#F783AC', marginRight: '3px' }}></i>{value.comments.length}</p>
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
            <div className="container-fluid">
                <div className="postedList">
                    <h3 >Posted List</h3>
                    <div className="row " style={{ paddingTop: '1%'  }} >
                        {renderList}
                    </div>
                </div>
            </div>
        )
    }
}

export default (ProfilePostedList);
