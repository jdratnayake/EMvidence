import sys
import os
import json
import numpy as np
from tensorflow import keras
from collections import Counter

# Command-line arguments
em_preprocessing_file_path = sys.argv[1]
analysis_plugin_ml_model_path = sys.argv[2]

original_stdout = sys.stdout
original_stderr = sys.stderr
chunk_size = 1000  # Define your chunk size

# Redirect stdout and stderr to null
sys.stdout = open(os.devnull, 'w')
sys.stderr = open(os.devnull, 'w')

loaded_data = []
with open(em_preprocessing_file_path, 'r') as f:
    while True:
        # Read chunk_size number of lines
        chunk = np.loadtxt(f, max_rows=chunk_size)
        if not chunk.size:
            break  # Exit the loop if no more data
        loaded_data.append(chunk)

X = np.concatenate(loaded_data)
model = keras.models.load_model(analysis_plugin_ml_model_path)
y = model.predict(X)

# Reset stdout and stderr to their original values
sys.stdout = original_stdout
sys.stderr = original_stderr

# Select the index of the highest probability class for each sample in y
y_pred = np.argmax(y, axis=1)
classes_counts = Counter(y_pred) # Count occurrences of elements in y_pred
classes_counts_dict = {int(key): int(value) for key, value in classes_counts.items()}
classes_counts_dict_sorted = {k: classes_counts_dict[k] for k in sorted(classes_counts_dict)} # Order the dictionary by keys

output = json.dumps(classes_counts_dict_sorted)
print(output)