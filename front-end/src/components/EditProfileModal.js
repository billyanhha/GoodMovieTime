import React, { Component } from 'react';
import axios from '../axios';
import { Form, Input  } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditProfileModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            list: [],
            haveImage: false,
        }
    }

    render() {
        const id = this.props.id;
        const users = this.props.users;
        const avatar = this.props.avatar;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="row">
                <div className="col-md-6"   >
                    <div className="roundedDiv" style={{ backgroundImage: `url(${avatar})` }} >
                        {/* <img src={this.state.haveImage ? `${config.url}` + `/api/users/${id}/imageData` : defaultUser} alt={this.state.users.username} className="img-responsive rounded-circle" /> */}
                    </div>
                </div>
                <div className="col-md-6">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <p className="editText" >Full name</p>
                        <FormItem>
                            {getFieldDecorator('fullname', {
                                rules: [{ required: true, message: 'Required' }, {
                                    pattern: new RegExp("^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$"),
                                    message: "You have to use your real name"
                                }],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <p className="editText" >About me</p>
                        <FormItem>
                            {getFieldDecorator('description', {
                                rules: [],
                            })(
                                <TextArea maxlength="200" autosize rows = {5} type="text" />
                            )}
                        </FormItem>
                        {/* <p className="editText" >Password</p>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Required' }, {
                                    pattern: new RegExp("^[a-zA-Z0-9_]{5,}[0-9]*$"),
                                    message: "Password must have at least 6 characters"
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <p className="editText" >Confirm password</p>
                        <FormItem>
                            {getFieldDecorator('confimPassword', {
                                rules: [{ required: true, message: 'Required' }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem> */}
                    </Form>
                </div>
            </div>
        )
    }
}

const EditProfileModal = Form.create()(EditProfileModalForm);


export default (EditProfileModal);
