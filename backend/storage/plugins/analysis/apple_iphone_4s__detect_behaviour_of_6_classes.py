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
labels = ["Using Calendar App", "Using Email App", "In Home Screen", "Using SMS App", "Using Gallary App", "Idle"]

# Redirect stdout and stderr to null
sys.stdout = open(os.devnull, 'w')
sys.stderr = open(os.devnull, 'w')

X = np.load(em_preprocessing_file_path)
model = keras.models.load_model(analysis_plugin_ml_model_path)
y = model.predict(X)

# Reset stdout and stderr to their original values
sys.stdout = original_stdout
sys.stderr = original_stderr

# Select the index of the highest probability class for each sample in y
y_pred = np.argmax(y, axis=1)
classes_counts = Counter(y_pred) # Count occurrences of elements in y_pred
classes_counts_dict = {int(key): int(value) for key, value in classes_counts.items()}
sum_of_counts = sum(classes_counts_dict.values())
classes_counts_dict_sorted = {labels[k]: round(((classes_counts_dict[k] * 100.0) / sum_of_counts), 2) for k, v in sorted(classes_counts_dict.items(), key=lambda item: item[1], reverse=True)}

output = json.dumps(classes_counts_dict_sorted)
print(output)