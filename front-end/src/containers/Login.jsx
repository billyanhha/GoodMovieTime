import React, { Component } from 'react';
import NonLoginHeader from "../components/NonLoginHeader.jsx";
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from "../axios";
import { message } from 'antd';
import { translate } from "react-i18next";
import i18n from "../locales/i18n";


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
                    message.loading(i18n.t('message.wait'), 0.5);
                }).catch(err => {
                    message.config({
                        top: '10%',
                        maxCount: 1,
                    });
                    message.error(i18n.t('message.incorrect'), 2)
                }
                )
            }
        });
    }
    render() {
        const { t } = this.props;

        const { getFieldDecorator } = this.props.form;
        if (this.state.username) {
            return (<Redirect to="/" />)
        }
        return (
            <div className=" container-fluid netflix">
                <div className=" contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="login">
                            <p className="signInText">{t('login.signIn')}</p>
                            <Form   onSubmit={this.handleSubmit} className="login-form">
                                <p className="signText" >{t('login.name')}</p>
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: `${t('message.require')}` }],
                                    })(
                                        <Input autoFocus type = "text"/>
                                    )}
                                </FormItem>
                                <p className="signText" >{t('login.password')}</p>
                                <FormItem autoComplete="on">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: `${t('message.require')}` }],
                                    })(
                                        <Input  type="password"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" className ="myButton" htmlType="submit">
                                        <b>{t('login.signIn')}</b>
                                    </Button>
                                    < div className="signUpText" >
                                        <span className="span">{t('login.new')}</span><Link to="/signUp" style={{ fontSize: "16px" }} className="link">{t('login.signUp')}</Link>
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


export default translate()(Login);
