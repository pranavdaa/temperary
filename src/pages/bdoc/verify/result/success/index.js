import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

//Antd
import { Button } from 'antd'

//Assets
import success from '../../../../../assets/signy/images/OBJECTS@2x.png'
import check from '../../../../../assets/signy/images/check-mark@2x.png'

class Index extends Component {
    render() {
        return (
            <Fragment>
                <center>
                    <img src={success} width={219} height={179}/>
                    <br /><br />
                    <img src={check} width={50} height={50}/>
                    <br /><br />
                    <h5>Congratutations!</h5>
                    <span>Verification Done!!</span>
                    <br /><br />
                    <NavLink to='/bdoc/view'>
                        <Button type="primary" size="large">View Document</Button>
                    </NavLink>
                    <br/>
                    <a href='/#/home'>
                        <Button size="large">Exit</Button>
                    </a>
                </center>
            </Fragment>
        )
    }
}

export default Index