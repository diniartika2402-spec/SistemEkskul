/* =========================================================
   ADMIN EKSKUL SYSTEM
========================================================= */

/* ================= LOAD DATA ================= */

document.addEventListener("DOMContentLoaded", () => {

    loadEkskul();

    setupPreview();

});

/* =========================================================
   IMAGE PREVIEW
========================================================= */

function setupPreview(){

    const gambarInput =
    document.getElementById("gambarEkskul");

    const previewImage =
    document.getElementById("previewImage");

    if(!gambarInput || !previewImage) return;

    gambarInput.addEventListener("change", function(){

        const file = this.files[0];

        if(file){

            const reader = new FileReader();

            reader.onload = function(e){

                previewImage.src = e.target.result;

            }

            reader.readAsDataURL(file);

        }

    });

}

/* =========================================================
   TAMBAH EKSKUL
========================================================= */

function tambahEkskul(){

    const nama =
    document.getElementById("namaEkskul")
    .value.trim();

    const pembina =
    document.getElementById("pembinaEkskul")
    .value.trim();

    const jadwal =
    document.getElementById("jadwalEkskul")
    .value.trim();

    const lokasi =
    document.getElementById("lokasiEkskul")
    .value.trim();

    const kategori =
    document.getElementById("kategoriEkskul")
    .value;

    const deskripsi =
    document.getElementById("deskripsiEkskul")
    .value.trim();

    const prestasi =
    document.getElementById("prestasiEkskul")
    .value.trim();

    const gambar =
    document.getElementById("previewImage")
    .src;

    const galeriInput =
    document.getElementById("galeriEkskul");

    /* ================= VALIDASI ================= */

    if(
        nama === "" ||
        pembina === "" ||
        jadwal === "" ||
        lokasi === "" ||
        kategori === "" ||
        deskripsi === ""
    ){

        alert("Lengkapi semua data!");

        return;

    }

    let galeri = [];

    const files = galeriInput.files;

    /* ================= LOAD GALERI ================= */

    if(files.length > 0){

        let loaded = 0;

        for(let i = 0; i < files.length; i++){

            const reader = new FileReader();

            reader.onload = function(e){

                galeri.push(e.target.result);

                loaded++;

                if(loaded === files.length){

                    simpanEkskul();

                }

            }

            reader.readAsDataURL(files[i]);

        }

    }else{

        simpanEkskul();

    }

    /* ================= SIMPAN ================= */

    function simpanEkskul(){

        const data =
        JSON.parse(
        localStorage.getItem("ekskul")
        ) || [];

        const ekskulBaru = {

            id: Date.now(),

            nama,
            pembina,
            jadwal,
            lokasi,
            kategori,
            deskripsi,

            gambar,

            prestasi,

            kuota: "30 Siswa",

            galeri

        };

        data.push(ekskulBaru);

        localStorage.setItem(
            "ekskul",
            JSON.stringify(data)
        );

        resetForm();

        loadEkskul();

        alert(
        "Ekskul berhasil ditambahkan!"
        );

    }

}

/* =========================================================
   LOAD EKSKUL
========================================================= */

