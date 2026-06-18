/* =========================================================
   LOAD EKSKUL SISWA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadEkskulSiswa();

});

/* =========================================================
   LOAD DATA DARI ADMIN
========================================================= */

function loadEkskulSiswa(){

    const container =
    document.getElementById("ekskulContainer");

    if(!container) return;

    const data =
    JSON.parse(localStorage.getItem("ekskul")) || [];

    /* ================= EMPTY ================= */

    if(data.length === 0){

        container.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-medal"></i>

            <h3>Belum Ada Ekskul</h3>

            <p>
                Admin belum menambahkan
                ekstrakurikuler
            </p>

        </div>

        `;

        return;

    }

    container.innerHTML = "";

    /* ================= CARD ================= */

    data.forEach(item => {

        container.innerHTML += `

        <div class="card glass ekskul-card"

        onclick='openDetail(
        ${JSON.stringify(item)}
        )'>

            <!-- IMAGE -->
            <div class="ekskul-img">

                <img src="${item.gambar}"
                alt="${item.nama}">

            </div>

            <!-- BODY -->
            <div class="ekskul-body simple-card">

                <h3>${item.nama}</h3>

            </div>

        </div>

        `;

    });

}

/* =========================================================
   OPEN DETAIL
========================================================= */

/* =========================================================
   OPEN DETAIL
========================================================= */

function openDetail(item){

    /* ================= MODAL ================= */

    const modal =
    document.getElementById("modal");

    modal.classList.add("show");

    /* ================= SET DATA ================= */

    document.getElementById("modalTitle")
    .innerText = item.nama;

    document.getElementById("modalDesc")
    .innerText = item.deskripsi;

    document.getElementById("modalPembina")
    .innerText = item.pembina;

    document.getElementById("modalJadwal")
    .innerText = item.jadwal;

    document.getElementById("modalLokasi")
    .innerText = item.lokasi;

    const prestasiContainer =
document.getElementById("modalPrestasiContainer");

if(prestasiContainer){

    prestasiContainer.innerHTML = `

    <div class="achievement-item">

        <div class="achievement-icon">
            🏆
        </div>

        <div>
            <h4>${item.prestasi || "-"}</h4>
        </div>

    </div>

    `;

}

    document.getElementById("modalImg")
    .src = item.gambar;

    /* ================= GALERI ================= */

    const galeriContainer =
    document.getElementById("modalGaleri");

    if(galeriContainer){

        galeriContainer.innerHTML = "";

        if(
            item.galeri &&
            item.galeri.length > 0
        ){

            item.galeri.forEach(img => {

                galeriContainer.innerHTML += `

                <img
                src="${img}"
                class="galeri-item">

                `;

            });

        }else{

            galeriContainer.innerHTML = `

            <div class="empty-galeri">

                <i class="fa-regular fa-image"></i>

                <p>
                    Tidak ada dokumentasi
                </p>

            </div>

            `;

        }

    }

    /* ================= BUTTON JOIN ================= */

    const joinBtn =
    document.getElementById("joinEkskulBtn");

    if(joinBtn){

        joinBtn.onclick = function(e){

            e.stopPropagation();

            joinEkskul(item);

        };

    }

}
    
/* ================= CLOSE ================= */

function closeDetail(event){

    if(event){
        event.stopPropagation();
    }

    document
    .getElementById("modal")
    .classList.remove("show");

}

/* ================= CLOSE CLICK OUTSIDE ================= */

window.onclick = function(e){

    const modal =
    document.getElementById("modal");

    if(e.target === modal){

        modal.classList.remove("show");

    }

}


/* =========================================================
   ESC KEY CLOSE
========================================================= */

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeDetail();

    }

});

/* =========================================================
   JOIN EKSKUL
========================================================= */

function joinEkskul(item){

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    const user =
    users.find(u =>
        u.isLogin === true ||
        u.isLogin === "true"
    );

    if(!user){

        alert("Silakan login dulu!");
        return;

    }

    let joined =
    JSON.parse(localStorage.getItem("joinedEkskul")) || [];

    const sudahJoin =
    joined.find(data =>

        data.username === user.username &&
        data.ekskulId === item.id

    );

    if(sudahJoin){

        alert("Kamu sudah join ekskul ini!");
        return;

    }

    joined.push({

        id: Date.now(),

        username: user.username,

        nama: user.nama || user.username,

        kelas: user.kelas || "-",

        ekskulId: item.id,

        namaEkskul: item.nama,

        kategori: item.kategori || "-",

        tanggal:
        new Date().toLocaleDateString("id-ID")

    });

    localStorage.setItem(
        "joinedEkskul",
        JSON.stringify(joined)
    );

    alert("Berhasil join ekskul!");



}