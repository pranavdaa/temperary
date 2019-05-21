import types from './types'
const sha256 = require('js-sha256').sha256
const addBdoc = require('../../../utils/web3').default.addBdoc
import JSZip from 'jszip'
import { saveAs } from 'file-saver';

const filesToBdoc = payload => dispatch => {
    
    let documentId = getDocumentId()
    let publicInfo = getPublicInfo()
    let basicInfo = getBasicInfo(payload)
    let userInfo = getUserInfo()
    let userPermissions = getUserPermissions()
    let history = getHistory()
    let workflow = getWorkflow()
    let previousVersions = getPreviousVersions()
    let pages = getPages(payload)

    //payload contains the files
    let metadata = JSON.stringify({
        contexts: getContexts(),
        blockchainInfo: getBlockchainInfo(),
        documentId: documentId,
        basicInfo: basicInfo,
        pages: pages,
        userInfo: userInfo,
        userPermissions: userPermissions,
        publicInfo: publicInfo,
        history: history,
        workflow: workflow,
        previousVersions: previousVersions        
    })

    //Generating Zipped Bdoc
    var zip = new JSZip();
    zip.file("metadata.txt", `${metadata}\n`)
    var bdocPages = zip.folder("pages");
    payload.map((file) => {
        bdocPages.file(`${file.name}`, file.data)
    })
    
    zip.generateAsync({type:"blob"}).then(content => {
        // see FileSaver.js
        saveAs(content, `bdoc-${documentId}`)
    });

    let metadathash = `0x${sha256(metadata)}`
    let basicInfoHash = `0x${sha256(JSON.stringify(basicInfo))}`
    let pagesFinalHash = `0x${sha256(JSON.stringify(pages))}`
    let userInfoHash = `0x${sha256(JSON.stringify(userInfo))}`
    let userPermissionsHash = `0x${sha256(JSON.stringify(userPermissions))}`
    let publicInfoHash = `0x${sha256(JSON.stringify(publicInfo))}`
    let historyHash = `0x${sha256(JSON.stringify(history))}`
    let workFlowHash = `0x${sha256(JSON.stringify(workflow))}`
    let previousVersionFinalHash = `0x${sha256(previousVersions)}`

    let bdocHashes = [
        basicInfoHash,
        pagesFinalHash,
        userInfoHash,
        userPermissionsHash,
        publicInfoHash,
        historyHash,
        workFlowHash,
        previousVersionFinalHash
    ]
    console.log(bdocHashes)
    dispatch({
        type: types.CREATE_BDOC,
        payload: documentId
    })
    
    addBdoc(
        documentId,
        metadathash,
        JSON.stringify(publicInfo),
        bdocHashes,
        payload.map(file => `0x${file.hash}`),
        []
    )
}

const getContexts = () => {
    return [
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
    ]
}

const getBlockchainInfo = () => {
    return { context: 0 }
}

const getDocumentId = () => {
    return `0x${sha256(entropy(16))}`
}

const getBasicInfo = (files) => {
    return files.map((file) => {
        return {
            "documentName": file.name,
            "documentType": "Test document",
            "lastVersion": null
        }
    })
}

const getPages = (files) => {
    return files.map((file, index) => {
        const hash = file.hash
        return {
            "name": `Page ${index+1}`,
            "seq": index+1,
            "type": file.name.split('.')[1] || "unknown",
            "originalName": file.name,
            "hash": hash
        }
    })
}

const getUserInfo = () => {
    return {
        "userId": {
            "id": "get uid from state",
            "context": 0 
        },
        "relation": "owner"
    }
}

const getUserPermissions = () => {
    return {
        "someUID": {
            "permission": "w"   
        }
    }
}

const getPublicInfo = () => {
    const NOW = Date();
    return {
        name: "Name of the document",
        createdOn: NOW,
        createdBy: "Name of the user, who created the document.",
        documentType: "Type of document. (e.g. Identity document)",
        modifiedBy: "Name of the user, who have done the last modification in the document",
        modifiedOn: NOW
    }
}

const getHistory = () => {
    return [
        {
            datetime: Date(),
            event: {
                name: "BDOC",
                userId: "someUID",
                description: "some Description",
                tag: "CREATED"
            }
        }
    ]
}

const getWorkflow = () => {
    return {
        config: {
            steps: [
                {
                    seq: 0,
                    name: "Step 1",
                    command: "Assign",
                    role: "Signatory1"
                },
                {
                    seq: 1,
                    name: "Step 2",
                    command: "Sign",
                    role: "Signatory2"    
                }
            ],
            roles: [
                {
                    roleName: "Signatory1",
                    type: "Sign" 
                },
                {
                    roleName: "Signatory2",
                    type: "Sign" 
                }
            ]
        },
        status: {
            currentStep: 0
        }
    }
}

const getPreviousVersions = () => []

function entropy(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default {
    filesToBdoc
}