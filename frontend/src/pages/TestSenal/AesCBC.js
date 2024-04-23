

import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const FileEncryptor = () => {
    const [inputFile, setInputFile] = useState(null);
    const [encryptedFile, setEncryptedFile] = useState(null);

    const handleFileChange = (event) => {
        setInputFile(event.target.files[0]);
    };

    const encryptFile = () => {
        const key = CryptoJS.enc.Utf8.parse('AAAAAAAAAAAAAAAA');
        const iv = CryptoJS.lib.WordArray.random(16);
        const reader = new FileReader();

        reader.onload = () => {
            const fileData = CryptoJS.lib.WordArray.create(reader.result);
            const cipher = CryptoJS.AES.encrypt(fileData, key, { iv });
            const encryptedData = iv.concat(cipher.ciphertext);
            const encryptedBlob = new Blob([encryptedData.toString(CryptoJS.enc.Base64)], { type: 'application/octet-stream' });
            setEncryptedFile(encryptedBlob);
        };

        reader.readAsArrayBuffer(inputFile);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={encryptFile}>Encrypt File</button>
            {encryptedFile && (
                <a href={URL.createObjectURL(encryptedFile)} download={`${inputFile.name}.enc`}>Download Encrypted File</a>
            )}
        </div>
    );
};

export default FileEncryptor;




