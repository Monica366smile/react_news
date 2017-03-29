import React, {Component, PropTypes} from 'react'
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

export default class NewsImgList extends Component {

    state = {
        list: []
    }

    componentWillMount () {
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`

        axios.get(url)
            .then(response => {
                //title author_name thumbnail_pic_s uniquekey
                const list = response.data.map(item => {
                    return {
                        title: item.title,
                        author_name: item.author_name,
                        thumbnail_pic_s: item.thumbnail_pic_s,
                        uniquekey: item.uniquekey
                    }
                })
                this.setState({list})
            })

    }


    render () {
        const {title, width, imgWidth} = this.props
        const imgStyle = {
            width: imgWidth,
            height: "90px",
            display: 'block'
        }
        const titleStyle = {
            width: imgWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const {list} = this.state
        const newsList = list.length
            ? (
                list.map((news, index) =>(
                        <div key={index} className="imageblock">
                            <Link to={`/detail/${news.uniquekey}`}>
                                <div >
                                    <img src={news.thumbnail_pic_s} alt="新闻图片"  style={imgStyle}/>
                                </div>
                                <div className="custom-card">
                                    <h4 style={titleStyle}>{news.title}</h4>
                                    <p>{news.author_name}</p>
                                </div>
                            </Link>
                        </div>
                    )
                ))
            : (
                '没有任何新闻'
            )


        return (

            <Card title={title} className="topNewsList" style={{width: width}}>
                {newsList}
            </Card>

        )
    }
}


NewsImgList.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
    imgWidth: PropTypes.string.isRequired
}

