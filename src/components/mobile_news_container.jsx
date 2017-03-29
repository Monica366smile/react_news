import React from 'react'
import {
    Carousel,
    Tabs
} from 'antd'
const TabPane = Tabs.TabPane

import MobileNewsImgList from './mobile_news_img_list'

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

export default class MobileNewsContainer extends React.Component {

    render () {


        return (
            <Tabs>
                <TabPane tab="头条" key="top">
                    <div style={{width: '100%'}}>
                        <Carousel autoplay infinite>
                            <div><img src={carousel_1}/></div>
                            <div><img src={carousel_2}/></div>
                            <div><img src={carousel_3}/></div>
                            <div><img src={carousel_4}/></div>
                        </Carousel>
                    </div>
                    <MobileNewsImgList count={20} type="top"/>
                </TabPane>
                <TabPane tab="社会" key="shehui">
                    <MobileNewsImgList count={20} type="shehui"/>
                </TabPane>
                <TabPane tab="国内" key="guonei">
                    <MobileNewsImgList count={20} type="guonei"/>
                </TabPane>
                <TabPane tab="国际" key="guoji">
                    <MobileNewsImgList count={20} type="guoji"/>
                </TabPane>
                <TabPane tab="娱乐" key="yule">
                    <MobileNewsImgList count={20} type="yule"/>
                </TabPane>
            </Tabs>
        )
    }
}
