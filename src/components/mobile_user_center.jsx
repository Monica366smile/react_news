import React from 'react'
import {
    Tabs,
    Card,
} from 'antd'
const TabPane = Tabs.TabPane
import {Link} from 'react-router'
import axios from 'axios'


export default class MobileUserCenter extends React.Component {
    constructor() {
        super()
        this.state = {
            userCollections: '', //收藏列表
            userComments: '', //评论列表
        }
    }

    componentDidMount() {
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId
        axios.get(url)
            .then(response=>{
                const userCollections = response.data
                this.setState({userCollections})
            })

        url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId
        axios.get(url)
            .then(response => {
                const userComments = response.data
                this.setState({userComments})
            })
    }

    render () {

        const {userCollections, userComments} = this.state

        const userCollectionsList = userCollections.length
            ? userCollections.map((uc, index) => (
            <Card key={index} title={uc.uniquekey}
                  extra={<Link to={`/news_detail/${uc.uniquekey}`}>查看</Link>}>
                <p>{uc.Title}</p>
            </Card>
        ))
            : '您还没有收藏任何的新闻，快去收藏一些新闻吧。'

        const userCommentsList = userComments.length
            ? userComments.map((comment,index)=>(
            <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                  extra={<Link to={`/detail/${comment.uniquekey}`}>查看</Link>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
            : '您还没有发表过任何评论。'


        return (
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                        {userCollectionsList}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                        {userCommentsList}
                    </TabPane>
                    <TabPane tab="头像设置" key="3"></TabPane>
                </Tabs>
            </div>
        )
    }
}
