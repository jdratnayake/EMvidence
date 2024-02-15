import os
import numpy as np
import h5py
import sys
import json
import hashlib


cfile_file_path = sys.argv[1]
h5_file_path = sys.argv[2]


def calculate_sha256(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

try:
    data = np.fromfile(cfile_file_path, dtype=np.float32)
    with h5py.File(h5_file_path, 'w') as hf:
        # Create a dataset and store the data
        dset = hf.create_dataset('data', data=data, compression="gzip", compression_opts=6)
    sha256_hash = calculate_sha256(h5_file_path)
    file_size = os.stat(h5_file_path)
    results = { 
                "status"    : 200,
                "file_hash" : sha256_hash,
                "file_size" : file_size.st_size
              }
except:
    results = {"status"   : 500}

output = json.dumps(results)
print(output)

   