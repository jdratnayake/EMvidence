import sys
import h5py
import numpy as np
from scipy import signal
from sklearn.preprocessing import MinMaxScaler
import json

def getData(cfileName):
    data = np.fromfile(cfileName, dtype="float32")
    data = data[0::2] + 1j*data[1::2]

    return data

def downSampling(data,sampling_rate,down_sampling_rate):
    secs = len(data)/sampling_rate
    samps = int (secs * down_sampling_rate)
    data = signal.resample(data,samps)
    return data

def downSamplingHandle(data,down_sampling_index):
    if down_sampling_index == "0":
        dataDownsampled = data
    elif down_sampling_index == "1":
        dataDownsampled = downSampling(data,20e6,10e6)
    elif down_sampling_index == "2":
        dataDownsampled = downSampling(data,20e6,8e6)
    elif down_sampling_index == "3":
        dataDownsampled = downSampling(data,20e6,4e6)

    return dataDownsampled        

def fourierTransformation(data,fourier_transformation_index):
    if fourier_transformation_index == "0":
        f, t, Zxx = signal.stft(data, fs=20e6, nperseg=2048, noverlap=256, return_onesided=False)
    elif fourier_transformation_index == "1":
        f, t, Zxx = signal.stft(data, fs=20e6, nperseg=1024, noverlap=256, return_onesided=False)

    return Zxx    


def sampleSelectionMidFifty(data):
    start_index = int(0.25 * data.shape[0])
    end_index = int(0.75 * data.shape[0])
    data = data[start_index:end_index,:]
    return data

def sampleSelectionFirstTwentyK(data):
    num_elements_axis_0 = data.shape[0]
    if num_elements_axis_0 > 20000:
        data = data[:20000,:]
    return data

def sampleSelectionHandle(X,sample_selection_index):
    if sample_selection_index == "0":
         return X
    elif sample_selection_index == "1":
        X = sampleSelectionFirstTwentyK(X)
        return X
    elif sample_selection_index == "2":
        X = sampleSelectionMidFifty(X)
        return X   

# Command-line arguments
em_raw_file_path = sys.argv[1]
em_preprocessed_directory_path = sys.argv[2]
# 0 -> no downsampling 1 -> 10MHz 2-> 8MHz 3 -> 4MHz
down_sampling_index = sys.argv[3]
# 0 -> stft with fft size 2048 2 -> stft with fft size 1024
fourier_transformation_index = sys.argv[4]

sample_selection_index = sys.argv[5]

# Customizable parameters
num_samp_per_class = 10000
# fft_size = 2048
fft_size = 2048
fft_overlap = 256



data = getData(em_raw_file_path)
dataDownsampled = downSamplingHandle(data,down_sampling_index)
Zxx = fourierTransformation(dataDownsampled,fourier_transformation_index)
X = Zxx.transpose()
X = abs(X)
X = sampleSelectionHandle(X,sample_selection_index)
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
    if down_sampling_index == "0":
        print(json.dumps({"status": "success with index"}))
    else:        
        print(json.dumps({"status": "success"}))
except Exception as e:
    print(json.dumps({"status": "fail", "error": e}))