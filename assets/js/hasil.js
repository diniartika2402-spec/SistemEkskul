/* =========================================================
   HASIL MINAT SISWA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadHasil();

});

/* =========================================================
   LOAD HASIL
========================================================= */

function loadHasil(){

    const hasilMinat =
    localStorage.getItem("hasilMinat");

    const persentase =
    localStorage.getItem("persentaseMinat") || 0;

    const quizResult =
    JSON.parse(localStorage.getItem("quizResult")) || {};

    const ekskulData =
    JSON.parse(localStorage.getItem("ekskul")) || [];

    /* ================= BELUM ADA HASIL ================= */

    if(!hasilMinat){

        document.getElementById("resultTitle")
        .innerText =
        "Belum Ada Hasil";

        document.getElementById("resultDesc")
        .innerText =
        "Silakan isi kuisioner terlebih dahulu.";

        return;

    }

    /* =====================================================
       TITLE & DESC
    ===================================================== */

    document.getElementById("resultTitle")
    .innerText =
    hasilMinat;

    document.getElementById("resultDesc")
    .innerText =
    getDescription(hasilMinat);

    /* =====================================================
       PERSENTASE
    ===================================================== */

    const persenText =
    document.getElementById("persentaseText");

    if(persenText){

        persenText.innerText =
        persentase + "%";

    }

    /* =====================================================
       TOP RESULT
    ===================================================== */

    const topResult =
    document.getElementById("topResult");

    if(topResult){

        topResult.innerHTML = `

        <div class="top-minat-card">

            <div class="top-icon">
                ${getIcon(hasilMinat)}
            </div>

            <div>

                <h3>${hasilMinat}</h3>

                <p>
                    Minat paling dominan
                </p>

            </div>

        </div>

        `;

    }


    /* =====================================================
       REKOMENDASI EKSKUL
    ===================================================== */

    const rekomendasiContainer =
    document.querySelector(".hasil-ekskul");

    if(!rekomendasiContainer) return;

    rekomendasiContainer.innerHTML = "";

    /* ================= FILTER SESUAI KATEGORI ================= */

    const rekomendasi =
    ekskulData.filter(item => {

        return item.kategori &&
        item.kategori.toLowerCase() ===
        hasilMinat.toLowerCase();

    });

    /* ================= JIKA KOSONG ================= */

    if(rekomendasi.length === 0){

        rekomendasiContainer.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-medal"></i>

            <h3>
                Belum Ada Rekomendasi
            </h3>

            <p>
                Admin belum menambahkan
                ekskul kategori ${hasilMinat}
            </p>

        </div>

        `;

        return;

    }

    /* =====================================================
       CARD EKSKUL
    ===================================================== */

    rekomendasi.forEach(item => {

        rekomendasiContainer.innerHTML += `

        <div class="hasil-ekskul-card">

            <div class="ekskul-img">

                <img
                src="${item.gambar}"
                alt="${item.nama}">

            </div>

            <div class="hasil-ekskul-body">

                <div class="ekskul-top">

                    <span class="ekskul-badge">
                        ${item.kategori}
                    </span>

                </div>

                <h3>${item.nama}</h3>

                <div class="ekskul-info">

                    <small>
                        👨‍🏫 ${item.pembina}
                    </small>

                    <small>
                        📅 ${item.jadwal}
                    </small>

                </div>

            </div>

        </div>

        `;

    });

}

/* =========================================================
   ICON
========================================================= */

function getIcon(minat){

    switch(minat.toLowerCase()){

        case "kreatif":
        return "🎨";

        case "sosial":
        return "🤝";

        case "teknologi":
        return "💻";

        case "kepemimpinan":
        return "👑";

        case "olahraga":
        return "🏆";

        case "akademik":
        return "📚";

        default:
        return "⭐";

    }

}

/* =========================================================
   DESCRIPTION
========================================================= */

function getDescription(minat){

    switch(minat.toLowerCase()){

        case "kreatif":
        return "Kamu memiliki kemampuan berpikir kreatif dan suka menghasilkan ide baru.";

        case "sosial":
        return "Kamu mudah bekerja sama dan memiliki kemampuan komunikasi yang baik.";

        case "teknologi":
        return "Kamu tertarik dengan teknologi, analisis, dan pemecahan masalah.";

        case "kepemimpinan":
        return "Kamu memiliki jiwa pemimpin dan suka mengatur kegiatan.";

        case "olahraga":
        return "Kamu aktif, kompetitif, dan suka aktivitas fisik.";

        case "akademik":
        return "Kamu suka belajar dan memiliki kemampuan analisis yang baik.";

        default:
        return "Hasil minat tidak ditemukan.";

    }

}

