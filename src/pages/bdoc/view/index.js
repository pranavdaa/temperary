import React, { Component } from 'react'

//Antd
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

//React-Redux
import { connect } from 'react-redux'

import Documents from './documents'
import Details from './details' 

//Assets
import './styles.css'
import 'antd/dist/antd.css'

class Index extends Component {
    tableChangeHandler = () => {

    }
    
    render() {
        const { bdocDetails } = this.props
        
        return (
            <Tabs onChange={this.tableChangeHandler} type="card">
                <TabPane tab="Documents" key="1">
                    <Documents pages={bdocDetails.pages}/>
                </TabPane>
                <TabPane tab="Details" key="2">
                    <Details metadata={bdocDetails.metadata}/>
                </TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    bdocDetails: state.bdocReader
})

export default connect(mapStateToProps, null)(Index)