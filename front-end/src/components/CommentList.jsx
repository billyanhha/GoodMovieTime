import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment'
import config from '../config';
import axios from '../axios';
import { message, Icon, Modal } from 'antd';
import { translate } from "react-i18next";

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            comments: this.props.comments
        }
    }

    componentDidMount() {
    }

    typeComment = async (e) => {
        await this.setState({ commentText: e.target.value })
    }

    submitComment = (e) => {
        e.preventDefault();
        const { commentText } = this.state;
        console.log(commentText)
        if (commentText.length < 5) {
            message.error("Comment must have at least 5 characters", 1);
            return;
        }
        axios.post(`/api/lists/${this.props.id}/comment`, {
            content: commentText
        })
            .then(data => {
                window.location.reload();
                message.success("Send message success", 1);
            }
            )
            .catch(err => console.log(err))
    }

    showDeleteConfirm = (commentId) => {
        const id = this.props.id;
        const _ref = this;
        Modal.confirm({
            title: 'Are you sure delete this comment?',
            content: 'We\'re sorry for this exprerience',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`/api/lists/${id}/comment/${commentId}`)
                    .then(data => {
                        const comments = [..._ref.state.comments];
                        for(let i = 0 ;i < comments.length ; i++) {
                            if(comments[i]._id === commentId) {
                                comments.splice(i , 1);
                                _ref.setState({comments});
                                message.success('Delete success', 1);
                                return;
                            }
                        }
                    }
                    )
                    .catch(err =>  message.success(err.toString(), 1))
            },
            onCancel() {

            },
        });
    }


    render() {
        const { t } = this.props;
        const {comments} = this.state;
        const renderComment = comments.length !== 0 && comments.map((value, index) => {
            return (
                <div className="comment" key={index}>
                    <div className="profileCard">
                        <Link to={`/profile/${value.createdBy._id}`} ><img alt={value.createdBy.username} onError={this.onErrorImage} src={config.url + `/api/users/${value.createdBy._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                        <div>
                            <Link to={`/profile/${value.createdBy._id}`} style={{ fontSize: '17px', fontWeight: 'bold' }}  >{value.createdBy.username}</Link>
                            <p className="date" style={{ fontSize: '12px' }}  >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                        </div>
                        {
                            this.props.uid && this.props.uid === value.createdBy._id && (
                                <div className = "deleteIcon" onClick = {this.showDeleteConfirm.bind(this , value._id)} >
                                    <Icon type="delete" theme="outlined" />
                                </div>
                            )
                        }
                    </div>
                    <p className="commentContent">{value.content}</p>
                </div>
            )
        })

        const renderTextArea = this.props.uid && (
            <div className="inputComment" >
                <textarea type="text" onChange={this.typeComment} className="form-control typeComment" placeholder={`${t('listDetails.type')}`} />
                <button onClick={this.submitComment} style={{ backgroundColor: 'transparent', fontSize: '15px', border: 'none', color: '#EA1C22', cursor: 'pointer', fontWeight: 'bold' }} >{t('listDetails.send')}</button>
            </div>
        )

        return (
            <div className="detailListContainer" style={{ marginTop: 0, }}>
                {renderTextArea}
                {renderComment}
            </div>
        )
    }
}



export default translate()(CommentList);
