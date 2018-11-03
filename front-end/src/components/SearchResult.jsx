import React, { Component } from 'react';
import { translate } from "react-i18next";
import defaultUser from "../images/defaultUser.jpg";
import config from '../config';
import axios from "../axios";
import i18n from "../locales/i18n";
import { Link } from "react-router-dom";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    checkImageExist = (id) => {
        axios.get(`api/users/${id}/imageData`)
            .then(data => {
                if (data && data.data) {
                    return false;
                }
                return true;
            })
            .catch(err => { return false })
        return true;
    }

    renderUser = this.props.data && this.props.data.data && this.props.data.data.map((value, index) => {
        const id = value._id;
        const avatar = this.checkImageExist(id) ? config.url + `/api/users/${id}/imageData` : defaultUser;
        return (
            <div key={index} className="profile-result" >
                <div className="profileRow"   >
                    <div className="roundedDiv" style={{ backgroundImage: `url(${avatar})` }} >
                    </div>
                </div>
                <div className="profile-result-info" >
                    <p className="bigText" >{value.username}
                    </p>
                    <p className="normalBlackBoldText" ><i className="fas fa-info-circle info"></i>{value.fullname}</p>
                    <div className="stats">
                        <span><span className="normalBlackBoldText" >{value.numberOfPost}   </span> {i18n.t('profile.post')} </span>
                    </div>
                    <div>
                    <Link className="normalBlackBoldText"  to = {`/profile/${id}`} >{i18n.t('profile.detail')}</Link>
                    </div>
                </div>
            </div>
        );
    })

    renderResult = () => {
        if (this.props.type === 'USER') {
            return this.renderUser;
        }
    }



    render() {
        const { data, t } = this.props;

        return (
            <div>
                {
                    data && (
                        <div>
                            {
                                this.props.type !== 'MOVIE'
                                    ?
                                    (<p className="result-number" >{data.total || 0} result</p>)
                                    :
                                    (<p className="result-number" >{data.length || 0} result</p>)
                            }
                            <hr />
                            {this.renderResult()}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default translate()(SearchResult);
