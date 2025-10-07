// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { RandomForestClassifier } = require("ml-random-forest");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // ====== Contoh Data Latih ======
// let trainingData = [
//   [1, 0, 1, 0], // siswa 1
//   [0, 1, 0, 1], // siswa 2
//   [1, 1, 0, 0], // siswa 3
//   [0, 0, 1, 1]  // siswa 4
// ];
// let labels = ["desimal", "aljabar", "desimal", "pecahan"];

// // Encode labels ke angka
// const labelEncoder = {};
// const labelDecoder = {};
// labels.forEach(lbl => {
//   if (!(lbl in labelEncoder)) {
//     let id = Object.keys(labelEncoder).length;
//     labelEncoder[lbl] = id;
//     labelDecoder[id] = lbl;
//   }
// });
// const encodedLabels = labels.map(l => labelEncoder[l]);

// console.log("Encoded Labels:", encodedLabels);

// // Training model
// const rf = new RandomForestClassifier({
//   nEstimators: 10,
//   maxFeatures: 2,   // 🔑 batasi jumlah fitur agar tidak error
//   replacement: true
// });
// rf.train(trainingData, encodedLabels);

// // ====== API untuk prediksi ======
// app.post("/predict", (req, res) => {
//   const { answers } = req.body;

//   if (!answers || !Array.isArray(answers)) {
//     return res.status(400).json({ error: "Jawaban tidak valid" });
//   }

//   // Pastikan jumlah fitur sama dengan data latih
//   if (answers.length !== trainingData[0].length) {
//     return res.status(400).json({ error: "Jumlah jawaban tidak sesuai jumlah fitur" });
//   }

//   const prediction = rf.predict([answers])[0];
//   const decodedPrediction = labelDecoder[prediction];

//   res.json({ prediction: decodedPrediction });
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// ====== Versi dengan Python ======pada folder models
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { spawn } = require("child_process");
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // ====== API untuk prediksi ======
// app.post("/predict", (req, res) => {
//   const inputData = req.body; // misalnya { penjumlahan: 3, perkalian: 5, ... } 

//   const py = spawn("python", ["models/predict.py"]);

//   let dataString = "";

//   py.stdin.write(JSON.stringify(inputData));
//   py.stdin.end();

//   py.stdout.on("data", (data) => {
//     dataString += data.toString();
//   });

//   py.stdout.on("end", () => {
//     try {
//       const result = JSON.parse(dataString);
//       res.json(result);
//     } catch (err) {
//       res.status(500).json({ error: "Gagal parsing hasil prediksi", detail: err.message });
//     }
//   });

//   py.stderr.on("data", (data) => {
//     console.error("Python error:", data.toString());
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });











//versi final DENGAN FOLDER MODELS2
// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // Endpoint untuk submit jawaban beberapa sub-topik
// app.post('/submit-answers', (req, res) => {
//     const { student_id, subtopiks } = req.body;

//     // Validasi input
//     if (!subtopiks || !Array.isArray(subtopiks) || subtopiks.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: subtopiks harus array non-kosong' });
//     }

//     const all_subtopik = ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran', 'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan', 'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat', 'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar', 'luas_permukaan_bangun_ruang', 'volumne_bangun_ruang', 'data', 'peluang'];

//     // Hitung skor untuk setiap sub-topik
//     const scores = {};
//     const skor_per_subtopik = {};

//     for (const item of subtopiks) {
//         const { subtopik, jawaban, kunci_jawaban } = item;
//         if (!subtopik || !all_subtopik.includes(subtopik) || !Array.isArray(jawaban) || !Array.isArray(kunci_jawaban) || jawaban.length !== 5 || kunci_jawaban.length !== 5) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban dan kunci_jawaban harus array 5 elemen` });
//         }

//         // Hitung skor
//         let skor = 0;
//         for (let i = 0; i < jawaban.length; i++) {
//             if (jawaban[i] === kunci_jawaban[i]) {
//                 skor++;
//             }
//         }
//         scores[subtopik] = skor;
//         skor_per_subtopik[subtopik] = skor;
//     }

