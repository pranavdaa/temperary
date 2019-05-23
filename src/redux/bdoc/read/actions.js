import types from './types'
import JSZip from 'jszip'
const getBdocMapping = require('../../../utils/web3').default.getBdocMapping
const sha256 = require('js-sha256').sha256

//READ the zipped file
const readBdoc = bdoc => dispatch => {
    
    let files = {
        isReading: true,
        IsValid: false,
        validFields: [],
        metadata: {},
        pages: [],
        error: ""
    }

    JSZip.loadAsync(bdoc).then(zip => {
        try {
            Object.keys(zip.files).forEach(key => {

                //Return the pages and metadata
                if(key.substr(key.length-1,1) === '/'){
                    //Handle Folders here
                }
                else{
                    //Handle Files here
                    if(key.includes('/')){
                        try{
                            files.pages.push({
                                name: key,
                                data: arrayBufferToString(zip.files[key]['_data'].compressedContent)
                            })
                        }
                        catch(error) {
                            //PAGES FILE CORRUPTED
                            dispatch({
                                type: types.READ_BDOC,
                                payload: {
                                    ...files,
                                    error: "pages corrupted"
                                }
                            })
                            return
                        }
                    }
                    else{
                        try{
                            files.metadata = {
                                name: key,
                                data: arrayBufferToString(zip.files[key]['_data'].compressedContent)
                            }
                        }
                        catch(error) {
                            //METADATA FILE CORRUPTED
                            dispatch({
                                type: types.READ_BDOC,
                                payload: {
                                    ...files,
                                    error: "metadata file corrupted"
                                }
                            })
                            return
                        }
                    }
                }
            })
            
            //Verify the integrity of Bdoc
            let metadata, bdocId
            try{
                metadata = JSON.parse(atob(files.metadata.data))
                bdocId = metadata.documentId
            }
            catch(error) {
                //METADATA FILE CORRUPTED
                dispatch({
                    type: types.READ_BDOC,
                    payload: {
                        ...files,
                        error: "metadata file corrupted"
                    }
                })
                return
            }

            //Compute hashes
            let hashes = generateHashes(files)
    
            let lock = false

            //Check if the number of pagesHashes and pages are equal
            if(hashes.pagesHash.length === metadata.pages.length) {
                //Check if the pageHashes match
                hashes.pagesHash.map((page, index) => {
                    if(page.hash.toString() != metadata.pages[index].hash.toString()) {
                        lock = true
                        dispatch({
                            type: types.READ_BDOC,
                            payload: {
                                ...files,
                                error: `page ${index+1} corrupted`
                            }
                        })
                        return
                    }
                })
                
                if(lock) {
                    return
                }
                else {
                    files.validFields.push("Verified Pages")
                }

                //Check if the bdoc Exists on the Blockchain with respective metadataHash
                getBdocMapping(bdocId, hashes.metadataHash, (err, result) => {
                    if(result.basicInfoHash === `0x0000000000000000000000000000000000000000000000000000000000000000`) {
                        dispatch({
                            type: types.READ_BDOC,
                            payload: {
                                ...files,
                                error: `bdoc not registered on blockchain`
                            }
                        })
                        return
                    }
                    files.IsValid = true
                    files.metadata.blockchainData = result
                    files.validFields.push("Verified Document Id")
                    files.validFields.push("Verified Metadata")
                    files.validFields.push("Verified Basic Info")
                    files.validFields.push("Verified User Info")
                    files.validFields.push("Verified Public Info")
                    files.validFields.push("Verified Version History")
                    
                    //Dispatch action according to the verification result
                    dispatch({
                        type: types.READ_BDOC,
                        payload: files
                    })
                    return
                })
            }
            else{
                dispatch({
                    type: types.READ_BDOC,
                    payload: {
                        ...files,
                        error: "pages or metadata file corrupted"
                    }
                })
                return
            }
        }
        catch(error) {
            console.error(error)
            dispatch({
                type: types.READ_BDOC,
                payload: {
                    ...files,
                    error: "bdoc file corrupted"
                }
            })
        }
        
    })
}

const completeReading = ({
    type: types.READ_COMPLETE
})

const arrayBufferToString = buffer => {
    return btoa(new Uint8Array(buffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''))
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
    readBdoc,
    completeReading
}