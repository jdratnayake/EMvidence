import os
import numpy as np
import h5py
import sys
import json
import hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import time

ALGORITHM = "AES"
KEY_SIZE = 32  # 256 bits
ITERATION_COUNT = 100000
TAG_LENGTH = 16  # 128 bits


cfile_file_path = sys.argv[1]
h5_file_path = sys.argv[2]
key = sys.argv[3]
h5_encrypt_file_path = sys.argv[4]


def derive_key_from_password(password, salt):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=KEY_SIZE,
        salt=salt,
        iterations=ITERATION_COUNT,
        backend=default_backend()
    )
    return kdf.derive(password.encode())

def encrypt_file(file_path, password, encrypted_file_path):
    salt = os.urandom(16)
    key = derive_key_from_password(password, salt)

    with open(file_path, 'rb') as f:
        plaintext = f.read()

    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, plaintext, None)

    with open(encrypted_file_path, 'wb') as f:
        f.write(base64.b64encode(ciphertext))
        f.write(b':')
        f.write(base64.b64encode(nonce))
        f.write(b':')
        f.write(base64.b64encode(salt))

def decrypt_file(encrypted_file_path, password, decrypted_file_path):
    with open(encrypted_file_path, 'rb') as f:
        parts = f.read().split(b':')

    ciphertext = base64.b64decode(parts[0])
    nonce = base64.b64decode(parts[1])
    salt = base64.b64decode(parts[2])

    key = derive_key_from_password(password, salt)

    aesgcm = AESGCM(key)
    plaintext = aesgcm.decrypt(nonce, ciphertext, None)

    with open(decrypted_file_path, 'wb') as f:
        f.write(plaintext)


def calculate_sha256(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def calculate_md5(file_path):
    md5_hash = hashlib.md5()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            md5_hash.update(byte_block)
    return md5_hash.hexdigest()

try:
    data = np.fromfile(cfile_file_path, dtype=np.float32)
    with h5py.File(h5_file_path, 'w') as hf:
        # Create a dataset and store the data
        dset = hf.create_dataset('data', data=data, compression="gzip", compression_opts=6)
    # sha256_hash = calculate_sha256(h5_file_path)
    md5_hash = calculate_md5(h5_file_path)
    file_size = os.stat(h5_file_path)
    encrypt_file(h5_file_path, key, h5_encrypt_file_path)
    calculate_sha256(h5_encrypt_file_path)
    #decrypt_file(h5_encrypt_file_path, key, h5_file_path)

    results = { 
                "status"    : 200,
                "file_hash" : md5_hash,
                "file_size" : file_size.st_size
              }
except:
    results = {"status"   : 500}

output = json.dumps(results)
print(output)

   