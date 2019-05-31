import React, { Component, Fragment } from 'react'
import bdocReader from '../../../../redux/bdoc/read/actions'


//Antd
import { Row, Col, Card } from 'antd'

//React Router
import { connect } from 'react-redux'

//Assets
import cube from '../../../../assets/signy/images/cube.png'
import check from '../../../../assets/signy/images/check-mark.png'
import cross from '../../../../assets/signy/images/cross.png'
import style from './style.module.scss'
import Result from '../result/index'
class Index extends Component {
    render() {
        console.log(this.props.validFields)
        const { validFields, completeReading } = this.props
        const fields = ['Verified Document Id', 'Verified Basic Info', 'Verified Pages',
            'Verified User Info', 'Verified Public Info', 'Verified Metadata',
            'Verified Version History']



        const validationResults = fields.map((field, index) => {
            if (validFields.includes(field)) {
                return <p key={index}><img src={check} width="20" height="20" />&nbsp;&nbsp;&nbsp;{field}</p>
            }
            else {
                return <p key={index}><img src={cross} width="20" height="20" />&nbsp;&nbsp;&nbsp;{field}</p>
            }
        })



        console.log("Modi", this.props.data)
        return (
            <Row type="flex" justify="center">

                <Col xs={24} md={20} lg={16} xl={16}>
                    <Card>
                        <Fragment>
                            <Row align="middle" type="flex">
                                <Col span={12}>
                                    <center>
                                        <div>
                                            {this.props.data.bdocFiles.isReading ? (

                                                <img src={cube} className={style.loading} />


                                            ) : (
                                                    <Result data={this.props} />
                                                )}
                                        </div>



                                    </center>
                                </Col>
                                <Col span={12}>
                                    <center >
                                        <ul className={style.ul} style={{ listStyleType: "none" }}>
                                            <li className={style.i01}>{validationResults[0]}</li>
                                            <li className={style.i02}>{validationResults[1]}</li>
                                            <li className={style.i03}>{validationResults[2]}</li>
                                            <li className={style.i04}>{validationResults[3]}</li>
                                            <li className={style.i05}>{validationResults[4]}</li>
                                            <li className={style.i06}>{validationResults[5]}</li>
                                            <li className={style.i07}>{validationResults[6]}</li>
                                        </ul>
                                    </center>
                                </Col>
                            </Row>
                        </Fragment >
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    validFields: state.bdocReader.validFields
})

const mapDispatchToProps = dispatch => ({

    completeReading: payload => dispatch(bdocReader.completeReading)
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)