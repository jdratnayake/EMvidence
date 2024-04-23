//calcuolate file hash using sha 256

// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js';

// const FileHashCalculator = () => {
//   const [file, setFile] = useState(null);
//   const [hash, setHash] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };

//   const calculateHash = () => {
//     console.log('started');
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         const fileContent = event.target.result;
//         const hash = CryptoJS.SHA256(fileContent).toString();
//         setHash(hash);
//       };

//       reader.readAsBinaryString(file);
//     }
//     console.log('ended');
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={calculateHash}>Calculate Hash</button>
//       {hash && <div>Hash: {hash}</div>}
//     </div>
//   );
// };

// export default FileHashCalculator;
