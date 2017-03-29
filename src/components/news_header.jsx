import React, {Component} from 'react'
import {Row, Col, Menu, Icon, Button, Modal, Tabs, Form, Input, message} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

const MenuItem = Menu.Item
const TabPane = Tabs.TabPane
const FormItem = Form.Item

import logo from '../images/logo.png'


class NewsHeader extends Component {
    state = {
        current: 'top',
        username: null,
        userId: null,
        modalVisible: false
    }

    handleClick = (event) => {
        // console.log(event.key);
        const current = event.key
        if (current === 'register') {
            this.setState({modalVisible: true})
        }
        this.setState({current})
    }

    handleClose = () => {
        this.setState({modalVisible: false})
    }

    clearInfo = () => {
        this.props.form.resetFields()
    }


    componentWillMount () {
        if (localStorage.username) {
            this.setState({username: localStorage.username, userId: localStorage.userId})
        }
    }

    handleSubmit = (isRegister, event) => {
        event.preventDefault()
        const action = isRegister ? 'register' : 'login'
        //得到表单中用户输入的数据
        const {username, password, r_username, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

        axios.get(url)
            .then(response => {
              const data = response.data
                // console.log(data);
                this.props.form.resetFields()
                if (isRegister) {
                    message.success(`${r_username}：恭喜您，注册成功了！`)
                    return
                }else {
                    if (!data) {
                        message.error('登录失败！')
                    }else {
                        message.success(`${username}：恭喜您，登录成功了！`)
                        localStorage.userId = data.UserId
                        localStorage.username = data.NickUserName
                        this.setState({username: data.NickUserName, userId: data.UserId})
                    }
                }
            })

        this.setState({modalVisible: false})

    }

    logout = () => {
        this.setState({username: '', userId: ''})
        localStorage.username = ''
        localStorage.userId = ''
    }


    render () {
        const { getFieldDecorator } = this.props.form
        const {username} = this.state
        let userShow = username
            ? (
                <MenuItem key="logined" className="register">
                    <Button type="primary">{username}</Button>
                    &nbsp;&nbsp;
                    <Link to="/usercenter">
                        <Button type="dashed" >个人中心</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="gohost" onClick={this.logout}>退出</Button>
                </MenuItem>
            )
            : (
                <MenuItem key="register" className="register">
                    <Icon type="appstore" />注册/登录
                </MenuItem>
            )

        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3} >
                        <Link to='/' className="logo">
                            <img src={logo} alt="logo"/><span>ReactNews</span>
                        </Link>
                    </Col>
                    <Col span={19}>
                        {/*onClick={this.handleClick}*/}
                        {/*selectedKeys={[this.state.current]}*/}
                        <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
                            <MenuItem key="top">
                                <Icon type="appstore" />头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore" />社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore" />国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore" />国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore" />娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore" />体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore" />科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore" />时尚
                            </MenuItem>

                            {/*注册/登录*/}
                            {/*<MenuItem key="user" className="register">
                                <Icon type="appstore" />注册/登录
                            </MenuItem>*/}
                            {userShow}
                        </Menu>

                        {/*登录注册的模态框*/}
                        <Modal title="用户中心" visible={this.state.modalVisible}
                               onOk={this.handleClose} onCancel={this.handleClose}
                                okText='关闭'>

                            {/*onChange={callback}*/}
                            <Tabs  type="card" onChange={this.clearInfo}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('username')(<Input placeholder="请输入您的账号"/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(<Input type='password' placeholder="请输入您的密码"/>)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('r_username')(<Input placeholder="请输入您的账号"/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(<Input type='password' placeholder="请输入您的密码"/>)}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword')(<Input type='password' placeholder="请再次输入您的密码"/>)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>

                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        )
    }
}

export default Form.create()(NewsHeader)