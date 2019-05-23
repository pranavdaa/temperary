import React, { Component, Fragment } from 'react'

//Antd
import { Empty, Table } from 'antd'

class Index extends Component {
    render() {
        var metadata = this.props.metadata, details

        if(metadata) {
            const columns = [
                {
                  title: 'Field',
                  dataIndex: 'field',
                },
                {
                  title: 'Value',
                  dataIndex: 'value',
                },
            ]

            var data = [
                {
                  key: '1',
                  field: 'John Brown',
                  value: 32,
                },
            ]
            
            var blockchainData = metadata.blockchainData
            metadata = JSON.parse(atob(metadata.data))


            var generalRows = {
                "name": "Name", 
                "createdOn": "Created On",
                "createdBy": "Created By",
                "documentType": "Type",
                "modifiedBy": "Issued By",
                "modifiedOn": "Issued On"
            }

            var advancedRows = {
                "basicInfoHash": "BasicInfo Hash",
                "historyHash": "History Hash",
                "pagesFinalHash": "Pages Final Hash",
                "previousVersionFinalHash": "Previous Version Final Hash",
                "publicInfoHash": "Pulic Info Hash",
                "userInfoHash": "User Info Hash",
                "userPermissionsHash": "User Permission Hash",
                "workFlowHash": "Work Flow Hash"
            }

            var generalDetails = [], advancedDetails = []

            //[General Details] Document Id
            generalDetails.push({ key: generalDetails.length, field: 'Document Id', value: metadata.documentId })

            //[General Details] Public Info
            for (var key in metadata.publicInfo) {
                if (metadata.publicInfo.hasOwnProperty(key)) {
                    generalDetails.push({ key: generalDetails.length, field: generalRows[key], value: metadata.publicInfo[key] })
                }
            }

            //[Advanced Details]
            advancedDetails.push({ key: advancedDetails.length, field: 'Document Id', value: metadata.documentId })
            advancedDetails.push({ key: advancedDetails.length, field: 'Blockchain', value: metadata.contexts[metadata.blockchainInfo.context].name })

            for (var key in blockchainData) {
                if (blockchainData.hasOwnProperty(key)) {
                  advancedDetails.push({ key: advancedDetails.length, field: advancedRows[key], value: blockchainData[key] })
                }
            }

            details = <Fragment>
                <h4>General Details</h4>
                <Table columns={columns} dataSource={generalDetails} size="middle" />
                <h4>Advanced Details</h4>
                <Table columns={columns} dataSource={advancedDetails} size="middle" />
                </Fragment>
        }

        return <Fragment> { details || <Empty /> } </Fragment>
    }
}

export default Index

/**
 * 
 * 
 * {
  "contexts": [
    {
      "name": "QUORUM",
      "version": "v2.2.3",
      "node_address": {
        "protocol": "http://",
        "host": "18.217.207.164",
        "port": ":22000"
      },
      "contract_address": "0xbbf289d846208c16edc8474705c748aff07732db",
      "verifyBdoc": "",
      "verifyUser": ""
    }
  ],
  "blockchainInfo": {
    "context": 0
  },
  "documentId": "0x77ed81dddfbc5f72f49a6266d6b9b533473b567f6e8b1695855f7e8f9e544946",
  "basicInfo": [
    {
      "documentName": "ETC telk.png",
      "documentType": "Test document",
      "lastVersion": null
    }
  ],
  "pages": [
    {
      "name": "Page 1",
      "seq": 1,
      "type": "png",
      "originalName": "ETC telk.png",
      "hash": "0x228b85a18ae52dc8a172443e7302f92ba1302ba992a55a7c4d89af65c290dd43"
    }
  ],
  "userInfo": {
    "userId": {
      "id": "get uid from state",
      "context": 0
    },
    "relation": "owner"
  },
  "userPermissions": {
    "someUID": {
      "permission": "w"
    }
  },
  "publicInfo": {
    "name": "Name of the document",
    "createdOn": "Tue May 21 2019 11:48:33 GMT+0530 (India Standard Time)",
    "createdBy": "Name of the user, who created the document.",
    "documentType": "Type of document. (e.g. Identity document)",
    "modifiedBy": "Name of the user, who have done the last modification in the document",
    "modifiedOn": "Tue May 21 2019 11:48:33 GMT+0530 (India Standard Time)"
  },
  "history": [
    {
      "datetime": "Tue May 21 2019 11:48:33 GMT+0530 (India Standard Time)",
      "event": {
        "name": "BDOC",
        "userId": "someUID",
        "description": "some Description",
        "tag": "CREATED"
      }
    }
  ],
  "workflow": {
    "config": {
      "steps": [
        {
          "seq": 0,
          "name": "Step 1",
          "command": "Assign",
          "role": "Signatory1"
        },
        {
          "seq": 1,
          "name": "Step 2",
          "command": "Sign",
          "role": "Signatory2"
        }
      ],
      "roles": [
        {
          "roleName": "Signatory1",
          "type": "Sign"
        },
        {
          "roleName": "Signatory2",
          "type": "Sign"
        }
      ]
    },
    "status": {
      "currentStep": 0
    }
  },
  "previousVersions": []
}
 */