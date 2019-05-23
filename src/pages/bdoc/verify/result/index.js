import React, { Component, Fragment } from 'react'
import Success from './success'
import Failed from './failed'

class Index extends Component {
    render() {
        const { data } = this.props
        let Result

        if(data.bdocFiles.IsValid) {
            Result = Success
        }
        else {
            Result = Failed
        }
        return <Result data={data.bdocFiles}/>
    }
}

export default Index