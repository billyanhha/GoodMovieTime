import React from 'react';
import { Link, Redirect , withRouter } from "react-router-dom";
import axios from "../axios";
import { Modal, Menu, Dropdown, Icon } from 'antd';
import PostListModal from './PostListModal.jsx';
import { translate } from "react-i18next";


class MyNavbar extends React.Component {
    state = {
        current: 'mail',
    }

    logout = () => {
        axios.delete('/api/auth')
            .then(data => window.location.reload())
            .catch(err => console.log(err))
    }

    collapseClick = () => {
        let isShow = this.state.show;
        this.setState({ show: !isShow });
    }

    toPostList = () => {
        this.setState({ toPostList: true })
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
            show: false,
        });
    }



    render() {

        const { t, i18n , location } = this.props;

        if (this.state.toPostList) {
            return <Redirect to="/post" />
        }
        const username = this.props.username;
        const render = username ?
            (
                <div className="loginButtonNav" >
                    <button className="upListCollapse" onClick={this.showModal} style={{ color: '#fff', paddingTop: '10px', paddingBottom: '10px' }} >{t("navBar.post")}<i className="fas fa-upload" style={{ marginLeft: '5px' }} ></i></button>
                    <Link to={"/profile/" + this.props.id} className="ant-dropdown-link navLink" >{t("navBar.viewProfile")}</Link>
                    <Link to="/login" onClick={this.logout} className="navLink">{t("navBar.logout")}</Link>
                    <Link to="/search" className="navLink" > <i className="fas fa-search"></i></Link>
                </div>
            )
            : (
                (
                    <div className="loginButtonNav">
                        <Link className="navLink" to="/login"> {t("navBar.login")} </Link>
                    </div>
                )
            )
        return (
            <div className="myNav padding">
                <div className={this.state.show ? "verNav" : "myNavLeft"}>
                    <div className="collapseRow " >
                        {
                            this.props.username && (
                                <Link to={`/profilec/` + `${this.props.id}`} className=" collapse navLink blackCollapse" >{t("navBar.hi")}, {this.props.username} </Link>
                            )
                        }
                        <i className="fas fa-bars collapse blackCollapse" onClick={this.collapseClick} ></i>
                    </div>
                    <Link to="/" className={location.pathname === '/' ?  "navLinkActive" : "navLink"}>{t("navBar.home")}</Link>
                    <Link to="/top" className={location.pathname === '/top' ?  "navLinkActive" : "navLink"} >{t("navBar.top10")}</Link>
                    <Link to="/justNow" className={location.pathname === '/justNow' ?  "navLinkActive" : "navLink"} >{t("navBar.justNow")}</Link>
                    <Link to="/" className={location.pathname === '/aboutUs' ?  "navLinkActive" : "navLink"} >{t("navBar.aboutUs")}</Link>
                    {render}
                </div>
                <div className="myNavRight" >
                    <Link to="/search" className="navLink" style={{ width: '100%', justifyContent: 'center', color: '#000' }} > <i className="fas fa-search"  ></i></Link>
                </div>
                <Modal title={`${t('postList.title')}`}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[]}
                    className="fixWidthModal"
                >
                    <PostListModal username={this.props.username} id={this.props.id} />
                </Modal>
            </div>
        );
    }
}

export default translate()(withRouter(MyNavbar));
