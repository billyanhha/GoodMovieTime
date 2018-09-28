import React, { Component } from 'react';
import NonLoginHeader from "../components/NonLoginHeader";
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from "../axios";
import { message } from 'antd';

const FormItem = Form.Item;
class LoginForm extends Component {
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
                    this.props.onLogin(data.data)
                    this.setState({ username: data.data.username })
                    console.log(this.state.username);

                    message.config({
                        top: '10%',
                        maxCount: 1,
                    });
                    message.loading("Please wait", 0.5);
                }).catch(err => {
                    message.config({
                        top: '10%',
                        maxCount: 1,
                    });
                    message.error("Incorrect password or username", 2)
                }
                )
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.username) {
            return (<Redirect to="/" />)
        }
        return (
            <div className="Login container-fluid ">
                <div className="Login contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="login">
                            <p className="signInText">Sign In</p>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <p className="signText" >User name</p>
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please enter your username!' }],
                                    })(
                                        <Input type = "text"/>
                                    )}
                                </FormItem>
                                <p className="signText" >Password</p>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please enter your Password!' }],
                                    })(
                                        <Input type="password"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" className ="myButton" htmlType="submit">
                                        <bold>Login</bold>
                                    </Button>
                                    < div className="Login signUp" >
                                        <span className="span">New to us ? </span><Link to="/signUp" style={{ fontSize: "16px" }} className="link">Sign up !</Link>
                                    </div>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const Login = Form.create()(LoginForm);


export default (Login);
