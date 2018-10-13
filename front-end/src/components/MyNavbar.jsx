import React from 'react';
import { Link, Redirect } from "react-router-dom";
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

        const { t, i18n } = this.props;

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
                    <Link to="/" className="navLink" > <i className="fas fa-search"></i></Link>
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
                                <Link to="/" className=" collapse navLink blackCollapse" >{t("navBar.hi")}, {this.props.username} </Link>
                            )
                        }
                        <i className="fas fa-bars collapse blackCollapse" onClick={this.collapseClick} ></i>
                    </div>
                    <Link to="/" className="navLink">{t("navBar.home")}</Link>
                    <Link to="/top" className="navLink" >{t("navBar.top10")}</Link>
                    <Link to="/justNow" className="navLink" >{t("navBar.justNow")}</Link>
                    <Link to="/" className="navLink" >{t("navBar.aboutUs")}</Link>
                    {render}
                </div>
                <div className="myNavRight" >
                    <Link to="/" className="navLink" style={{ width: '100%', justifyContent: 'center', color: '#000' }} > <i className="fas fa-search"  ></i></Link>
                </div>
                <Modal title="Post list"
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

export default translate()(MyNavbar);
