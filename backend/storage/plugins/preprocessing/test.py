import sys
import h5py
import numpy as np
from scipy import signal
from sklearn.preprocessing import MinMaxScaler

# sys.argv contains the list of command-line arguments
em_raw_file_path = sys.argv[1]

# customizable parameters
num_samp_per_class = 10000
fft_size = 2048
fft_overlap = 256
directory_path = "/var/www/html"

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

file_path_for_array = f"{directory_path}" + "/storage/em_preprocessed/" + em_raw_file_path.split("/")[-1].split(".")[0] + ".txt"

# try:
#     np.savetxt(file_path_for_array, X)
#     print("Success")
# except Exception as e:
#     print("Fail")
# print("Hi")

# file_path_for_array = f"{directory_path}" + "/storage/em_preprocessed/" + em_raw_file_path.split("/")[-1].split(".")[0]
# with h5py.File(f'{file_path_for_array}.h5', 'w') as f:
#     f.create_dataset(file_path_for_array, data=X)

chunk_size = 1000  # Define your desired chunk size

try:
    with open(file_path_for_array, 'w') as f:
        for i in range(0, X.shape[0], chunk_size):
            chunk = X[i:i+chunk_size]
            np.savetxt(f, chunk, fmt='%.8f')
    print("Success")
except Exception as e:
    print(f"An error occurred: {e}")