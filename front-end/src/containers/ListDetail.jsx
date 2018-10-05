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
import { Link, Redirect } from "react-router-dom";
import { Modal, message } from 'antd';


class ListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false,
        }
    }

    componentDidMount() {
        try {
            this.setState({ loading: true });
            axios.get(`/api/lists/${this.props.match.params.id}/details`)
                .then(data => {
                    this.setState({
                        value: data.data
                    })
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

    handleSumbit = () => {

    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }


    onErrorImage = (e) => {
        e.target.src = defaultUser;
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


    render() {

        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        const { value } = this.state;

        const renderMovie = value && (value.moviesId).map((id, index) => {
            return (
                <div className="col-md-6 col-12" key={index} >
                    <MovieInfo id={id} />
                </div>
            )
        })

        const renderButton = this.deleteAuthoRise() && (<i onClick={this.showDeleteConfirm} className="fas fa-backspace deleteButton"></i>
        )

        return (
            <div className="container-fluid animation">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                {this.state.loading || !value ?
                    (<Loader />) :
                    (
                        <div className="detailListContainer">
                            <div className="detailInfo" >
                                <div style={{ width: '70%' }} >
                                    <h3 className="detailName" >{`${value.name}`} <span style={{ fontWeight: 'normal', fontSize: '15px' }} >({value.view} views)</span></h3>
                                    <span style={{ fontWeight: 'bold' }} >Created by : <Link to={`/profile/${value.createdBy._id}`} >{value.createdBy.username}</Link></span>
                                    <p className="detailDate" ><i className="far fa-clock"></i> {moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                                    <div className="fb-share-button" data-href="https://scorekeeperfromnorthside.herokuapp.com" data-layout="button_count" data-size="small" data-mobile-iframe="true">
                                        <a  href="https://www.facebook.com/sharer.php?u=https://scorekeeperfromnorthside.herokuapp.com/" className="fb-xfbml-parse-ignore">
                                            Share</a>
                                    </div>
                                </div>
                                {renderButton}
                            </div>
                            <p className="normalBlackBoldText" style={{ fontSize: '20px' }} >Movies ({value.moviesId.length} movies)</p>
                            <div className="row" style={{ marginTop: '1%' }} >
                                {renderMovie}
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default (ListDetail);
