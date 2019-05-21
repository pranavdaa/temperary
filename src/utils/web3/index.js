const Web3 = require('web3')
const contract = require('./contracts')

const network = {
    rinkeby: "https://rinkeby.infura.io/MIY5d592BKY8caiAK2TJ",
    ropsten: "https://ropsten.infura.io/MIY5d592BKY8caiAK2TJ",
    local: "http://localhost:8545"
}

var web3 = new Web3(new Web3.providers.HttpProvider(network.ropsten))


const keystore = {
    rinkeby: {
        address: "0x232D1038Ca6d21DF85F2109E6155E3f7c0Eea808",
        privateKey: "dd3853d79745bd65a3a2691052e9fe27c39a314e45780b389e5ceb236d615f6c"
    },
    ropsten: {
        address: "0x232D1038Ca6d21DF85F2109E6155E3f7c0Eea808",
        privateKey: "dd3853d79745bd65a3a2691052e9fe27c39a314e45780b389e5ceb236d615f6c"
    },
    local: {
        address: "0x9347ebf55cdb7d00b43f57d25f4e2c01b7c3a174",
        privateKey: "273067fc6f762112438589da72b96e150ba1618cf01eee93975daab4076e49c0"
    }
}

const bdocContract = new web3.eth.Contract(contract.abi, contract.address.ropsten,{
    from: keystore.ropsten.address,
    gas: 3000000,
})


const addBdoc = async (bdocId, metadathash, publicInfo, bdocHashes, pageHashes, previousVersionHashes) => {
    
    
    let data = bdocContract.methods.createBdoc(
        bdocId, 
        metadathash, 
        publicInfo,
        bdocHashes,
        pageHashes,
        previousVersionHashes)
        .encodeABI()
    
    const Tx = require('ethereumjs-tx')
    const privateKey = new Buffer.from(keystore.ropsten.privateKey, 'hex')

    let nonce = await web3.eth.getTransactionCount(keystore.ropsten.address);

    console.log("nonce: ", nonce)

    const rawTx = {
        nonce: nonce,
        gasPrice: 9000000000,
        gasLimit: 3000000,
        to: contract.address.ropsten,
        data: data
    }
    
    const tx = new Tx(rawTx);
    tx.sign(privateKey);
    
    const serializedTx = tx.serialize()

    // console.log(serializedTx.toString('hex'));
    // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
    
    web3.eth.sendSignedTransaction('0x' + 
    serializedTx.toString('hex'))
    .on('transactionHash', function(hash){
        console.log(`hash: ${hash}`)
    })
    .on('receipt', function(receipt){
        console.log(`receipt: ${JSON.stringify(receipt)}`)
        console.dir(receipt)
    })
    .on('confirmation', function(confirmationNumber, receipt){ 
        console.log(`confirmationNumber: ${confirmationNumber}, receipt: ${receipt} `)
     })
    .on('error', console.error);
}

const getBdocMapping = (bdocId, metadathash, callback) => {
    
    let data = bdocContract.methods.bdocMapping(bdocId, metadathash).encodeABI()
    
    web3.eth.call({
        from: keystore.ropsten.address,
        to: contract.address.ropsten,
        data: data
    })
    .then(receipt => {
        callback(null, processGetBdocResult(receipt))
    })
}

const getPageHashesMapping = (bdocId, metadathash, numOfPages, callback) => {
    
    var promiseArray = [];

    for(let i = 0; i < numOfPages.length; i++){
        let data = bdocContract.methods.pageHashesMapping(bdocId, metadathash, i).encodeABI()
        
        promiseArray.push(
            web3.eth.call({
                from: keystore.ropsten.address,
                to: contract.address.ropsten,
                data: data
            })
        )
    }

    Promise.all(promiseArray)
    .then(results => {
        callback(null, results)
    })

}

const processGetBdocResult = result => {
    let hashes = result.substr(0,514)
    let metadata = result.substr(514, result.length) //To get the metadata convert the data to utf-8, then remove the non-utf8 characters

    return {
        basicInfoHash: hashes.substr(0,66),
        pagesFinalHash: `0x${hashes.substr(66,66+64)}`,
        userInfoHash: `0x${hashes.substr(66,66+(64*2))}`,
        userPermissionsHash: `0x${hashes.substr(66,66+(64*3))}`,
        publicInfoHash: `0x${hashes.substr(66,66+(64*4))}`,
        historyHash: `0x${hashes.substr(66,66+(64*5))}`,
        workFlowHash: `0x${hashes.substr(66,66+(64*6))}`,
        previousVersionFinalHash: `0x${hashes.substr(66,66+(64*7))}`
    }

}

export default {
    addBdoc,
    getBdocMapping,
    getPageHashesMapping
}