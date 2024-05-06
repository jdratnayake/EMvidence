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

h5_encrypt_file_path = sys.argv[1]
key = sys.argv[2]
h5_file_path = sys.argv[3]

def derive_key_from_password(password, salt):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=KEY_SIZE,
        salt=salt,
        iterations=ITERATION_COUNT,
        backend=default_backend()
    )
    return kdf.derive(password.encode())

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

try:
    decrypt_file(h5_encrypt_file_path, key, h5_file_path)

    results = { 
                "status"    : 200,
              }
except:
    results = {"status"   : 500}

output = json.dumps(results)
print(output)

   