import React, { Component, Fragment } from 'react'

//Antd
import { Empty } from 'antd'

class Index extends Component {
    render() {

        let documents

        const { pages } = this.props
        
        if(pages) {
            documents = pages.map((page, index) => {
                if(page.name.split('.')[1] === 'pdf'){
                    return <p key={index}>
                        <iframe src={`data:application/pdf;base64,${page.data}`} width="600" height="780" ></iframe>
                    </p>
                  }
                  else{
                    return <p key={index}>
                        <iframe src={`data:image/jpeg;base64,${page.data}`} width="600" height="780" ></iframe>
                    </p>
                  }
            })
        }

        return <Fragment>{documents || <Empty />}</Fragment>
    }
}

export default Index