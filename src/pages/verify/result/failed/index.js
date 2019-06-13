import React, { Component, Fragment } from 'react'

//Antd
import { Button } from 'antd'

//Assets
import failed from '../../../../../assets/signy/images/failed.png'
import cross from '../../../../../assets/signy/images/cross.png'

class Index extends Component {
    render() {
        const { error } = this.props.data  
        return (
            <Fragment>
                <center>
                    <img src={failed} width={271} height={165}/>
                    <br /><br />
                    <img src={cross} width={50} height={50}/>
                    <br /><br />
                    <h5>Oops,Verification Failed!</h5>
                    <font color="red"><b>Error: {error}</b></font>
                    <br /><br />
                    <Button type="danger" size="large">Exit</Button>
                </center>
            </Fragment>
        )
    }
}

export default Index