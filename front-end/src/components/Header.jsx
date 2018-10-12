import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo3.png';
// import watch from '../images/watch.jpg';
import { Dropdown, Menu, Icon, Modal } from 'antd';
import axios from "../axios";
// import goku from '../images/goku.gif';
// import pacman from '../images/pacman.gif';
import PostListModal from './PostListModal.jsx';
// import batman from '../images/batman.png';
// import fight from '../images/fight.png';
// import cute from "../images/cute.png";
import { translate } from "react-i18next";


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

        const { t, i18n } = this.props;

        const menu = (
            <Menu>
                <Menu.Item>
                    <button onClick={this.showModal} className="upListCollapse">Post<i className="fas fa-upload" style={{ marginLeft: '5px' }} ></i></button>
                </Menu.Item>
                <Menu.Item>
                    <Link to={`/profile/` + this.props.id} className="navLink" >{t("navBar.viewProfile")}</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/login" onClick={this.logout} className="navLink">{t("navBar.logout")}</Link>
                </Menu.Item>
            </Menu>
        );
        const language = (
            <Menu>
                <Menu.Item>
                    <button onClick={() => i18n.changeLanguage("vi")} className="upListCollapse">{t('header.vi')}</button>
                </Menu.Item>
                <Menu.Item>
                    <button onClick={() => i18n.changeLanguage("en")} className="upListCollapse">{t('header.en')}</button>
                </Menu.Item>
            </Menu>
        );
        const { username } = this.props;
        const render = username ?
            (
                <div className="col-md-4 col-12 loginButton">
                    <div style={{ verticalAlign: 'center', display: 'flex', justifyContent: 'flex-end', }}  >
                        <span className="normarlText" >{t("navBar.hi")}, </span>
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
                        <span className="normarlText" style={{ fontSize: "13px", verticalAlign: 'middle' }} >
                            <Link className="link" style={{ color: "#fff" }} to="/login"> {t("header.login")} </Link>
                            <Dropdown overlay={language}>
                                <span style={{ cursor: "pointer" }}> | {t("header.language")}                                 
                                <Icon style={{ fontSize: "13px", verticalAlign: 'middle' }}  type="caret-down" theme="outlined" />
                                </span>
                            </Dropdown>
                        </span>
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
                        className="fixWidthModal"
                    >
                        <PostListModal redirect={this.redirect} username={this.props.username} id={this.props.id} />
                    </Modal>
                </div>
                {render}
            </div>
        )
    }
}

export default translate()(Header);
