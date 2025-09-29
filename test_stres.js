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
    {
        subtopik: "kpk",
        jawaban: [
            player.GetVar("TextEntry31"),
            player.GetVar("TextEntry34"),
            player.GetVar("TextEntry35"),
            player.GetVar("TextEntry36"),
            player.GetVar("TextEntry37")
        ],
        kunci_jawaban: ["12", "12", "30", "24", "24"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "fpb",
        jawaban: [
            player.GetVar("TextEntry38"),
            player.GetVar("TextEntry39"),
            player.GetVar("TextEntry40"),
            player.GetVar("TextEntry41"),
            player.GetVar("TextEntry42")
        ],
        kunci_jawaban: ["5", "8", "9", "12", "10"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "penjumlahan_pecahan",
        jawaban: [
            player.GetVar("TextEntry44"),
            player.GetVar("TextEntry45"),
            player.GetVar("TextEntry46"),
            player.GetVar("TextEntry47"),
            player.GetVar("TextEntry49")
        ],
        kunci_jawaban: ["3/4", "13/15", "1/2", "13/24", "13/12"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pengurangan_pecahan",
        jawaban: [
            player.GetVar("TextEntry50"),
            player.GetVar("TextEntry51"),
            player.GetVar("TextEntry52"),
            player.GetVar("TextEntry53"),
            player.GetVar("TextEntry54")
        ],
        kunci_jawaban: ["1/4", "1/6", "11/8", "1/2", "7/12"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pembagian_pecahan",
        jawaban: [
            player.GetVar("TextEntry60"),
            player.GetVar("TextEntry61"),
            player.GetVar("TextEntry62"),
            player.GetVar("TextEntry63"),
            player.GetVar("TextEntry64")
        ],
        kunci_jawaban: ["2", "3/2", "4/3", "8", "6"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "mengurutkan",
        jawaban: [
            player.GetVar("TextEntry66"),
            player.GetVar("TextEntry67"),
            player.GetVar("TextEntry68"),
            player.GetVar("TextEntry69"),
            player.GetVar("TextEntry70")
        ],
        kunci_jawaban: ["a", "a", "b", "a", "a"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pembagian_desimal",
        jawaban: [
            player.GetVar("TextEntry108"),
            player.GetVar("TextEntry110"),
            player.GetVar("TextEntry111"),
            player.GetVar("TextEntry114"),
            player.GetVar("TextEntry115")
        ],
        kunci_jawaban: ["0.3", "0.4", "0.009", "0.3", "0.6"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "perkalian_desimal",
        jawaban: [
            player.GetVar("TextEntry107"),
            player.GetVar("TextEntry98"),
            player.GetVar("TextEntry113"),
            player.GetVar("TextEntry102"),
            player.GetVar("TextEntry105")
        ],
        kunci_jawaban: ["0.2", "2.4", "0.009", "3", "3"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pengurangan_desimal",
        jawaban: [
            player.GetVar("TextEntry106"),
            player.GetVar("TextEntry97"),
            player.GetVar("TextEntry112"),
            player.GetVar("TextEntry101"),
            player.GetVar("TextEntry104")
        ],
        kunci_jawaban: ["0.5", "1", "0.7", "0.5", "1.8"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "penjumlahan_desimal",
        jawaban: [
            player.GetVar("TextEntry109"),
            player.GetVar("TextEntry96"),
            player.GetVar("TextEntry99"),
            player.GetVar("TextEntry100"),
            player.GetVar("TextEntry103")
        ],
        kunci_jawaban: ["0.5", "0.2", "3.5", "1", "1.8"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "pola_bilangan",
        jawaban: [
            player.GetVar("TextEntry121"),
            player.GetVar("TextEntry116"),
            player.GetVar("TextEntry117"),
            player.GetVar("TextEntry119"),
            player.GetVar("TextEntry118")
        ],
        kunci_jawaban: ["10", "16", "34", "22", "9"]  // Hard-code kunci jawaban
    },{
        subtopik: "operasi_aljabar",
        jawaban: [
            player.GetVar("TextEntry120"),
            player.GetVar("TextEntry123"),
            player.GetVar("TextEntry122"),
            player.GetVar("TextEntry124"),
            player.GetVar("TextEntry125")
        ],
        kunci_jawaban: ["x+5", "5", "9", "-1", "30"]  // Hard-code kunci jawaban
    },
    {
        subtopik: "panjang",
        jawaban: [
            player.GetVar("TextEntry126"),
            player.GetVar("TextEntry127"),
            player.GetVar("TextEntry128"),
            player.GetVar("TextEntry129"),
            player.GetVar("TextEntry130")
        ],
        kunci_jawaban: ["3.5", "125", "350", "1.2", "500"]  // Hard-code kunci jawaban
    },{
        subtopik: "berat",
        jawaban: [
            player.GetVar("TextEntry126"),
            player.GetVar("TextEntry127"),
            player.GetVar("TextEntry128"),
            player.GetVar("TextEntry129"),
            player.GetVar("TextEntry130")
        ],
        kunci_jawaban: ["3.5", "125", "350", "1.2", "500"]  // Hard-code kunci jawaban
    },

];
var student_id = player.GetVar("namalengkap") || "ANONIM";

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
        // player.ShowLayer("FeedbackLayer");
        console.log('Hasil:', data);
        alert(data.prediksi_kelemahan);
    })
    .catch(error => {
        console.error('Error:', error);
        player.SetVar("Feedback", "Error: Tidak bisa terhubung ke server!");
        player.ShowLayer("ErrorLayer");
    });