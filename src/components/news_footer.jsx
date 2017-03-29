import React from 'react'

/*
class NewsFooter extends Component {

    render () {

        return (
            <footer>
                <p className="footer">
                    &copy;&nbsp;2016 ReactNews. All Rights Reserved.
                </p>
            </footer>
        )
    }
}

export default NewsFooter*/

//无状态组件，可用函数方法写
export default function NewsFooter() {
    return (
        <footer>
            <p className="footer">&copy;&nbsp;2016 ReactNews. All Rights Reserved.</p>
        </footer>
    )
}
