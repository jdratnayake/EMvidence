import React, { useState } from "react";
import pako from "pako";

const FileCompressionApp = () => {
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [compressedFile, setCompressedFile] = useState(null);
    const [file, setFile] =  useState(null);
    const [time, setTime] =  useState(0);

    // Compress the file
    const compressFile = async (selectedFile) => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }
        console.log('start');
        let time1 = performance.now();
        const compressedFileName = `${selectedFile.name}.def`;
        const CHUNK_SIZE = 1024 * 1024 * 20;
        const originalFileName = selectedFile.name;
        const compressedChunks = [];
        let offset = 0;

        const readNextChunk = () => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const chunkData = new Uint8Array(event.target.result);
                const compressedData = pako.deflate(chunkData);
                compressedChunks.push(compressedData);

                offset += CHUNK_SIZE;
                setCompressionProgress((offset / selectedFile.size) * 100);

                if (offset < selectedFile.size) {
                    readNextChunk();
                } else {
                    const compressedResult = concatenateUint8Arrays(compressedChunks);

                    const compressedBlob = new Blob([compressedResult], {
                        type: "application/deflate",
                    });

                    setCompressedFile(compressedBlob);
                    let time2 = performance.now();
                    let time = ((time2 - time1) / 1000).toFixed(2);
                    setTime(time);
                    console.log("Time for Compression : ", time, " sec");
                }
            };

            const chunk = selectedFile.slice(offset, offset + CHUNK_SIZE);
            reader.readAsArrayBuffer(chunk);
        };

        readNextChunk();
    };

    const concatenateUint8Arrays = (arrays) => {
        const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
        const result = new Uint8Array(totalLength);

        let offset = 0;
        arrays.forEach((arr) => {
            result.set(arr, offset);
            offset += arr.length;
        });

        return result;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleFileChange2 = () => {
       
        compressFile(file);
    };


    return (
        <div style={{paddingLeft:3}}>
            <h1>Test Deflate</h1>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" onClick={handleFileChange2}> start</button>
            <div>Compression Progress: {compressionProgress}%</div>
            <h3>time taken : {time} sec</h3>
            {compressedFile && (
                <h3>Compressed file size : {(compressedFile.size/(1024*1024)).toFixed(2)} MB</h3>
            )}
            {compressedFile && (
                <a href={URL.createObjectURL(compressedFile)} download={`${compressedFile.name}`}>
                    Download Compressed File
                </a>
            )}

        </div>
    );
};

export default FileCompressionApp;