//     // Isi skor default (3) untuk sub-topik yang belum dijawab
//     const full_scores = {};
//     all_subtopik.forEach(st => {
//         full_scores[st] = scores[st] !== undefined ? scores[st] : 3;
//     });

//     // Jalankan Python untuk prediksi
//     const pythonProcess = spawn('C:/Python311/python.exe', ['models2/predict.py', JSON.stringify(full_scores)]);

//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`Python Error: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         try {
//             const result = JSON.parse(output.trim());
//             if (result.error) {
//                 return res.status(500).json({ error: `ML Prediction failed: ${result.error}` });
//             }
//             return res.json({
//                 skor_per_subtopik: skor_per_subtopik,
//                 max_skor: 5,
//                 prediksi_kelemahan: result.predicted,
//                 feedback: `Skor: ${JSON.stringify(skor_per_subtopik)}. Kelemahan utama: ${result.predicted}`
//             });
//         } catch (e) {
//             return res.status(500).json({ error: `Parse error in Python output: ${e.message}` });
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // Batasi jumlah concurrent Python processes (opsional)
// const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
// const maxPythonProcesses = 10; // Sesuaikan dengan spesifikasi server
// let activeProcesses = 0;

// // Endpoint untuk submit jawaban
// app.post('/submit-answers', async (req, res) => {
//     if (activeProcesses >= maxPythonProcesses) {
//         return res.status(429).json({ error: 'Server sibuk, coba lagi nanti' });
//     }

//     const { student_id, subtopiks } = req.body;

//     // Validasi input
//     if (!subtopiks || !Array.isArray(subtopiks) || subtopiks.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: subtopiks harus array non-kosong' });
//     }

//     const all_subtopik = ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran', 'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan', 'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat', 'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar', 'luas_permukaan_bangun_ruang', 'volumne_bangun_ruang', 'data', 'peluang'];

//     // Hitung skor
//     const scores = {};
//     const skor_per_subtopik = {};
//     for (const item of subtopiks) {
//         const { subtopik, jawaban, kunci_jawaban } = item;
//         if (!subtopik || !all_subtopik.includes(subtopik) || !Array.isArray(jawaban) || !Array.isArray(kunci_jawaban) || jawaban.length !== 5 || kunci_jawaban.length !== 5) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban dan kunci_jawaban harus array 5 elemen` });
//         }

//         let skor = 0;
//         for (let i = 0; i < jawaban.length; i++) {
//             if (jawaban[i] === kunci_jawaban[i]) {
//                 skor++;
//             }
//         }
//         scores[subtopik] = skor;
//         skor_per_subtopik[subtopik] = skor;
//     }

//     // Isi skor default
//     const full_scores = {};
//     all_subtopik.forEach(st => {
//         full_scores[st] = scores[st] !== undefined ? scores[st] : 3;
//     });

//     // Jalankan Python
//     activeProcesses++;
//     console.log(`[LOG] Processing request for student_id: ${student_id}, Active processes: ${activeProcesses}`);
//     console.log("Full scores yang dikirim ke Python:", full_scores);
//     const pythonProcess = spawn('C:/Users/LENOVO/AppData/Local/Programs/Python/Python313/python.exe', ['models2/predict.py', JSON.stringify(full_scores)]);

//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`[ERROR] Python Error for ${student_id}: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         activeProcesses--;
//         console.log(`[LOG] Completed request for ${student_id}, Active processes: ${activeProcesses}`);

//         try {
//             const result = JSON.parse(output.trim());
//             if (result.error) {
//                 return res.status(500).json({ error: `ML Prediction failed: ${result.error}` });
//             }
//             return res.json({
//                 student_id: student_id,
//                 skor_per_subtopik: skor_per_subtopik,
//                 max_skor: 5,
//                 prediksi_kelemahan: result.predicted,
//                 feedback: `Skor: ${JSON.stringify(skor_per_subtopik)}. Kelemahan utama: ${result.predicted}`
//             });
//         } catch (e) {
//             return res.status(500).json({ error: `Parse error in Python output: ${e.message}` });
//         }
//     });

