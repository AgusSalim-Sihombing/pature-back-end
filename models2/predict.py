# import sys
# import json
# import joblib
# import pandas as pd
# import os
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# # Load model dan encoder
# rf_model = joblib.load(os.path.join(BASE_DIR, 'rf_model.pkl'))
# le = joblib.load(os.path.join(BASE_DIR, 'label_encoder.pkl'))

# # rf_model = joblib.load( 'rf_model.pkl')
# # le = joblib.load( 'label_encoder.pkl')
# # Ambil input dari Express (JSON string)
# input_data = sys.argv[1]
# scores = json.loads(input_data)

# # Buat DataFrame untuk prediksi (sesuaikan kolom dengan feature_cols)
# feature_cols = ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran', 'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan', 'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat', 'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar', 'luas_permukaan_bangun_ruang', 'volumne_bangun_ruang', 'data', 'peluang']
# new_df = pd.DataFrame([scores])[feature_cols]  # Pastikan urutan kolom benar

# # Prediksi
# prediction_encoded = rf_model.predict(new_df)[0]
# predicted_weak = le.inverse_transform([prediction_encoded])[0]

# # Output JSON
# print(json.dumps({"predicted": predicted_weak}))

# import sys
# import json
# import pandas as pd
# import joblib
# import os
# import warnings
# warnings.filterwarnings('ignore')  # Abaikan warning scikit-learn

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# # Load model dan encoder
# try:
#     rf_model = joblib.load(os.path.join(BASE_DIR, 'rf_model.pkl'))
#     le = joblib.load(os.path.join(BASE_DIR, 'label_encoder.pkl'))
# except Exception as e:
#     print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
#     sys.exit(1)

# # Ambil input dari Express
# try:
#     input_data = sys.argv[1]
#     scores = json.loads(input_data)
# except Exception as e:
#     print(json.dumps({"error": f"Invalid input data: {str(e)}"}))
#     sys.exit(1)

# # Buat DataFrame untuk prediksi
# feature_cols = ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran', 'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan', 'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat', 'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar', 'luas_permukaan_bangun_ruang', 'volumne_bangun_ruang', 'data', 'peluang']
# try:
#     new_df = pd.DataFrame([scores])[feature_cols]
# except Exception as e:
#     print(json.dumps({"error": f"DataFrame creation failed: {str(e)}"}))
#     sys.exit(1)

# # Prediksi
# try:
#     prediction_encoded = rf_model.predict(new_df)[0]
#     predicted_weak = le.inverse_transform([prediction_encoded])[0]
#     print(json.dumps({"predicted": predicted_weak}))
# except Exception as e:
#     print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
#     sys.exit(1)

import sys
import json
import joblib
import pandas as pd
import os
import warnings
warnings.filterwarnings('ignore')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    rf_model = joblib.load(os.path.join(BASE_DIR, 'rf_model.pkl'))
    le = joblib.load(os.path.join(BASE_DIR, 'label_encoder.pkl'))
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

try:
    input_data = sys.argv[1]
    scores = json.loads(input_data)
except Exception as e:
    print(json.dumps({"error": f"Invalid input data: {str(e)}"}))
    sys.exit(1)

feature_cols = [
     'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran',
        'kpk', 'fpb', 'penjumlahan_pecahan','pengurangan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan',
        'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat',
        'waktu', 'sudut', 'keliling_bangun_datar', 'luas_bangun_datar',
        'volume_bangun_ruang','luas_permukaan_bangun_ruang', 'data', 'peluang',
        'pembagian_desimal', 'perkalian_desimal', 'pengurangan_desimal', 'penjumlahan_desimal'
]

try:
    full_scores = {col: scores.get(col, 3) for col in feature_cols}
    new_df = pd.DataFrame([full_scores])[feature_cols]
except Exception as e:
    print(json.dumps({"error": f"DataFrame creation failed: {str(e)}"}))
    sys.exit(1)
try:
    prediction_encoded = rf_model.predict(new_df)[0]
    predicted_weak = le.inverse_transform([prediction_encoded])[0]
    print(json.dumps({"predicted": predicted_weak}))
except Exception as e:
    print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
    sys.exit(1)