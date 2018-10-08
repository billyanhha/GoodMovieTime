import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
// import Slide from '../components/Slider';
import axios from '../axios';
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";
import { Modal } from 'antd';
import EditProfileModal from '../components/EditProfileModal.jsx';
import ProfilePostedList from '../components/ProfilePostedList.jsx';
import Loader from '../components/Loader.jsx';

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
        this.setState({ loading: true })
        try {
            axios.get(`api/users/${this.props.match.params.id}`)
                .then(data => { this.setState({ users: data.data }) })
                .catch(err => console.log(err))
            axios.get(`api/users/${this.props.match.params.id}/imageData`)
                .then(data => {
                    if (data && data.data) {
                        this.setState({ haveImage: true })
                    }
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({ loading: false })
        }
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
        const { users } = this.state;
        const authoRize = (this.props.match.params.id === this.props.id);
        const avatar = this.state.haveImage ? config.url + `/api/users/${id}/imageData` : defaultUser;
        const avatarForEdit = this.state.haveImage ? config.url + `/api/users/${id}/imageData` : defaultUser;
        return (
            <div className="container-fluid">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                {this.state.loading ?
                    (<Loader />) :
                    (
                        <div>
                            <div className="bodyProfile">
                                <div className="profileRow"   >
                                    <div className="roundedDiv" style={{ backgroundImage: `url(${avatar})` }} >
                                    </div>
                                </div>
                                <div className="profileRowInfo">
                                    <div className=" profileChildRow">
                                        <p className="bigText" >{users.username} ( {users.fullname} )<button type="button" onClick={this.showModal} style={{ display: authoRize ? '' : 'none' }} className="btn btn-outline-secondary editButton"><i className="fas fa-edit"></i></button>
                                        </p>
                                        <div className="modal">
                                            <Modal title="Edit profiles"
                                                visible={this.state.visible}
                                                confirmLoading={this.state.confirmLoading}
                                                onCancel={this.handleCancel}
                                                action={''}
                                                footer={[]}
                                            >
                                                <EditProfileModal handleCancel={this.handleCancel} handleSumbit={this.handleSumbit} avatar={avatarForEdit} users={users} id={id} />
                                            </Modal>
                                        </div>
                                    </div>
                                    <div className="profileChildRow" >
                                        <p className="normalBlackBoldText" ><i className="fas fa-info-circle info"></i>{users.aboutMe}</p>
                                    </div>
                                    <div className="userStats " >
                                        <div className="stats">
                                            <span><span className="normalBlackBoldText" >{users.numberOfPost}   </span> post </span>
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
                            <ProfilePostedList id={id} loading={this.state.loading} />
                        </div>
                    )}
            </div>
        )
    }
}

export default (Profile);