//     pythonProcess.on('error', (err) => {
//         activeProcesses--;
//         console.error(`[ERROR] Python process error for ${student_id}: ${err.message}`);
//         return res.status(500).json({ error: `Python process failed: ${err.message}` });
//     }); 
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const maxPythonProcesses = 10;
// let activeProcesses = 0;

// app.post('/submit-answers', async (req, res) => {
//     if (activeProcesses >= maxPythonProcesses) {
//         return res.status(429).json({ error: 'Server sibuk, coba lagi nanti' });
//     }

//     const { student_id, subtopiks } = req.body;
//     const threshold = 2; // Sub-topik lemah jika skor <=2

//     if (!subtopiks || !Array.isArray(subtopiks) || subtopiks.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: subtopiks harus array non-kosong' });
//     }

//     const all_subtopik = [
//         'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran',
//         'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan',
//         'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat',
//         'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar',
//         'luas_permukaan_bangun_ruang', 'volume_bangun_ruang', 'data', 'peluang',
//         'pembagian_desimal', 'perkalian_desimal', 'pengurangan_desimal', 'penjumlahan_desimal'
//     ];

//     const scores = {};
//     const skor_per_subtopik = {};
//     for (const item of subtopiks) {
//         const { subtopik, jawaban, kunci_jawaban } = item;
//         if (!subtopik || !all_subtopik.includes(subtopik) || !Array.isArray(jawaban) || !Array.isArray(kunci_jawaban) || jawaban.length !== 5 || kunci_jawaban.length !== 5) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban dan kunci_jawaban harus array 5 elemen` });
//         }

//         let skor = 0;
//         for (let i = 0; i < jawaban.length; i++) {
//             if (String(jawaban[i]) === String(kunci_jawaban[i])) { // Pastikan string
//                 skor++;
//             }
//         }
//         scores[subtopik] = skor;
//         skor_per_subtopik[subtopik] = skor;
//     }

//     const full_scores = {};
//     all_subtopik.forEach(st => {
//         full_scores[st] = scores[st] !== undefined ? scores[st] : 3;
//     });

//     activeProcesses++;
//     console.log(`[LOG] Processing request for ${student_id}, Active processes: ${activeProcesses}`);
//     console.log("Full scores:", full_scores);

//     const pythonProcess = spawn('C:/Users/LENOVO/AppData/Local/Programs/Python/Python313/python.exe', ['models2/predict.py', JSON.stringify(full_scores)]);
//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`[ERROR] Python Error for ${student_id}: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         activeProcesses--;
//         console.log(`[LOG] Completed request for ${student_id}, Active processes: ${activeProcesses}`);

//         try {
//             const result = JSON.parse(output.trim());
//             if (result.error) {
//                 return res.status(500).json({ error: `ML Prediction failed: ${result.error}` });
//             }

//             // Deteksi sub-topik lemah berdasarkan threshold
//             const subtopik_lemah = Object.keys(full_scores).filter(st => full_scores[st] <= threshold);

//             return res.json({
//                 student_id,
//                 skor_per_subtopik,
//                 max_skor: 5,
//                 prediksi_kelemahan_utama: result.predicted,
//                 subtopik_lemah,
//                 feedback: `Skor: ${JSON.stringify(skor_per_subtopik)}. Kelemahan utama: ${result.predicted}. Sub-topik lemah lainnya: ${subtopik_lemah.join(', ') || 'Tidak ada'}.`
//             });
//         } catch (e) {
//             return res.status(500).json({ error: `Parse error: ${e.message}` });
//         }
//     });

//     pythonProcess.on('error', (err) => {
//         activeProcesses--;
//         console.error(`[ERROR] Python process error for ${student_id}: ${err.message}`);
//         return res.status(500).json({ error: `Python process failed: ${err.message}` });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const maxPythonProcesses = 10;
// let activeProcesses = 0;

// app.post('/submit-answers', async (req, res) => {
//     if (activeProcesses >= maxPythonProcesses) {
//         return res.status(429).json({ error: 'Server sibuk, coba lagi nanti' });
//     }

