import React, {Component} from 'react'
import {Row, Col, Tabs, Card, Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane

class UserCenter extends Component {

    state = {
        collections: [],
        comments: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
    }

    componentDidMount () {
        const userId = localStorage.userId
        let  url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`

        axios.get(url)
            .then(response => {
                const collections = response.data.map(item => (
                    {uniquekey: item.uniquekey, title: item.Title}
                ))
                this.setState({collections})
            })

        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`

        axios.get(url)
            .then(response => {
                const comments = response.data.map(item => (
                {uniquekey: item.uniquekey, content: item.Comments, time: item.datetime}
                ))
                this.setState({comments})
            })

    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render () {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const {collections, comments} = this.state
        const collectionList = collections.length
            ? (
                collections.map((collection, index) => (
                    <Card key={index} title={collection.uniquekey}
                          extra={<Link to={`/detail/${collection.uniquekey}`}>查看</Link>}>
                        {collection.title}
                    </Card>
                ))
            )
            : ('您还没有收藏过新闻！')

        const commentList = comments.length
            ? (
            comments.map((comment, index) => (
                // 于 2017-02-28 评论了文章 161028202106247
                <Card key={index} title={`于 ${comment.time} 评论了文章 ${comment.uniquekey}`}
                      extra={<Link to={`/detail/${comment.uniquekey}`}>查看</Link>}>
                    {comment.content}
                </Card>
            ))
        )
            : ('您还没有评论过任何新闻！')


        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs>
                        <TabPane tab="我的收藏列表" key="1">
                            {collectionList}
                        </TabPane>
                        <TabPane tab="我的评论列表" key="2">
                            {commentList}
                        </TabPane>
                        <TabPane tab="头像设置" key="3">
                            <div className="clearfix">
                                {/*action="//jsonplaceholder.typicode.com/posts/"*/}
                                {/*action="http://jsonplaceholder.typicode.com/photos"*/}
                                <Upload
                                    action="http://localhost:3000/posts"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {/*{fileList.length >= 3 ? null : uploadButton}*/}
                                    {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={1}></Col>
            </Row>
        )
    }
}

export default UserCenter



