import React, {Component, PropTypes} from 'react'
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'


export default class NewsList extends Component {

    state = {
        list: []
    }

    componentWillMount () {
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`

        axios.get(url)
            .then(response => {
                const list = response.data.map(item => {
                    return {
                        title: item.title,
                        uniquekey: item.uniquekey
                    }
                })
                this.setState({list})
            })

    }

    render () {
        /*const titleStyle = {
            width: "400px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };*/
        const {list} = this.state
        const newsList = list.length
            ? (
                list.map((news, index) =>(
                    <li key={index} >
                        <Link to={`/detail/${news.uniquekey}`}>{news.title}</Link>
                    </li>
                    )
                ))
            : (
                '没有任何新闻'
            )

        return (
            <Card className="topNewsList" >
                <ul>
                    {newsList}
                </ul>
            </Card>
        )
    }
}

NewsList.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
}

