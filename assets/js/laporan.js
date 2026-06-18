
document.addEventListener("DOMContentLoaded", () => {

    loadLaporan();

});

/* =========================================================
   LOAD LAPORAN
========================================================= */

function loadLaporan(){

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    const ekskul =
    JSON.parse(localStorage.getItem("ekskul")) || [];

    const joinData =
    JSON.parse(localStorage.getItem("joinedEkskul")) || [];

    const table =
    document.getElementById("laporanTable");

    table.innerHTML = "";

    let siswaAktif = 0;

    let sudahQuiz = 0;

    /* =========================================================
       LOOP USER
    ========================================================= */

    users.forEach(user => {

        if(user.status === "Aktif"){

            siswaAktif++;

        }

        if(
            user.minat &&
            user.minat !== "Belum Ada"
        ){

            sudahQuiz++;

        }

        /* ================= JOIN EKSKUL ================= */

        const joinEkskul =
        joinData.filter(data =>

            data.username === user.username

        );

        let ekskulDiikuti = "-";

        if(joinEkskul.length > 0){

            ekskulDiikuti =
            joinEkskul
            .map(item => item.namaEkskul)
            .join(", ");

        }

        table.innerHTML += `

        <tr>

            <td>${user.nama}</td>

            <td>${user.kelas}</td>

            <td>${user.username}</td>

            <td>

                <span class="status active-status">
                    ${user.status || "Aktif"}
                </span>

            </td>

            <td>${user.minat || "-"}</td>

            <td>${ekskulDiikuti}</td>

        </tr>

        `;

    });

    /* =========================================================
       UPDATE STATS
    ========================================================= */

    document.getElementById("totalSiswa")
    .innerText = users.length;

    document.getElementById("totalEkskul")
    .innerText = ekskul.length;

    document.getElementById("siswaAktif")
    .innerText = siswaAktif;

    document.getElementById("totalMinat")
    .innerText = sudahQuiz;

}

/* =========================================================
   EXPORT PDF
========================================================= */

function downloadPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF(

        "l",
        "mm",
        "a4"

    );

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    const joinData =
    JSON.parse(localStorage.getItem("joinedEkskul")) || [];

    /* =========================================================
       HEADER
    ========================================================= */

    doc.setFillColor(15,23,42);

    doc.rect(
        0,
        0,
        297,
        35,
        "F"
    );

    doc.setTextColor(255,255,255);

    doc.setFontSize(22);

    doc.text(
        "LAPORAN DATA SISWA",
        14,
        18
    );

    doc.setFontSize(11);

    doc.text(
        "Sistem Pemetaan Minat & Ekstrakurikuler",
        14,
        27
    );

    /* =========================================================
       INFO
    ========================================================= */

    doc.setTextColor(40);

    doc.setFontSize(11);

    const tanggal =
    new Date().toLocaleDateString("id-ID");

    doc.text(
        `Tanggal Cetak : ${tanggal}`,
        14,
        45
    );

    doc.text(
        `Total Siswa : ${users.length}`,
        14,
        52
    );

    /* =========================================================
       TABLE HEADER
    ========================================================= */

    let startY = 65;

    doc.setFillColor(59,130,246);

    doc.roundedRect(
        14,
        startY,
        265,
        10,
        2,
        2,
        "F"
    );

    doc.setTextColor(255);

    doc.setFontSize(10);

    doc.text("No",18,startY+7);

    doc.text("Nama",30,startY+7);

    doc.text("Kelas",75,startY+7);

    doc.text("Username",105,startY+7);

    doc.text("Minat",150,startY+7);

    doc.text("Ekskul",210,startY+7);

    /* =========================================================
       TABLE BODY
    ========================================================= */

    let y = startY + 14;

    users.forEach((user,index) => {

        /* ================= AUTO PAGE ================= */

        if(y > 180){

            doc.addPage();

            y = 20;

        }

        /* ================= JOIN EKSKUL ================= */

        const joinEkskul =
        joinData.filter(data =>

            data.username === user.username

        );

        let ekskulDiikuti = "-";

        if(joinEkskul.length > 0){

            ekskulDiikuti =
            joinEkskul
            .map(item => item.namaEkskul)
            .join(", ");

        }

        /* ================= ROW BG ================= */

        if(index % 2 === 0){

            doc.setFillColor(245,247,250);

            doc.rect(
                14,
                y - 5,
                265,
                10,
                "F"
            );

        }

        doc.setTextColor(40);

        doc.setFontSize(9);

        doc.text(
            String(index + 1),
            18,
            y
        );

        doc.text(
            user.nama || "-",
            30,
            y
        );

        doc.text(
            user.kelas || "-",
            75,
            y
        );

        doc.text(
            user.username || "-",
            105,
            y
        );

        doc.text(
            user.minat || "-",
            150,
            y
        );

        doc.text(
            ekskulDiikuti || "-",
            210,
            y
        );

        y += 10;

    });

    /* =========================================================
       FOOTER
    ========================================================= */

    doc.setDrawColor(220);

    doc.line(
        14,
        195,
        279,
        195
    );

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
        "Generated by EduSmart System",
        14,
        202
    );

    /* =========================================================
       SAVE
    ========================================================= */

    doc.save(
        "laporan-premium.pdf"
    );

}

/* =========================================================
   EXPORT EXCEL
========================================================= */

function downloadExcel(){

    const users =
    JSON.parse(localStorage.getItem("users")) || [];

    const joinData =
    JSON.parse(localStorage.getItem("joinedEkskul")) || [];

    if(users.length === 0){

        alert("Tidak ada data siswa");
        return;

    }

    const dataExport = users.map(user => {

        const joinEkskul =
        joinData.filter(data =>
            data.username === user.username
        );

        let ekskulDiikuti = "-";

        if(joinEkskul.length > 0){

            ekskulDiikuti =
            joinEkskul
            .map(item => item.namaEkskul)
            .join(", ");

        }

        return {

            Nama: user.nama || "-",
            Kelas: user.kelas || "-",
            Username: user.username || "-",
            Status: user.status || "Aktif",
            Minat: user.minat || "-",
            Ekskul: ekskulDiikuti

        };

    });

    const worksheet =
    XLSX.utils.json_to_sheet(dataExport);

    const workbook =
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data Siswa"
    );

    const tanggal =
new Date().toLocaleDateString("id-ID")
.replaceAll("/", "-");

XLSX.writeFile(
    workbook,
    `Laporan_Siswa_${tanggal}.xlsx`
);

}