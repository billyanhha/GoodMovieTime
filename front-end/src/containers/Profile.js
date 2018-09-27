import React, { Component } from 'react';
import Header from '../components/Header';
import MyNavbar from '../components/MyNavbar';
import Slide from '../components/Slider';
import axios from '../axios';
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            list: [],
            haveImage: false,
        }
    }

    componentDidMount() {
        axios.get(`/api/users/${this.props.match.params.id}/list`)
            .then(data => this.setState({ list: data.data }))
            .catch(err => console.log(err))
        axios.get(`api/users/${this.props.match.params.id}`)
            .then(data => { this.setState({ users: data.data }) })
            .catch(err => console.log(err))
        axios.get(`api/users/${this.props.match.params.id}/imageData`)
            .then(data => {
                if (data.data) {
                    this.setState({ haveImage: true })
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const id = this.props.match.params.id;
        const users = this.state.users;
        const authoRize = (this.props.match.params.id === this.props.id);
        const avatar = this.state.haveImage ? config.url + `/api/users/${id}/imageData` : defaultUser;
        return (
            <div className="containLayout">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <div className="row bodyProfile">
                    <div className=" col-12 col-md-2  profileRow"   >
                        <div className="roundedDiv" style={{ backgroundImage: `url(${avatar})` }} >
                            {/* <img src={this.state.haveImage ? `${config.url}` + `/api/users/${id}/imageData` : defaultUser} alt={this.state.users.username} className="img-responsive rounded-circle" /> */}
                        </div>
                    </div>
                    <div className=" col-12 col-md-10  profileRow">
                        <div className=" profileChildRow">
                            <p className="bigText" >{users.username} ( {users.fullname} )</p>
                            <button type="button" style={{ display: authoRize ? '' : 'none' }} className="btn btn-outline-secondary editButton">Edit your profiles</button>
                        </div>
                        <div className="profileChildRow" >
                            <p className="normalBlackBoldText" ><i className="fas fa-info-circle info"></i>{users.aboutMe}</p>
                        </div>
                        <div className="userStats row" >
                            <div className="col-4">
                                <span><span className="normalBlackBoldText" >{this.state.list.length}    </span> post </span>
                            </div>
                            <div className="col-4">
                                <span><span className="normalBlackBoldText" >{users.like}  </span> like </span>
                            </div>
                            <div className="col-4">
                                <span><span className="normalBlackBoldText" ># {users.like}  </span> Rank </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Profile);
