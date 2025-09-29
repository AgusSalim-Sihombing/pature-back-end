import sys
import json
import joblib
import numpy as np
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model, encoder, feature columns
model = joblib.load(os.path.join(BASE_DIR, "rf_subtopic_model.joblib"))
label_encoder = joblib.load(os.path.join(BASE_DIR, "label_encoder.joblib"))
feature_columns = joblib.load(os.path.join(BASE_DIR, "feature_columns.joblib"))

# Baca input dari Node.js (stdin)
data = json.loads(sys.stdin.read())

# Ambil skor sesuai urutan feature_columns
X_input = [data.get(col, 0) for col in feature_columns]
X_input = np.array(X_input).reshape(1, -1)

# Prediksi
pred = model.predict(X_input)[0]
label = label_encoder.inverse_transform([pred])[0]

proba = model.predict_proba(X_input)[0]
labels = label_encoder.inverse_transform(range(len(proba)))
probs = {label: float(p) for label, p in zip(labels, proba)}



# Output JSON ke stdout
print(json.dumps({
    "prediction": label,
    "probabilities": probs,
    "labels":feature_columns
}))


