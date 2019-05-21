import types from './types'
import JSZip from 'jszip'
const getBdocMapping = require('../../../utils/web3').default.getBdocMapping
const sha256 = require('js-sha256').sha256

//READ the zipped file
const readBdoc = bdoc => dispatch => {
    
    let files = {
        IsValid: false,
        metadata: {},
        pages: []
    }

    JSZip.loadAsync(bdoc).then(zip => {
        Object.keys(zip.files).forEach(key => {
        
            //Return the pages and metadata

            if(key.substr(key.length-1,1) === '/'){
                //Handle Folders here
            }
            else{
                //Handle Files here
                if(key.includes('/')){
                    
                    files.pages.push({
                        name: key,
                        data: arrayBufferToString(zip.files[key]['_data'].compressedContent)
                    })
                }
                else{

                    files.metadata = {
                        name: key,
                        data: arrayBufferToString(zip.files[key]['_data'].compressedContent)
                    }
                }
            }
        })
        
        //Verify the integrity of Bdoc

        let metadata = JSON.parse(atob(files.metadata.data))
        let bdocId = metadata.documentId

        //Compute hashes
        let hashes = generateHashes(files)
        
        //IsValid is used to check the integrity of the bdoc 
        let IsValid;

        //Check if the pageHashes match
        hashes.pagesHash.map((page, index) => {
            IsValid = (page.hash.toString() === metadata.pages[index].hash.toString())
        })

        //Check if the bdoc Exists on the Blockchain with respective metadataHash
        getBdocMapping(bdocId, hashes.metadataHash, (err, result) => {
            IsValid = IsValid && !!Object.keys(result).length
            files.IsValid = IsValid
            
            //Dispatch action according to the verification result
            dispatch({
                type: types.READ_BDOC,
                payload: files
            })
        })
    })

}

const arrayBufferToString = buffer => {
    return btoa(new Uint8Array(buffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''))
}

const verifyBdoc = (bdoc, callback) => {
    callback(null, true)
}

const generateHashes = files => {

    //Compute Metadata Hash
    //We have to sanatize the data by parsing and stringifying the retrieved metadata
    //to get the right metadataHash
    let metadataHash = `0x${sha256(sanatize(atob(files.metadata.data)))}`

    //Compute Pages Hash
    let pagesHash = files.pages.map((page, index) => {
        return {
            seq: index+1,
            hash: `0x${sha256(page.data)}`
        }
    })

    return {
        metadataHash,
        pagesHash
    }

}

const sanatize = data => {
    return JSON.stringify(JSON.parse(data))
}

export default {
    readBdoc
}