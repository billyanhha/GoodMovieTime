import React, { Component } from 'react';
import NonLoginHeader from "../components/NonLoginHeader";
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from "../axios";
import { message } from 'antd';

const FormItem = Form.Item;
class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values.confimPassword;
                axios.post('/api/users', {
                    ...values
                })
                    .then(data => {
                        this.setState({ toLogin: true })
                        message.config({
                            top: '10%',
                            maxCount: 1,
                        });
                        message.loading("Creating", 1)
                            .then(message.success("Create success", 1));
                    })
                    .catch(err => message.error("User name is already taken", 1))
            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.toLogin) {
            return (<Redirect to="/login" />)
        }
        return (
            <div className=" container-fluid netflix">
                <div className=" contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="login">
                            <p className="signInText">Sign Up</p>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <p className="signText" >User name</p>
                                <FormItem className ="form-item-custom" >
                                    {getFieldDecorator('username', {
                                        rules: [{
                                            required: true,
                                            message: "Required"
                                        }, {
                                            pattern: new RegExp("^[a-zA-Z0-9_]{5,}[0-9]*$"),
                                            message: "Password must have at least 6 characters"
                                        }
                                        ],
                                    })(
                                        <Input  autoFocus type="text" />
                                    )}
                                </FormItem>
                                <p className="signText" >Full name</p>
                                <FormItem className ="form-item-custom" >
                                    {getFieldDecorator('fullname', {
                                        rules: [{ required: true, message: 'Required' }, {
                                            pattern: new RegExp("^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$"),
                                            message: "You have to use your real name"
                                        }],
                                    })(
                                        <Input type="text" />
                                    )}
                                </FormItem>
                                <p className="signText" >Password</p>
                                <FormItem className ="form-item-custom" >
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Required' }, {
                                            pattern: new RegExp("^[a-zA-Z0-9_]{5,}[0-9]*$"),
                                            message: "Password must have at least 6 characters"
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem >
                                <p className="signText" >Confirm password</p>
                                <FormItem >
                                    {getFieldDecorator('confimPassword', {
                                        rules: [{ required: true, message: 'Required' }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem> 
                                <p className="signText" style = {{textAlign : 'center'}} >By clicking Submit button , you are agreed to our <span className = "primaryColorText" >Term & Service </span> and <span className = "primaryColorText"> Policy</span></p>
                                <FormItem className ="form-item-custom" >
                                    <Button type="primary" className="myButton" htmlType="submit">
                                        <b>Submit</b>
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const SignUp = Form.create()(SignUpForm);
export default (SignUp);
