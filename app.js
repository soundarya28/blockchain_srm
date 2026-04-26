
const contractAddress = "0x11f59aA7228f4128a6681577F259a9e1efc62100";

const contractABI = [
 
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

async function connectWallet() {
    try {
        if (typeof window.ethereum === "undefined") {
            alert("Please install MetaMask");
            return;
        }

        await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        console.log("Contract initialized:", contract);
        alert("Wallet Connected!");
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function addCertificate() {
    try {
        if (!contract) {
            await connectWallet();
        }

        const certId = document.getElementById("certId").value;
        const name = document.getElementById("name").value;
        const course = document.getElementById("course").value;
        const hash = document.getElementById("hash").value;

        const tx = await contract.addCertificate(
            certId,
            name,
            course,
            hash
        );
        alert("Transaction submitted!\nWaiting for confirmation...");

        const receipt = await tx.wait();

        console.log("Transaction Receipt:", receipt);


        alert("Certificate added successfully!");
    } catch (error) {
        console.error("Add Certificate Error:", error);
        alert(error.reason || error.message);
    }
}

async function verifyCertificate() {
    try {
        if (!contract) {
            await connectWallet();
        }

        const certId = document.getElementById("verifyId").value.trim();

        if (!certId) {
            document.getElementById("result").innerHTML =
                "<p style='color:red;'>Please enter a Certificate ID.</p>";
            return;
        }

        // Fetch certificate directly from mapping
        const result = await contract.certificates(certId);

        console.log("Certificate Data:", result);

        // Check whether certificate exists
        if (!result.studentName || result.studentName === "") {
            document.getElementById("result").innerHTML = `
                <p style="color:red; font-weight:bold;">
                    Certificate Not Found
                </p>
            `;
            return;
        }

        document.getElementById("result").innerHTML = `
            <div class="success">
                <h3>✅ Certificate Verified Successfully</h3>
                <p><strong>Student Name:</strong> ${result.studentName}</p>
                <p><strong>Course:</strong> ${result.course}</p>
                <p><strong>Certificate ID:</strong> ${result.certificateID}</p>
                <p><strong>Certificate Hash:</strong> ${result.certificateHash}</p>
                <p><strong>Issued On:</strong> 
                    ${new Date(Number(result.issueDate) * 1000).toLocaleString()}
                </p>
            </div>
        `;
    } catch (error) {
        console.error("Verification Error:", error);

        document.getElementById("result").innerHTML = `
            <p style="color:red; font-weight:bold;">
                Verification Failed
            </p>
        `;
    }
}

window.addEventListener("load", connectWallet);
