const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"name": "publicInfo",
				"type": "string"
			},
			{
				"name": "members",
				"type": "bytes32[]"
			}
		],
		"name": "createOrg",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "previousVersionHashesMapping",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userToBdocVersionHistory",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "bdocMapping",
		"outputs": [
			{
				"name": "basicInfoHash",
				"type": "bytes32"
			},
			{
				"name": "pagesmetaDataHash",
				"type": "bytes32"
			},
			{
				"name": "userInfoHash",
				"type": "bytes32"
			},
			{
				"name": "userPermissionsHash",
				"type": "bytes32"
			},
			{
				"name": "publicInfoHash",
				"type": "bytes32"
			},
			{
				"name": "historyHash",
				"type": "bytes32"
			},
			{
				"name": "workFlowHash",
				"type": "bytes32"
			},
			{
				"name": "previousVersionFinalHash",
				"type": "bytes32"
			},
			{
				"name": "publicInfo",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "keys",
		"outputs": [
			{
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"name": "expiredAt",
				"type": "uint256"
			},
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "isActive",
				"type": "bool"
			},
			{
				"name": "uid",
				"type": "bytes32"
			},
			{
				"name": "metaData",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bdocId",
				"type": "bytes32"
			},
			{
				"name": "metaDataHash",
				"type": "bytes32"
			},
			{
				"name": "sharedTo",
				"type": "address"
			},
			{
				"name": "publicInfo",
				"type": "string"
			},
			{
				"name": "bdocHashes",
				"type": "bytes32[]"
			},
			{
				"name": "pageHashes",
				"type": "bytes32[]"
			},
			{
				"name": "previousVersionHashes",
				"type": "bytes32[]"
			}
		],
		"name": "shareBdoc",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pageHashesMapping",
		"outputs": [
			{
				"name": "seq",
				"type": "uint16"
			},
			{
				"name": "hash",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bdocId",
				"type": "bytes32"
			},
			{
				"name": "metaDataHash",
				"type": "bytes32"
			},
			{
				"name": "publicInfo",
				"type": "string"
			},
			{
				"name": "bdocHashes",
				"type": "bytes32[]"
			},
			{
				"name": "pageHashes",
				"type": "bytes32[]"
			},
			{
				"name": "previousVersionHashes",
				"type": "bytes32[]"
			}
		],
		"name": "updateBdoc",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uid",
				"type": "bytes32"
			},
			{
				"name": "newAddr",
				"type": "address"
			}
		],
		"name": "addAccount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uid",
				"type": "bytes32"
			}
		],
		"name": "login",
		"outputs": [
			{
				"name": "isValidLogin",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "uid",
				"type": "bytes32"
			},
			{
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"name": "permissions",
				"type": "bytes32"
			}
		],
		"name": "isMemberValid",
		"outputs": [
			{
				"name": "isValid",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "orgMapping",
		"outputs": [
			{
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"name": "publicInfo",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bdocId",
				"type": "bytes32"
			},
			{
				"name": "metaDataHash",
				"type": "bytes32"
			},
			{
				"name": "publicInfo",
				"type": "string"
			},
			{
				"name": "bdocHashes",
				"type": "bytes32[]"
			},
			{
				"name": "pageHashes",
				"type": "bytes32[]"
			},
			{
				"name": "previousVersionHashes",
				"type": "bytes32[]"
			}
		],
		"name": "createBdoc",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"name": "uid",
				"type": "bytes32"
			},
			{
				"name": "permissions",
				"type": "bytes32"
			}
		],
		"name": "addMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "bdocId",
				"type": "bytes32"
			},
			{
				"name": "uid",
				"type": "bytes32"
			}
		],
		"name": "getLatestBdocVersionByUid",
		"outputs": [
			{
				"name": "metaDataHash",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "Accounts",
		"outputs": [
			{
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"name": "expiredAt",
				"type": "uint256"
			},
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "isActive",
				"type": "bool"
			},
			{
				"name": "uid",
				"type": "bytes32"
			},
			{
				"name": "metaData",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "recover",
		"outputs": [
			{
				"name": "isValidRecovery",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "bdocId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "metaDataHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "label",
				"type": "string"
			}
		],
		"name": "BdocEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			}
		],
		"name": "OrgCreateEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "orgId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_to",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "label",
				"type": "string"
			}
		],
		"name": "MemberEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "uid",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "label",
				"type": "string"
			}
		],
		"name": "KeyEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "uid",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "label",
				"type": "string"
			}
		],
		"name": "AccountEvent",
		"type": "event"
	}
]

//const address = "0x5eae2e648e1f0cb6f1e002003b2eeb04f3904ad8"
const address = "0x57c6fc4a1577609350E330C549544001657494A1"

module.exports = {
    abi,
    address: {
        local: "0x57c6fc4a1577609350E330C549544001657494A1",
        rinkeby: "0xe3be9ce08e6910b91ab31d350590bb77b3915833",
        ropsten: "0x617934ec996d754fc958f0b9f3d8c05715378e59"
    }
}
