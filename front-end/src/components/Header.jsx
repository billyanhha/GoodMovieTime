import React, { Component } from 'react';
import { Link , Redirect } from 'react-router-dom';
import logo from '../images/logo3.png';
// import watch from '../images/watch.jpg';
import { Dropdown, Menu, Icon, Modal } from 'antd';
import axios from "../axios";
import goku from '../images/goku.gif';
import pacman from '../images/pacman.gif';
import PostListModal from './PostListModal.jsx';
// import batman from '../images/batman.png';
// import fight from '../images/fight.png';
// import cute from "../images/cute.png";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentDidMount() {
    }

    logout = () => {
        axios.delete('/api/auth')
            .then(data => window.location.reload())
            .catch(err => console.log(err))
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <button onClick = {this.showModal} className="upListCollapse">Post<i className="fas fa-upload" style={{ marginLeft: '5px' }} ></i></button>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`/profile/` + this.props.id} className="navLink" >Profile</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/login" onClick={this.logout} className="navLink">Logout</Link>
                </Menu.Item>
            </Menu>
        );
        const { username } = this.props;
        // const user = 
        const render = username ?
            (
                <div className="col-md-4 col-12 loginButton">
                    <div style={{ verticalAlign: 'center', display: 'flex', justifyContent: 'flex-end', }}  >
                        <span className="normarlText" >Hello my friend</span>
                        <Dropdown overlay={menu}>
                            <Link to="/" className="ant-dropdown-link" style={{ verticalAlign: 'center', display: 'flex', }} className="link"> . {username}
                                <Icon type="caret-down" theme="outlined" />
                            </Link>
                        </Dropdown>
                    </div>
                </div>
            )
            : (
                (
                    <div className="col-md-4 col-12 loginButton">
                        <span className="normarlText" style = {{fontSize: "13px"}} >You've not login yet ,<Link className="link" to="/login"> Login ?</Link></span>
                    </div>
                )
            )
        return (
            <div className="header row padding">
                <div className="col-md-6 col-12 logoView">
                    <Link to='/' className="link" ><img src={logo} className="logo" alt="Logo" /> </Link>
                </div>
                {/* <div className="col-md-5 superheroLine">
                    <img src={pacman} className="super" alt="Logo" />
                    <img src={goku} className="super" alt="Logo" />
                </div> */}
                <div className="modal"  >
                    <Modal title="Post list"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={[]}
                        className = "fixWidthModal"
                    >
                        <PostListModal redirect = {this.redirect} username={this.props.username} id={this.props.id}/>
                    </Modal>
                </div>
                {render}
            </div>
        )
    }
}

export default (Header);
