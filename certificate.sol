// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    struct Certificate {
        string studentName;
        string course;
        string certificateID;
        string certificateHash;
        uint issueDate;
    }

    mapping(string => Certificate) public certificates;

    function addCertificate(
        string memory _studentName,
        string memory _course,
        string memory _certificateID,
        string memory _certificateHash
    ) public {

        certificates[_certificateID] = Certificate(
            _studentName,
            _course,
            _certificateID,
            _certificateHash,
            block.timestamp
        );
    }

    function verifyCertificate(string memory _certificateID)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint
        )
    {
        Certificate memory cert = certificates[_certificateID];

        return (
            cert.studentName,
            cert.course,
            cert.certificateHash,
            cert.issueDate
        );
    }
}
