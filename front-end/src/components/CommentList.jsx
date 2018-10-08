import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment'
import config from '../config';
import axios from '../axios';
import { message } from 'antd';


class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
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




    render() {
        const { comments } = this.props;
        const renderComment = comments.length !== 0 && comments.map((value, index) => {
            return (
                <div className="comment" key={index}>
                    <div className="profileCard">
                        <Link to={`/profile/${value.createdBy._id}`} ><img onError={this.onErrorImage} src={config.url + `/api/users/${value.createdBy._id}/imageData`} className="rounded-circle smallAvatar" /></Link>
                        <div>
                            <Link to={`/profile/${value.createdBy._id}`} style={{ fontSize: '17px', fontWeight: 'bold' }}  >{value.createdBy.username}</Link>
                            <p className="date" style={{ fontSize: '12px' }}  >{moment(value.createdAt).format(' DD-MM-YYYY  hh:mm A')}</p>
                        </div>
                    </div>
                    <p className="commentContent">{value.content}</p>
                </div>
            )
        })

        const renderTextArea = this.props.uid && (
            <div className="inputComment" >
                <textarea type="text" onChange={this.typeComment} className="form-control typeComment" placeholder="Type what you think" />
                <button onClick={this.submitComment} style={{ backgroundColor: 'transparent', fontSize: '15px', border: 'none', color: '#EA1C22', cursor: 'pointer', fontWeight: 'bold' }} >Send</button>
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



export default (CommentList);
