import React, {Component} from 'react'
import {Row, Col, BackTop} from 'antd'
import axios from 'axios'

import NewsImgList from './news_img_List'
import Comments from './comments'

class NewsDetail extends Component {

    state = {
        news: {}
    }

    componentDidMount () {
        this.showDetail(this.props)
    }

    componentWillReceiveProps (nextProps) {
        this.showDetail(nextProps)
    }

    showDetail = (props) => {
        const {uniquekey} = props.params
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`

        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
            })

    }

    render () {
        // console.log(this.props);
        /*return (
            <p>news...detail{this.props.params.uniquekey}</p>
        )*/

        const {pagecontent} = this.state.news

        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={18} className='container'>
                        <div dangerouslySetInnerHTML={{__html: pagecontent}}></div>
                        <hr/>
                        <Comments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={4}>
                        <NewsImgList title='娱乐新闻' type="yule" count={30} width='100%' imgWidth="150px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}

export default NewsDetail


