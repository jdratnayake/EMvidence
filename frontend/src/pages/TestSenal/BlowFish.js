// import React from 'react';
// import CryptoJS from 'crypto-js';

// class FileEncryptionApp extends React.Component {
//   state = {
//     encryptedFileURL: null
//   };

//   handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     this.encryptFile(file);
//   };

//   encryptFile = async (file) => {
//     const key = 'my_secret_key_my_secret_key'; // Same key used in the Python code
//     const iv = CryptoJS.lib.WordArray.random(8); // Generate random IV
//     const cipher = CryptoJS.algo.Blowfish.createEncryptor(CryptoJS.enc.Utf8.parse(key), { iv: iv });
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const fileData = event.target.result;
//       const encryptedData = CryptoJS.enc.Base64.stringify(cipher.finalize(CryptoJS.enc.Latin1.parse(fileData)));
//       const encryptedFileContents = iv.toString(CryptoJS.enc.Base64) + encryptedData;
      
//       // Convert encrypted file contents to Blob
//       const encryptedBlob = new Blob([encryptedFileContents], { type: 'application/octet-stream' });

//       // Create a URL for the encrypted Blob
//       const encryptedFileURL = URL.createObjectURL(encryptedBlob);

//       this.setState({ encryptedFileURL });
//     };

//     reader.readAsBinaryString(file);
//   };

//   render() {
//     const { encryptedFileURL } = this.state;

//     return (
//       <div>
//         <h1>File Encryption App</h1>
//         <input type="file" onChange={this.handleFileUpload} />
//         {encryptedFileURL && (
//           <div>
//             <a href={encryptedFileURL} download="encrypted_file.cfile">Download Encrypted File</a>
//             {/* Or use a button */}
//             {/* <button onClick={() => window.open(encryptedFileURL, '_blank')}>Download Encrypted File</button> */}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default FileEncryptionApp;

import React from 'react';
import CryptoJS from 'crypto-js';

class FileEncryptionApp extends React.Component {
  handleFileUpload = async (event) => {
    const file = event.target.files[0];
    await this.encryptFile(file);
  };

  encryptFile = async (file) => {
    const key = 'my_secret_key_my_secret_key'; // Same key used in the Python code
    const iv = CryptoJS.lib.WordArray.random(8); // Generate random IV
    const cipher = CryptoJS.algo.Blowfish.createEncryptor(CryptoJS.enc.Utf8.parse(key), { iv: iv });

    const fileReader = new FileReader();
    const fileStream = file.stream();

    fileReader.onload = async () => {
      const chunkSize = 1024 * 1024; // 1MB chunk size
      let chunk;
      let encryptedFileContents = iv.toString(CryptoJS.enc.Base64);

      while ((chunk = await fileStream.read(chunkSize))) {
        const encryptedChunk = cipher.process(CryptoJS.enc.Latin1.parse(chunk));
        encryptedFileContents += CryptoJS.enc.Base64.stringify(encryptedChunk);
      }

      // Finalize encryption
      encryptedFileContents += CryptoJS.enc.Base64.stringify(cipher.finalize());

      // Convert encrypted file contents to Blob
      const encryptedBlob = new Blob([CryptoJS.enc.Base64.parse(encryptedFileContents)], { type: 'application/octet-stream' });

      // Create temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(encryptedBlob);
      link.download = 'encrypted_file.cfile';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    fileReader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <div>
        <h1>File Encryption App</h1>
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default FileEncryptionApp;
