import React from 'react'
import {BackTop} from 'antd';
import axios from 'axios'

import Comments from './comments';


export default class MobileNewsDetail extends React.Component{

    constructor () {
        super()
        this.state = {
            news: ''
        }
    }

    componentDidMount () {
        const {uniquekey} = this.props.params
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
                document.title = news.title + " - React News | React驱动的新闻平台";
            })
    }

    render () {
        return (
            <div style={{padding: '10px'}}>
                <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html: this.state.news.pagecontent}}></div>
                <hr/>
                <Comments uniquekey={this.props.params.uniquekey}/>
                <BackTop/>
            </div>
        )
    }
}
