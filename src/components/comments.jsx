import React, {Component} from 'react'
import {Card, Form, Input, Button, message, notification } from 'antd'
import axios from 'axios'

const FormItem = Form.Item

class Comments extends Component {
    state= {
        list: []
    }

    componentDidMount () {
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`

        axios.get(url)
            .then(response => {
                const list = response.data.map(item => (
                    {
                        username: item.UserName,
                        comment: item.Comments,
                        time: item.datetime
                    }
                ))

                this.setState({list})
            })

    }


    handleSubmit = (event) => {
        //阻止默认行为
        event.preventDefault()
        //获取用户输入的评论
        const comment = this.props.form.getFieldValue('comment')
        // console.log(comment);
        const userId = localStorage.userId
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${comment}`

        if (!userId) {
            message.warn('请先登录后再提交评论！')
            return
        }
        axios.get(url)
            .then(response => {
                message.success('您的评论已提交成功！')
                this.componentDidMount()
                this.props.form.resetFields()
            })

    }


    handleCollect = () => {
        const userId = localStorage.userId
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
        if (!userId) {
            message.warn('请先登录后再收藏文章！')
            return
        }
        axios.get(url)
            .then(response => {
                notification.success(
                    {
                        message: 'ReactNews提醒',
                        description: '收藏此文章成功'
                    }
                )
            })

    }


    render () {
        const { getFieldDecorator } = this.props.form
        const {list} = this.state
        const commentList = list.length
            ? (
                list.map((item, index) => (
                    <Card  key={index} title={item.username}  extra={`发布于 ${item.time}`}>
                        <p>{item.comment}</p>
                    </Card>
                ))
            )
            : ('没有任何评论！')

        return(
            <div style={{padding: '10px'}}>
            {commentList}

            <Form onSubmit={this.handleSubmit}>
                <FormItem label="您的评论">
                    {getFieldDecorator('comment')(<Input type="textarea" placeholder="随便写点什么" />)}
                    <p>
                        <Button type="primary" htmlType='submit'>提交评论</Button>
                        &nbsp;&nbsp;
                        <Button type="primary" htmlType='button' onClick={this.handleCollect}>收藏此文章</Button>
                    </p>
                </FormItem>
            </Form>


            </div>
        )
    }
}

// export default Comments
export default Form.create({})(Comments)
