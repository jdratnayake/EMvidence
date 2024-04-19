import React, { useState } from 'react';
import axios from 'axios';

// traditional upload method
const FileUploadTestingPage = () => {
 const baseURL1 = "http://127.0.0.1:8000/api/TestUpload";
  const [selectedFile, setSelectedFile] = useState(null);
  const [time, setTime] = useState(0);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    let stime = performance.now();
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log('start');
      const response = await axios.post(baseURL1, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      let etime = performance.now();
      console.log('File uploaded successfully:', response.data);
      console.log('end');
      let t = ((etime - stime )/1000).toFixed(2);
      setTime(t);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
    <h1>File upload testing page</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <h1>Upload Time  :- {time} sec</h1>
    </div>
  );
};

export default FileUploadTestingPage;

// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import CryptoJS from "crypto-js";
// // import Progress from "../../components/progress";

// const FileUploadTestingPage = () => {

//   const baseURL1 = "http://127.0.0.1:8000/api/uploadChunk";
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [status, setStatus] = useState("");
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const encryptChunk = (chunk) => {
//     console.log(chunk);
//     // const encryptedChunk = CryptoJS.AES.encrypt(
//     //     CryptoJS.enc.Utf8.parse(chunk),
//     //     "yourSecretKey"
//     //   ).toString();
  
//     //   // Convert encrypted data to ArrayBuffer
//     //   const encryptedArrayBuffer = new Uint8Array(encryptedChunk.length);
//     //   for (let i = 0; i < encryptedChunk.length; i++) {
//     //       encryptedArrayBuffer[i] = encryptedChunk.charCodeAt(i);
//     //   }
  
//     //   // Create Blob from ArrayBuffer
//     //   const encryptedBlob = new Blob([encryptedArrayBuffer]);
//     //   console.log('--- encrypted data ---');
//     //   console.log(encryptedBlob);
//     //   return encryptedBlob;


//     const wordArray = CryptoJS.lib.WordArray.create(chunk);

//     // Encrypt chunk
//     const encryptedChunk = CryptoJS.AES.encrypt(wordArray, 'your-secret-key').toString();
    
//     return encryptedChunk;
//   };

//   const handleFileUpload = () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     const chunkSize = 5 * 1024 * 1024; // 5MB (adjust based on your requirements)
//     const totalChunks = Math.ceil(selectedFile.size / chunkSize);
//     const chunkProgress = 100 / totalChunks;
//     let chunkNumber = 0;
//     let start = 0;
//     let end = 0;

//     const uploadNextChunk = async () => {
//       if (end <= selectedFile.size) {
//         const chunk = selectedFile.slice(start, end);
//         const formData = new FormData();
//         const encryptedChunk = encryptChunk(chunk);
//         formData.append("file", encryptedChunk);
//         formData.append("chunkNumber", chunkNumber);
//         formData.append("totalChunks", totalChunks);
//         formData.append("originalname", selectedFile.name);

//         fetch(baseURL1, {
//           method: "POST",
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log({ data });
//             const temp = `Chunk ${
//               chunkNumber + 1
//             }/${totalChunks} uploaded successfully`;
//             setStatus(temp);
//             setProgress(Number((chunkNumber + 1) * chunkProgress));
//             console.log(temp);
//             chunkNumber++;
//             start = end;
//             end = start + chunkSize;
//             uploadNextChunk();
//           })
//           .catch((error) => {
//             console.error("Error uploading chunk:", error);
//           });
//       } else {
//         setProgress(100);
//         setSelectedFile(null);
//         setStatus("File upload completed");
//       }
//     };

//     uploadNextChunk();
//   };

//   return (
//     <div>
//       <h2>Resumable File Upload</h2>
//       <h3>{status}</h3>
//       {progress > 0 && <h2>{progress}</h2>}
//       <input type="file" onChange={handleFileChange} />
//       <Button onClick={handleFileUpload}>Upload File</Button>
//     </div>
//   );
// };

// export default FileUploadTestingPage;