//     const { student_id, subtopiks } = req.body;
//     const threshold = 2;

//     if (!subtopiks || !Array.isArray(subtopiks) || subtopiks.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: subtopiks harus array non-kosong' });
//     }

//     const all_subtopik = [
//         'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran',
//         'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan',
//         'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat',
//         'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar', // Perbaiki ke keliling_bangun_ruang
//         'luas_permukaan_bangun_ruang', 'volume_bangun_ruang', 'data', 'peluang',
//         'pembagian_desimal', 'perkalian_desimal', 'pengurangan_desimal', 'penjumlahan_desimal'
//     ]; 

//     const scores = {};
//     const skor_per_subtopik = {};
//     for (const item of subtopiks) {
//         const { subtopik, jawaban, kunci_jawaban } = item;
//         console.log(`Validasi subtopik: ${subtopik}, Jawaban: ${JSON.stringify(jawaban)}, Kunci: ${JSON.stringify(kunci_jawaban)}`);
//         if (!subtopik || !all_subtopik.includes(subtopik) || !Array.isArray(jawaban) || !Array.isArray(kunci_jawaban) || jawaban.length !== 5 || kunci_jawaban.length !== 5) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban dan kunci_jawaban harus array 5 elemen` });
//         }
//         // Validasi jawaban tidak kosong
//         if (jawaban.some(j => j === "")) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban tidak boleh kosong` });
//         }

//         let skor = 0;
//         for (let i = 0; i < jawaban.length; i++) {
//             if (String(jawaban[i]) === String(kunci_jawaban[i])) {
//                 skor++;
//             }
//         }
//         scores[subtopik] = skor;
//         skor_per_subtopik[subtopik] = skor;
//     }

//     const full_scores = {};
//     all_subtopik.forEach(st => {
//         full_scores[st] = scores[st] !== undefined ? scores[st] : 3;
//     });

//     activeProcesses++;
//     console.log(`[LOG] Processing request for ${student_id}, Active processes: ${activeProcesses}`);
//     console.log("Full scores:", full_scores);

//     const pythonProcess = spawn('C:/Users/LENOVO/AppData/Local/Programs/Python/Python313/python.exe', ['models2/predict.py', JSON.stringify(full_scores)]);
//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`[ERROR] Python Error for ${student_id}: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         activeProcesses--;
//         console.log(`[LOG] Completed request for ${student_id}, Active processes: ${activeProcesses}`);

//         try {
//             const result = JSON.parse(output.trim());
//             if (result.error) {
//                 return res.status(500).json({ error: `ML Prediction failed: ${result.error}` });
//             }

//             const subtopik_lemah = Object.keys(scores).filter(st => scores[st] <= threshold);

//             return res.json({
//                 student_id,
//                 skor_per_subtopik,
//                 max_skor: 5,
//                 prediksi_kelemahan_utama: result.predicted,
//                 subtopik_lemah,
//                 feedback: `Skor: ${JSON.stringify(skor_per_subtopik)}. Kelemahan utama: ${result.predicted}. Sub-topik lemah lainnya: ${subtopik_lemah.join(', ') || 'Tidak ada'}.`
//             });
//         } catch (e) {
//             return res.status(500).json({ error: `Parse error: ${e.message}` });
//         }
//     });

//     pythonProcess.on('error', (err) => {
//         activeProcesses--;
//         console.error(`[ERROR] Python process error for ${student_id}: ${err.message}`);
//         return res.status(500).json({ error: `Python process failed: ${err.message}` });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;  // Dinamis untuk Heroku

// app.use(cors());
// app.use(bodyParser.json());

// const maxPythonProcesses = 10;
// let activeProcesses = 0;

// app.post('/submit-answers', async (req, res) => {
//     if (activeProcesses >= maxPythonProcesses) {
//         return res.status(429).json({ error: 'Server sibuk, coba lagi nanti' });
//     }

//     const { student_id, subtopiks } = req.body;
//     const threshold = 2;

