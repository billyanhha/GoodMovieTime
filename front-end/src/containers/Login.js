import React, { Component } from 'react';
import NonLoginHeader from "../components/NonLoginHeader";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, withRouter, Redirect } from 'react-router-dom';
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
                    this.props.onLogin(data.data.username)
                    this.setState({username : data.data.username})
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
                    message.error("Incorrect password or username", 2.5)
                }
                )
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        if(this.state.username) {
            return( <Redirect to = "/"/>)
        }
        return (
            <div className="Login container-fluid ">
                <div className="Login contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="login">
                            <p className="signInText">Sign In</p>
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
                                        Log in
                                    </Button>
                                    < div className="Login signUp" >
                                        <span className="span">New to us ? </span><Link to="/signUp"  className="link">Sign up !</Link>
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