import React from 'react'
import { Table } from 'antd'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import { tableData } from './data.json'
import ProfileHeadCard from 'components/CleanUIComponents/ProfileHeadCard'
import pranavcss from './pranav.module.scss'


class DashboardAlpha extends React.Component {
  render() {
    const tableColumns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
    ]

    return (
      <Authorize roles={['admin']} redirect to="/dashboard/beta">
        <Helmet title="Dashboard Alpha" />
        <div className="row">
        <div className="col-lg-6">
            <div  style={{height:"90%"}} className="card">
              <div style={{ alignItems: "center",
                            display: "flex",
                             justifyContent: "center"}} className="card-body">
                <div className="utils__title">
                <div className={pranavcss.center}>
                <i className="lnr lnr-plus-circle"></i>
                 <a href="/" > <strong>Generated New Certificate</strong> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Recently Activities</strong>
                </div>
              </div>
              <div className="card-body">
                <Table
                pagination={false}
                  columns={tableColumns}
                  dataSource={tableData}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4">
          <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Organisation Stamp</strong>
                  <a href="/"> Edit</a>
                </div>
                <div className="utils__titleDescription">
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-12">
                    <ProfileHeadCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
          <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Organisation Stamp</strong>
                  <a href="/"> Edit</a>
                </div>
                <div className="utils__titleDescription">
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-12">
                    <ProfileHeadCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
          <div className="card">
              <div className="card-header">
                <div className="utils__title">
                <strong>Organisation Stamp</strong>
                  <a href="/"> Edit</a>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-12">
                    <ProfileHeadCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default DashboardAlpha
