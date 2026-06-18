/* =========================================================
   ADMIN SISWA SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadSiswa();

});

/* =========================================================
   LOAD SISWA
========================================================= */

function loadSiswa(){

    const table =
    document.getElementById("siswaTable");

    if(!table) return;

    /* ================= AMBIL DATA ================= */

    let siswa =
    JSON.parse(localStorage.getItem("users")) || [];

    /* ================= DUMMY DATA ================= */

    if(siswa.length === 0){

        siswa = [

            {
                id:1,
                nama:"Dini Artika",
                kelas:"VIII A",
                minat:"Kreatif",
                status:"Aktif"
            },

            {
                id:2,
                nama:"Raka Saputra",
                kelas:"VIII B",
                minat:"Teknologi",
                status:"Aktif"
            },

            {
                id:3,
                nama:"Nabila Putri",
                kelas:"IX A",
                minat:"Sosial",
                status:"Belum Quiz"
            }

        ];

    }

    /* ================= RESET ================= */

    table.innerHTML = "";

    /* ================= LOOP ================= */

    siswa.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>
                ${item.nama}
            </td>

            <td>
                ${item.kelas}
            </td>

            <td>

                <span class="minat-badge">

                    ${item.minat}

                </span>

            </td>

            <td>

                <span class="
                status
                ${item.status === 'Aktif'
                ? 'active-status'
                : 'pending-status'}">

                    ${item.status}

                </span>

            </td>

            <td>

                <div class="table-action">

                    <button
                    class="detail-btn"
                    onclick="detailSiswa(${item.id})"

                        <i class="fa-solid fa-eye"></i>

                    </button>

                    <button
                    class="delete-btn-table"
                    onclick="hapusSiswa(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

/* =========================================================
   SEARCH SISWA
========================================================= */

function searchSiswa(){

    const input =
    document.getElementById("searchSiswa")
    .value.toLowerCase();

    const rows =
    document.querySelectorAll("#siswaTable tr");

    rows.forEach(row => {

        const text =
        row.innerText.toLowerCase();

        if(text.includes(input)){

            row.style.display = "";

        }else{

            row.style.display = "none";

        }

    });

}

/* =========================================================
   DETAIL SISWA
========================================================= */

function detailSiswa(id){

    let siswa =
    JSON.parse(localStorage.getItem("users")) || [];

    /* ================= DUMMY ================= */

    if(siswa.length === 0){

        siswa = [

            {
                id:1,
                nama:"Dini Artika",
                kelas:"VIII A",
                minat:"Kreatif",
                status:"Aktif"
            },

            {
                id:2,
                nama:"Raka Saputra",
                kelas:"VIII B",
                minat:"Teknologi",
                status:"Aktif"
            }

        ];

    }

    const item =
    siswa.find(x => x.id === id);

    if(!item) return;

    document.getElementById("detailNama")
    .innerText = item.nama;

    document.getElementById("detailKelas")
    .innerText = item.kelas;

    document.getElementById("detailMinat")
    .innerText = item.minat;

    document.getElementById("detailStatus")
    .innerText = item.status;

    document.getElementById("siswaModal")
    .classList.add("show");

}
/* =========================================================
   HAPUS SISWA
========================================================= */

function hapusSiswa(id){

    const konfirmasi =
    confirm("Hapus siswa ini?");

    if(!konfirmasi) return;

    let siswa =
    JSON.parse(localStorage.getItem("users")) || [];

    siswa =
    siswa.filter(item => item.id !== id);

    localStorage.setItem(
        "users",
        JSON.stringify(siswa)
    );

    loadSiswa();

}

/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModalSiswa(){

    document.getElementById("siswaModal")
    .classList.remove("show");

}