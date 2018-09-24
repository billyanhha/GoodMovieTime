import React, { Component } from 'react';
import NonLoginHeader from "../components/NonLoginHeader";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from "../axios";
import { message } from 'antd';

const FormItem = Form.Item;
class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/api/auth/login', {
                    ...values
                }).then(data => {
                    message.config({
                        top: '10%',
                        maxCount: 1,
                    });
                    message.loading("Please wait", 0.5);
                    return (this.props.history.push('/'))
                }).catch(err => {
                    message.config({
                        top: '10%',
                        maxCount: 1,
                    });
                    message.error("Incorrect password or username", 2.5)
                }
                )
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Login container-fluid ">
                <div className="Login contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="login">
                            <p className="signInText">Sign Up</p>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please enter your username!' }],
                                    })(
                                        <Input placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please enter your Password!' }],
                                    })(
                                        <Input type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">
                                        Submit
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


export default withRouter(SignUp);
