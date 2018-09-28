import React, { Component } from 'react';
import Header from '../components/Header';
import MyNavbar from '../components/MyNavbar';
// import Slide from '../components/Slider';
import axios from '../axios';
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";
import { Modal  } from 'antd';
import EditProfileModal from '../components/EditProfileModal';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            list: [],
            haveImage: false,
            visible: false,
            confirmLoading: false,
            loading: false,
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


    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    handleSumbit = () => {
        
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    render() {
        const id = this.props.match.params.id;
        const {users } = this.state;
        const authoRize = (this.props.match.params.id === this.props.id);
        const avatar = this.state.haveImage ? config.url + `/api/users/${id}/imageData` : defaultUser;
        const avatarForEdit = this.state.haveImage ? config.url + `/api/users/${id}/imageData` : '';
        return (
            <div className="containLayout">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <div className="bodyProfile">
                    <div className="profileRow"   >
                        <div className="roundedDiv" style={{ backgroundImage: `url(${avatar})` }} >
                            {/* <img src={this.state.haveImage ? `${config.url}` + `/api/users/${id}/imageData` : defaultUser} alt={this.state.users.username} className="img-responsive rounded-circle" /> */}
                        </div>
                    </div>
                    <div className="profileRowInfo">
                        <div className=" profileChildRow">
                            <p className="bigText" >{users.username} ( {users.fullname} )<button type="button" onClick={this.showModal} style={{ display: authoRize ? '' : 'none' }} className="btn btn-outline-secondary editButton"><i className="fas fa-edit"></i></button>
                            </p>
                            <div className = "modal">
                                <Modal title="Edit profiles"
                                    visible={this.state.visible}
                                    confirmLoading={this.state.confirmLoading}
                                    onCancel={this.handleCancel}
                                    action={''}
                                    footer={[]}
                                >
                                    <EditProfileModal handleCancel = {this.handleCancel} handleSumbit = {this.handleSumbit} avatar={avatarForEdit} users={users} id={id} />
                                </Modal>
                            </div>
                        </div>
                        <div className="profileChildRow" >
                            <p className="normalBlackBoldText" ><i className="fas fa-info-circle info"></i>{users.aboutMe}</p>
                        </div>
                        <div className="userStats " >
                            <div className="stats">
                                <span><span className="normalBlackBoldText" >{this.state.list.length}   </span> post </span>
                            </div>
                            <div className="stats">
                                <span><span className="normalBlackBoldText" >{users.like}  </span> like </span>
                            </div>
                            <div className="stats">
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