function loadEkskul(){

    const list =
    document.getElementById("listEkskul");

    if(!list) return;

    const data =
    JSON.parse(
    localStorage.getItem("ekskul")
    ) || [];

    /* ================= EMPTY ================= */

    if(data.length === 0){

        list.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-medal"></i>

            <h3>Belum Ada Ekskul</h3>

            <p>
                Tambahkan ekstrakurikuler
                pertama sekarang
            </p>

        </div>

        `;

        return;

    }

    list.innerHTML = "";

    /* ================= CARD ================= */

    data.forEach(item => {

        list.innerHTML += `

        <div class="card glass admin-ekskul-card">

            <img
            src="${item.gambar}"
            alt="${item.nama}">

            <div class="admin-ekskul-body">

                <!-- BADGE -->
                <div class="admin-badge">
                    ${item.kategori}
                </div>

                <!-- TITLE -->
                <h3>${item.nama}</h3>

                <!-- DESC -->
                <p>
                    ${item.deskripsi}
                </p>

                <!-- INFO -->
                <div class="admin-info">

                    <small>
                        👨‍🏫 ${item.pembina}
                    </small>

                    <small>
                        📅 ${item.jadwal}
                    </small>

                    <small>
                        📍 ${item.lokasi}
                    </small>

                    <small>
                        🏆 ${item.prestasi || "-"}
                    </small>

                </div>

                <!-- GALERI -->
                ${
                    item.galeri &&
                    item.galeri.length > 0
                    ?
                    `
                    <div class="mini-galeri">

                        ${item.galeri.map(img => `

                        <img
                        src="${img}"
                        class="mini-galeri-img">

                        `).join("")}

                    </div>
                    `
                    :
                    ""
                }

                <!-- ACTION -->
                <div class="admin-action">

                    <button
                    onclick="editEkskul(${item.id})">

                        <i class="fa-solid fa-pen"></i>
                        Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="hapusEkskul(${item.id})">

                        <i class="fa-solid fa-trash"></i>
                        Hapus

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

/* =========================================================
   HAPUS
========================================================= */

function hapusEkskul(id){

    const konfirmasi =
    confirm("Hapus ekskul ini?");

    if(!konfirmasi) return;

    const data =
    JSON.parse(
    localStorage.getItem("ekskul")
    ) || [];

    const hasil =
    data.filter(item => item.id !== id);

    localStorage.setItem(
        "ekskul",
        JSON.stringify(hasil)
    );

    loadEkskul();

}

/* =========================================================
   EDIT
========================================================= */

function editEkskul(id){

    const data =
    JSON.parse(
    localStorage.getItem("ekskul")
    ) || [];

    const item =
    data.find(x => x.id === id);

    if(!item) return;

    /* ================= SET FORM ================= */

    document.getElementById("namaEkskul").value =
    item.nama;

    document.getElementById("pembinaEkskul").value =
    item.pembina;

    document.getElementById("jadwalEkskul").value =
    item.jadwal;

    document.getElementById("lokasiEkskul").value =
    item.lokasi;

    document.getElementById("kategoriEkskul").value =
    item.kategori;

    document.getElementById("deskripsiEkskul").value =
    item.deskripsi;

    document.getElementById("prestasiEkskul").value =
    item.prestasi || "";

    document.getElementById("previewImage").src =
    item.gambar;

    /* ================= HAPUS DATA LAMA ================= */

    const hasil =
    data.filter(x => x.id !== id);

    localStorage.setItem(
        "ekskul",
        JSON.stringify(hasil)
    );

    loadEkskul();

    /* ================= SCROLL ================= */

    const form =
    document.getElementById("formEkskul");

    if(form){

        form.scrollIntoView({

            behavior:"smooth"

        });

    }

}

/* =========================================================
   SEARCH
========================================================= */

function searchEkskul(){

    const input =
    document.getElementById("searchEkskul")
    .value.toLowerCase();

    const cards =
    document.querySelectorAll(
    ".admin-ekskul-card"
    );

    cards.forEach(card => {

        const title =
        card.querySelector("h3")
        .innerText.toLowerCase();

        if(title.includes(input)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

}

/* =========================================================
   RESET FORM
========================================================= */

function resetForm(){

    document.getElementById("namaEkskul").value = "";

    document.getElementById("pembinaEkskul").value = "";

    document.getElementById("jadwalEkskul").value = "";

    document.getElementById("lokasiEkskul").value = "";

    document.getElementById("kategoriEkskul").value = "";

    document.getElementById("deskripsiEkskul").value = "";

    document.getElementById("prestasiEkskul").value = "";

    document.getElementById("gambarEkskul").value = "";

    document.getElementById("galeriEkskul").value = "";

    document.getElementById("previewImage").src =
    "https://via.placeholder.com/400x220?text=Preview+Gambar";

}