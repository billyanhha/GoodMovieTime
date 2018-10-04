import React, { Component } from 'react';
import axios from '../axios';
import { Form, Input, Button, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';


class EditProfileModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            list: [],
            haveImage: false,
            loading: false,
            imagePreviewUrl: this.props.avatar,
            file: ''
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            fullname: this.props.users.fullname || '',
            aboutMe: this.props.users.aboutMe || '',
        })
    }

    handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    file: info.file.originFileObj,
                    loading: false,
                    imageUrl: reader.result,
                });
            }
            reader.readAsDataURL(this.state.file);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && (values.aboutMe !== this.props.users.aboutMe || values.fullname !== this.props.users.fullname || this.state.imagePreviewUrl !== this.props.avatar)) {
                let formData = new FormData();
                formData.append('avatarFile', this.state.file);
                formData.append('fullname', values.fullname || '');
                formData.append('aboutMe', values.aboutMe || '');
                axios.put('/api/users',
                    formData
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then(data => {
                        this.setState({ toLogin: true })
                        message.config({
                            top: '10%',
                            maxCount: 1,
                        });
                        message.loading("Saving", 1)
                            .then(message.success("Success"), window.location.reload(), this.props.handleCancel())
                    })
                    .catch(err => console.log(err))
            } else if (!err) {
                message.info("You not changing anything", 1);
            }
        });
    }

    _handleImageChange(e) {
        try {
            e.preventDefault();

            let reader = new FileReader();
            console.log(e.target.files[0])
            let file = e.target.files[0];
            if (!(file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.jpeg'))) {
                message.error('This is not an image', 1);
                return;
            }
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file || '')
        } catch (error) {

        }
    }


    render() {
        const { id, users } = this.props;
        const { getFieldDecorator } = this.props.form;
        let { imagePreviewUrl } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="row">
                    <div className="col-md-6"   >
                        <div className="roundedDiv" style={{ backgroundImage: `url(${imagePreviewUrl})` }} >
                            <input className="fileInput"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)} />
                            <div className="mask">
                                Choose picture
                                </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <p className="editText" >Full name</p>
                        <FormItem style={{ marginBottom: '10px' }} >
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
                        <FormItem  style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('aboutMe', {
                                rules: [],
                            })(
                                <TextArea maxLength="200" cols = "5" type="text"  wrap="hard" />
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
                    </div>
                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        <b>Submit</b>
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const EditProfileModal = Form.create()(EditProfileModalForm);


export default (EditProfileModal);
