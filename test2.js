var player = GetPlayer();
// Ambil variabel dari Storyline
var subtopiks = [
    {
        subtopik: "penjumlahan",  // "penjumlahan"
        jawaban: [
            player.GetVar("TextEntry3"),
            player.GetVar("TextEntry4"),
            player.GetVar("TextEntry5"),
            player.GetVar("TextEntry6"),
            player.GetVar("TextEntry7")
        ],
        kunci_jawaban: ["42", "78", "63", "82", "62"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pengurangan",  // "pengurangan"
        jawaban: [
            player.GetVar("TextEntry8"),
            player.GetVar("TextEntry9"),
            player.GetVar("TextEntry10"),
            player.GetVar("TextEntry11"),
            player.GetVar("TextEntry12")
        ],
        kunci_jawaban: ["28", "9", "31", "17", "23"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "perkalian", // "perkalian"
        jawaban: [
            player.GetVar("TextEntry13"),
            player.GetVar("TextEntry14"),
            player.GetVar("TextEntry15"),
            player.GetVar("TextEntry16"),
            player.GetVar("TextEntry17")
        ],
        kunci_jawaban: ["72", "96", "91", "176", "54"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pembagian", // "pembagian"
        jawaban: [
            player.GetVar("TextEntry22"),
            player.GetVar("TextEntry19"),
            player.GetVar("TextEntry23"),
            player.GetVar("TextEntry24"),
            player.GetVar("TextEntry25")
        ],
        kunci_jawaban: ["7", "9", "4", "13", "9"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "operasi_campuran", // "operasi_campuran"
        jawaban: [
            player.GetVar("TextEntry26"),
            player.GetVar("TextEntry27"),
            player.GetVar("TextEntry28"),
            player.GetVar("TextEntry29"),
            player.GetVar("TextEntry30")
        ],
        kunci_jawaban: ["-5", "21", "8", "15", "16"]  // Hard-code kunci jawaban
    },
    
];
var student_id = player.GetVar("StudentID") || "ANONIM";

// Kirim ke back-end
fetch('http://localhost:3000/submit-answers', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        student_id: student_id,
        subtopiks: subtopiks
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        player.SetVar("SkorPerSubTopik", JSON.stringify(data.skor_per_subtopik));
        player.SetVar("PrediksiKelemahan", data.prediksi_kelemahan);
        player.SetVar("Feedback", data.feedback);
        console.log('Hasil:', data);
        alert(data.prediksi_kelemahan);
    })
    .catch(error => {
        console.error('Error:', error);
        player.SetVar("Feedback", "Error: Tidak bisa terhubung ke server!");
    });