//     if (!subtopiks || !Array.isArray(subtopiks) || subtopiks.length === 0) {
//         return res.status(400).json({ error: 'Invalid input: subtopiks harus array non-kosong' });
//     }

//     const all_subtopik = [
//         'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran',
//         'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan',
//         'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat',
//         'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar',
//         'luas_permukaan_bangun_ruang', 'volume_bangun_ruang', 'data', 'peluang',
//         'pembagian_desimal', 'perkalian_desimal', 'pengurangan_desimal', 'penjumlahan_desimal'
//     ];

//     const scores = {};
//     const skor_per_subtopik = {};
//     for (const item of subtopiks) {
//         const { subtopik, jawaban, kunci_jawaban } = item;
//         console.log(`Validasi subtopik: ${subtopik}, Jawaban: ${JSON.stringify(jawaban)}, Kunci: ${JSON.stringify(kunci_jawaban)}`);
//         if (!subtopik || !all_subtopik.includes(subtopik) || !Array.isArray(jawaban) || !Array.isArray(kunci_jawaban) || jawaban.length !== 5 || kunci_jawaban.length !== 5) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban dan kunci_jawaban harus array 5 elemen` });
//         }
//         if (jawaban.some(j => j === "")) {
//             return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban tidak boleh kosong` });
//         }

//         let skor = 0;
//         for (let i = 0; i < jawaban.length; i++) {
//             if (String(jawaban[i]) === String(kunci_jawaban[i])) {
//                 skor++;
//             }
//         }
//         scores[subtopik] = skor;
//         skor_per_subtopik[subtopik] = skor;
//     }

//     const full_scores = {};
//     all_subtopik.forEach(st => {
//         full_scores[st] = scores[st] !== undefined ? scores[st] : 3;
//     });

//     activeProcesses++;
//     console.log(`[LOG] Processing request for ${student_id}, Active processes: ${activeProcesses}`);
//     console.log("Full scores:", full_scores);

