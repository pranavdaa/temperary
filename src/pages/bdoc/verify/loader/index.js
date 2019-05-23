import React, { Component, Fragment } from 'react'

//Antd
import { Row, Col } from 'antd'

//React Router
import { connect } from 'react-redux'

//Assets
import cube from '../../../../assets/signy/images/cube.png'
import check from '../../../../assets/signy/images/check-mark.png'
import cross from '../../../../assets/signy/images/cross.png'
import './styles.css'

class Index extends Component {
    render() {
        console.log(this.props.validFields)
        const { validFields } = this.props
        const fields = ['Verified Document Id', 'Verified Basic Info', 'Verified Pages',
                     'Verified User Info', 'Verified Public Info', 'Verified Metadata',
                      'Verified Version History']

        var validationResults

        validationResults = fields.map((field, index) => {
            if(validFields.includes(field)) {
                return <p key={index}><img src={check} width="20" height="20"/>&nbsp;&nbsp;&nbsp;{field}</p>
            }
            else {
                return <p key={index}><img src={cross} width="20" height="20"/>&nbsp;&nbsp;&nbsp;{field}</p>
            }
        })


        return (
        <Fragment>
            <Row>
                <Col span={12}>
                    <center>
                        <img src={cube} id="loading"/>
                    </center>
                </Col>
                <Col span={12}>
                    <center>
                        {validationResults}
                    </center>
                </Col>
            </Row>                 
        </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    validFields: state.bdocReader.validFields
})

export default connect(mapStateToProps, null)(Index)