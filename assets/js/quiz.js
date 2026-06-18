/* =========================================================
   QUIZ MINAT SISWA
========================================================= */

/* ================= PERTANYAAN ================= */

const questions = [

/* ================= KREATIF ================= */

{
    text: "Saya senang membuat karya atau ide baru.",
    category: "kreatif"
},

{
    text: "Saya suka menggambar, desain, atau dekorasi.",
    category: "kreatif"
},

{
    text: "Saya tertarik membuat video, poster, atau konten kreatif.",
    category: "kreatif"
},

/* ================= SOSIAL ================= */

{
    text: "Saya suka bekerja sama dalam kelompok.",
    category: "sosial"
},

{
    text: "Saya mudah bergaul dengan orang lain.",
    category: "sosial"
},

{
    text: "Saya senang membantu teman yang kesulitan.",
    category: "sosial"
},

/* ================= TEKNOLOGI ================= */

{
    text: "Saya tertarik mempelajari teknologi baru.",
    category: "teknologi"
},

{
    text: "Saya penasaran bagaimana aplikasi bekerja.",
    category: "teknologi"
},

{
    text: "Saya suka mencari solusi dari sebuah masalah.",
    category: "teknologi"
},

/* ================= KEPEMIMPINAN ================= */

{
    text: "Saya percaya diri memimpin sebuah kelompok.",
    category: "kepemimpinan"
},

{
    text: "Saya senang mengatur kegiatan atau acara.",
    category: "kepemimpinan"
},

{
    text: "Saya nyaman mengambil keputusan saat bekerja tim.",
    category: "kepemimpinan"
},

/* ================= OLAHRAGA ================= */

{
    text: "Saya suka kegiatan olahraga atau aktivitas fisik.",
    category: "olahraga"
},

{
    text: "Saya senang mengikuti pertandingan atau kompetisi olahraga.",
    category: "olahraga"
},

{
    text: "Saya menikmati aktivitas luar ruangan dan latihan fisik.",
    category: "olahraga"
},

/* ================= AKADEMIK ================= */

{
    text: "Saya senang belajar dan mencari pengetahuan baru.",
    category: "akademik"
},

{
    text: "Saya menikmati pelajaran yang membutuhkan analisis.",
    category: "akademik"
},

{
    text: "Saya suka membaca atau mempelajari materi pelajaran.",
    category: "akademik"
}

];

/* =========================================================
   DATA QUIZ
========================================================= */

let currentQuestion = 0;

let result = {

    kreatif: 0,
    sosial: 0,
    teknologi: 0,
    kepemimpinan: 0,
    olahraga: 0,
    akademik: 0

};

/* =========================================================
   START QUIZ
========================================================= */

function startQuiz(){

    document.getElementById("startScreen").style.display =
    "none";

    document.getElementById("quizScreen").style.display =
    "block";

    showQuestion();

}

/* =========================================================
   TAMPILKAN PERTANYAAN
========================================================= */

function showQuestion(){

    const q =
    questions[currentQuestion];

    document.getElementById("questionText").innerText =
    q.text;

    document.getElementById("questionNumber").innerText =
    `${currentQuestion + 1} / ${questions.length}`;

    /* ================= PROGRESS ================= */

    const progress =
    ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressFill").style.width =
    progress + "%";

}

/* =========================================================
   JAWAB PERTANYAAN
========================================================= */

function answer(point){

    const category =
    questions[currentQuestion].category;

    /* ================= TAMBAH SCORE ================= */

    result[category] += point;

    currentQuestion++;

    /* ================= NEXT ================= */

    if(currentQuestion < questions.length){

        showQuestion();

    }else{

        finishQuiz();

    }

}

/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz(){

    /* ================= SIMPAN DETAIL SCORE ================= */

    localStorage.setItem(
    "quizResult",
    JSON.stringify(result)
);

localStorage.setItem(
    "detailMinat",
    JSON.stringify(result)
);

    /* ================= CARI HASIL TERTINGGI ================= */

    let hasilAkhir = "";

    let highestScore = 0;

    for(let category in result){

        if(result[category] > highestScore){

            highestScore =
            result[category];

            hasilAkhir =
            category;

        }

    }

    /* ================= FORMAT NAMA ================= */

    hasilAkhir =
    capitalize(hasilAkhir);

    /* ================= SIMPAN HASIL ================= */

localStorage.setItem(
    "hasilMinat",
    hasilAkhir
);

/* ================= HITUNG PERSEN ================= */

const maxPerKategori = 15;

const persen =
Math.round(
    (highestScore / maxPerKategori) * 100
);

localStorage.setItem(
    "persentaseMinat",
    persen
);

/* ================= UPDATE DATA SISWA ================= */

const loginUser =
JSON.parse(localStorage.getItem("login"));

const users =
JSON.parse(localStorage.getItem("users")) || [];



if(loginUser){

    const index =
    users.findIndex(
        u => u.username === loginUser.username
    );

    if(index !== -1){

        users[index].minat =
        hasilAkhir;

        users[index].persentaseMinat =
        persen;

        users[index].detailMinat =
        result;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

}

/* ================= REDIRECT ================= */

window.location.href =
"hasil.html";

}

/* =========================================================
   CAPITALIZE
========================================================= */

function capitalize(text){

    return text.charAt(0).toUpperCase() +
    text.slice(1);

}