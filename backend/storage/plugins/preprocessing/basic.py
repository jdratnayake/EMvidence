import sys
import h5py
import numpy as np
from scipy import signal
from sklearn.preprocessing import MinMaxScaler
import json

# Command-line arguments
em_raw_file_path = sys.argv[1]
em_preprocessed_directory_path = sys.argv[2]

# Customizable parameters
num_samp_per_class = 10000
fft_size = 2048
fft_overlap = 256

def getData(cfileName):
    data = np.fromfile(cfileName, dtype="float32")
    data = data[0::2] + 1j*data[1::2]

    return data

data = getData(em_raw_file_path)
f, t, Zxx = signal.stft(data, fs=20e6, nperseg=fft_size, noverlap=fft_overlap, return_onesided=False)
X = Zxx.transpose()
X = abs(X)
scaler = MinMaxScaler()
scaler.fit(X)
X = scaler.transform(X)

file_path_for_array = f"{em_preprocessed_directory_path}" + "/" + em_raw_file_path.split("/")[-1].split(".")[0] + ".npy"


# Writing the array to a bin file
# np.save(file_path_for_array, X)

# new_arr = np.load(file_path_for_array)
# output = json.dumps({"type":str(new_arr.shape)})
# print(output)

try:
    np.save(file_path_for_array, X)
    print(json.dumps({"status": "success"}))
except Exception as e:
    print(json.dumps({"status": "fail", "error": e}))