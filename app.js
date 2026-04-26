
const contractAddress = "0x11f59aA7228f4128a6681577F259a9e1efc62100";

const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_certificateID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_certificateHash",
        "type": "string"
      }
    ],
    "name": "addCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "certificates",
    "outputs": [
      {
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "course",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "certificateID",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "certificateHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "issueDate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_certificateID",
        "type": "string"
      }
    ],
    "name": "verifyCertificate",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

async function connectWallet(){

 provider = new ethers.providers.Web3Provider(window.ethereum);

 await provider.send("eth_requestAccounts", []);

 signer = provider.getSigner();

 contract = new ethers.Contract(
  contractAddress,
  abi,
  signer
 );

}

connectWallet();


async function addCertificate(){

 const name = document.getElementById("name").value;

 const course = document.getElementById("course").value;

 const certId = document.getElementById("certId").value;

 const hash = document.getElementById("hash").value;

 const tx = await contract.addCertificate(
  name,
  course,
  certId,
  hash
 );

 await tx.wait();

 alert("Certificate Added");

}


async function verifyCertificate(){

 const certId =
 document.getElementById("verifyId").value;

 const data =
 await contract.verifyCertificate(certId);

 document.getElementById("result").innerHTML =
 "Student: " + data[0] +
 "<br>Course: " + data[1] +
 "<br>Hash: " + data[2];

}
