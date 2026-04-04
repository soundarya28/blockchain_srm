
const contractAddress = "PASTE_CONTRACT_ADDRESS";

const abi = PASTE_ABI_HERE;

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
