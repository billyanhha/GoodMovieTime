import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
// import Slide from '../components/Slider';
import axios from '../axios';
import moment from 'moment'
import config from '../config';
import defaultUser from "../images/defaultUser.jpg";
import Loader from '../components/Loader.jsx';
import MovieInfo from '../components/MovieInfo';
import CommentList from '../components/CommentList';
import { Link, Redirect } from "react-router-dom";
import { Modal, message, Dropdown, Menu, Icon } from 'antd';
import { FacebookShareCount } from "react-share";
import { translate } from "react-i18next";
import i18n from "../locales/i18n";
import PostListModal from '../components/PostListModal';
import EditListModal from '../components/EditListModal';

class ListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false,
            like: false,
        }
    }

    componentDidMount() {
        try {
            this.setState({ loading: true });
            axios.get(`/api/lists/${this.props.match.params.id}/details`)
                .then(data => {
                    this.setState({
                        value: data.data,
                        likeNum: data.data.like.length,
                        commentNum: data.data.comments.length,
                    })
                    if (!this.props.id) return;
                    for (let like of data.data.like) {
                        if (like.createdBy === this.props.id) {
                            this.setState({ like: true });
                            return;
                        }
                    }
                }
                )
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ loading: false });
        }
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


    onErrorImage = (e) => {
        e.target.src = defaultUser;
    }

    reactList = async (e) => {
        e.preventDefault();
        if (!this.props.id) {
            this.setState({ toLogin: true });
        }
        let { like, likeNum } = this.state;
        if (like === true) {
            likeNum--;
            await this.setState({ likeNum, like: false })
        } else {
            likeNum++;
            await this.setState({ likeNum, like: true })
        }
        await axios.post(`/api/lists/${this.props.match.params.id}/react`)
            .then(data => { })
            .catch(err => console.log(err))
    }

    showDeleteConfirm = () => {
        const id = this.props.match.params.id;
        const _this = this;
        Modal.confirm({
            title: 'Are you sure delete this list?',
            content: 'We\'re sorry for this exprerience',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`/api/lists/${id}`)
                    .then(data => {
                        message.error('Delete success', 1);
                        _this.setState({ redirect: true })
                    }
                    )
                    .catch(err => console.log(err))
            },
            onCancel() {

            },
        });
    }


    deleteAuthoRise = () => {
        if (this.state.value && this.props.id) {
            return this.props.id === this.state.value.createdBy._id;
        }
        return false;
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

        const language = i18n.language;

        const { t } = this.props;

        const menu = (
            <Menu>
                <Menu.Item onClick={this.showModal}>
                    <button  className=" deleteButton">Edit list</button>
                </Menu.Item>
                <Menu.Item  onClick={this.showDeleteConfirm}>
                    <button className=" deleteButton">Delete list</button>
                </Menu.Item>
            </Menu>
        );

        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        if (this.state.toLogin) {
            return (<Redirect to="/login" />);
        }

        const { value } = this.state;

        const renderMovie = value && (value.moviesId).map((id, index) => {
            return (
                <div className="col-md-6 col-12" key={index} >
                    <MovieInfo id={id} language={language} />
                </div>
            )
        })

        const renderButton = this.deleteAuthoRise() && (
            <div>
                <Dropdown overlay={menu}>
                    <Icon type="down-circle" theme="outlined" style={{ fontSize: "25px", color: "#EA1C22" }} />
                </Dropdown>
            </div>
        )

        const didLike = (this.state.value && this.state.like)
            ?
            (<button type="button" onClick={this.reactList} style={{ fontWeight: 'bold' }} className="btn btn-outline-danger likeButton">
                <i className="fas fa-heart" ></i>
                {i18n.t('listDetails.like')}
            </button>)
            : (
                <button type="button" onClick={this.reactList} className="btn btn-outline-danger likeButton">
                    <i className="far fa-heart" ></i>
                    {i18n.t('listDetails.like')}
                </button>
            )

        return (
            <div>
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                {this.state.loading || !value ?
                    (<Loader />) :
                    (
                        <div>
                            <div className="detailListContainer">
                                <div className="detailInfo" >
                                    <div style={{ width: '70%' }} >
                                        <div className="profileCard">
                                            <Link to={`/profile/${value.createdBy._id}`} ><img alt={value.createdBy.username} onError={this.onErrorImage} src={config.url + `/api/users/${value.createdBy._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                                            <div>
                                                <Link to={`/profile/${value.createdBy._id}`}  >{value.createdBy.username}</Link>
                                                <p className="detailDate" ><i className="far fa-clock"></i> {moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                                            </div>
                                        </div>
                                        <h3 className="detailName" >{`${value.name}`} </h3>
                                        <div className="listStats" style={{ width: '30%' }} >
                                            <p ><i className="far fa-comment" style={{ color: '#4267B2', marginRight: '3px' }}></i>{this.state.commentNum}</p>
                                            <p ><i className="far fa-heart" style={{ color: '#ED4956', marginRight: '3px' }}></i>{this.state.likeNum}</p>
                                            <p ><i className="fas fa-eye" style={{ color: '#FDB616', marginRight: '3px' }} ></i>{value.view}</p>
                                        </div>
                                    </div>
                                    <div className="modal"  >
                                        <Modal title={`${t('postList.title')}`}
                                            visible={this.state.visible}
                                            onCancel={this.handleCancel}
                                            footer={[]}
                                            className="fixWidthModal"
                                        >
                                            <EditListModal id={`${this.props.match.params.id}`} data={this.state.value} username={this.props.username} uid={this.props.id} />
                                        </Modal>
                                    </div>
                                    {renderButton}
                                </div>
                                <div className="row " style={{ marginTop: '2%' }} >
                                    {renderMovie}
                                </div>
                                <div className="listDetails" >
                                    {didLike}
                                    <a target="_blank" href={`https://www.facebook.com/sharer.php?u=https://goodmovietime.herokuapp.com/lists/${this.props.match.params.id}`} className="fb-xfbml-parse-ignore shareButton">
                                        {i18n.t('listDetails.share')}
                                        <FacebookShareCount url={`https://goodmovietime.herokuapp.com/lists/${this.props.match.params.id}`}>
                                            {shareCount => (
                                                <span className="myShareCountWrapper">{shareCount}</span>
                                            )}
                                        </FacebookShareCount>
                                    </a>
                                </div>
                            </div>
                            <h6 className="commentText" >{t('listDetails.comment')} {this.state.commentNum}</h6>
                            {(this.props.id || this.state.commentNum > 0) &&
                                (
                                    <CommentList id={this.props.match.params.id} uid={this.props.id} comments={value.comments} />)
                            }
                        </div>
                    )}
            </div>
        )
    }
}
export default translate()(ListDetail);