//     // Gunakan 'python' untuk Heroku (atau path lokal untuk test)
//     const pythonProcess = spawn('python', ['models2/predict.py', JSON.stringify(full_scores)]);
//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//         console.log(`[PYTHON STDOUT] ${data}`);
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`[ERROR] Python Error for ${student_id}: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//         activeProcesses--;
//         console.log(`[LOG] Completed request for ${student_id}, Active processes: ${activeProcesses}, Exit code: ${code}`);
//         try {
//             if (!output.trim()) {
//                 throw new Error('Python output is empty');
//             }
//             const result = JSON.parse(output.trim());
//             if (result.error) {
//                 return res.status(500).json({ error: `ML Prediction failed: ${result.error}` });
//             }

//             const subtopik_lemah = Object.keys(scores).filter(st => scores[st] <= threshold);

//             return res.json({
//                 student_id,
//                 skor_per_subtopik,
//                 max_skor: 5,
//                 prediksi_kelemahan_utama: result.predicted,
//                 subtopik_lemah,
//                 feedback: `Skor: ${JSON.stringify(skor_per_subtopik)}. Kelemahan utama: ${result.predicted}. Sub-topik lemah lainnya: ${subtopik_lemah.join(', ') || 'Tidak ada'}.`
//             });
//         } catch (e) {
//             return res.status(500).json({ error: `Parse error: ${e.message}` });
//         }
//     });

//     pythonProcess.on('error', (err) => {
//         activeProcesses--;
//         console.error(`[ERROR] Python process error for ${student_id}: ${err.message}`);
//         return res.status(500).json({ error: `Python process failed: ${err.message}` });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const maxPythonProcesses = 10;
let activeProcesses = 0;

app.post('/submit-answers', async (req, res) => {
    if (activeProcesses >= maxPythonProcesses) {
        return res.status(429).json({ error: 'Server sibuk, coba lagi nanti' });
    }

    const { student_id, subtopiks } = req.body;
    const threshold = 2;

    if (!subtopiks || !Array.isArray(subtopiks) || subtopiks.length === 0) {
        return res.status(400).json({ error: 'Invalid input: subtopiks harus array non-kosong' });
    }

    const all_subtopik = [
        'penjumlahan', 'pengurangan', 'perkalian', 'pembagian', 'operasi_campuran',
        'kpk', 'fpb', 'penjumlahan_pecahan', 'perkalian_pecahan', 'pembagian_pecahan',
        'mengurutkan', 'pola_bilangan', 'operasi_aljabar', 'panjang', 'berat',
        'waktu', 'sudut', 'keliling_bangun_ruang', 'luas_bangun_datar',
        'luas_permukaan_bangun_ruang', 'volume_bangun_ruang', 'data', 'peluang',
        'pembagian_desimal', 'perkalian_desimal', 'pengurangan_desimal', 'penjumlahan_desimal'
    ];

    const scores = {};
    const skor_per_subtopik = {};
    // ... kode sama hingga loop for (const item of subtopiks)
    for (const item of subtopiks) {
        const { subtopik, jawaban, kunci_jawaban } = item;
        console.log(`Validasi subtopik: ${subtopik}, Jawaban: ${JSON.stringify(jawaban)}, Kunci: ${JSON.stringify(kunci_jawaban)}`);
        if (!subtopik || !all_subtopik.includes(subtopik) || !Array.isArray(jawaban) || !Array.isArray(kunci_jawaban) || jawaban.length !== 5 || kunci_jawaban.length !== 5) {
            return res.status(400).json({ error: `Invalid input untuk subtopik ${subtopik}: jawaban dan kunci_jawaban harus array 5 elemen` });
        }
        // Hapus validasi kosong - anggap "" sebagai salah di hitung skor

        let skor = 0;
        for (let i = 0; i < jawaban.length; i++) {
            const jawab = jawaban[i] || ""; // Pastikan tidak null
            const kunci = kunci_jawaban[i] || "";
            if (String(jawab).trim() === String(kunci).trim()) {  // Trim untuk hilangkan spasi
                skor++;
            }
            console.log(`Soal ${i + 1} ${subtopik}: Jawaban '${jawab}' vs Kunci '${kunci}' = ${String(jawab).trim() === String(kunci).trim() ? 'Benar' : 'Salah'}`);
        }
        scores[subtopik] = skor;
        skor_per_subtopik[subtopik] = skor;
    }
    // ... sisa kode sama

    const full_scores = {};
    all_subtopik.forEach(st => {
        full_scores[st] = scores[st] !== undefined ? scores[st] : 3;
    });

    activeProcesses++;
    console.log(`[LOG] Processing request for ${student_id}, Active processes: ${activeProcesses}`);
    console.log("Full scores:", full_scores);

    // Tambah flag -u untuk unbuffer Python output
    const pythonProcess = spawn('python', ['-u', 'models2/predict.py', JSON.stringify(full_scores)]);
    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log(`[PYTHON STDOUT] ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`[ERROR] Python Error for ${student_id}: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        activeProcesses--;
        console.log(`[LOG] Completed request for ${student_id}, Active processes: ${activeProcesses}, Exit code: ${code}`);
        try {
            if (!output.trim()) {
                throw new Error('Python output is empty');
            }
            const result = JSON.parse(output.trim());
            if (result.error) {
                return res.status(500).json({ error: `ML Prediction failed: ${result.error}` });
            }

            const subtopik_lemah = Object.keys(scores).filter(st => scores[st] <= threshold);

            return res.json({
                student_id,
                skor_per_subtopik,
                max_skor: 5,
                prediksi_kelemahan_utama: result.predicted,
                subtopik_lemah,
                feedback: `Skor: ${JSON.stringify(skor_per_subtopik)}. Kelemahan utama: ${result.predicted}. Sub-topik lemah lainnya: ${subtopik_lemah.join(', ') || 'Tidak ada'}.`
            });
        } catch (e) {
            return res.status(500).json({ error: `Parse error: ${e.message}` });
        }
    });

    pythonProcess.on('error', (err) => {
        activeProcesses--;
        console.error(`[ERROR] Python process error for ${student_id}: ${err.message}`);
        return res.status(500).json({ error: `Python process failed: ${err.message}` });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});