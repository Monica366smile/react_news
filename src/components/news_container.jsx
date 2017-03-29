import React, {Component} from 'react'
// import {Link} from 'react-router'
import {Row, Col, Carousel, Tabs} from 'antd'

const TabPane = Tabs.TabPane

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

import NewsImgList from './news_img_List'
import NewsList from './news_List'
import Products from './products'

class NewsContainer extends Component {

    render () {

        return (
            /*<ul>
                <li><Link to="/detail/1">新闻中心1</Link></li>
                <li><Link to="/detail/2">新闻中心2</Link></li>
                <br/>
                <li><Link to="/usercenter">个人中心</Link></li>
            </ul>*/
            <div className="container">
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer" style={{width: "35%"}}>
                            <Carousel autoplay className="carousel">
                                <div><img src={carousel_1} alt="carousel_1"/></div>
                                <div><img src={carousel_2} alt="carousel_2"/></div>
                                <div><img src={carousel_3} alt="carousel_3"/></div>
                                <div><img src={carousel_4} alt="carousel_4"/></div>
                            </Carousel>
                            <NewsImgList title='头条新闻' type="top" count={6} width='100%' imgWidth="112px"/>
                        </div>

                        <Tabs className='tabs_news' style={{width: "35%"}}>
                            <TabPane tab="国内新闻" key="1">
                                <NewsList type="guonei" count={26}/>
                            </TabPane>
                            <TabPane tab="国际新闻" key="2">
                                <NewsList type="guoji" count={26}/>
                            </TabPane>
                        </Tabs>

                        <Tabs className='tabs_product' style={{width: "30%"}}>
                            {/*style={{width: "30%"}}*/}
                            <TabPane tab="React News产品" key="1">
                                <Products />
                            </TabPane>
                        </Tabs>

                        <div>
                            <NewsImgList title='娱乐新闻' type="yule" count={8} width='100%' imgWidth="132px"/>
                            <NewsImgList title='科技新闻' type="keji" count={16} width='100%' imgWidth="132px"/>
                        </div>
                    </Col>

                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

export default NewsContainer


