
/* =========================================================
   REGISTER
========================================================= */

function register(){

    const nama =
    document.getElementById("nama").value.trim();

    const kelas =
    document.getElementById("kelas").value.trim();

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    /* ================= VALIDASI ================= */

    if(
        nama === "" ||
        kelas === "" ||
        username === "" ||
        password === ""
    ){

        alert("Lengkapi semua data!");
        return;

    }

    /* =========================================================
       AMBIL DATA USER
    ========================================================= */

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    /* =========================================================
       CEK USERNAME
    ========================================================= */

    const cekUser =
    users.find(user =>

        user.username.toLowerCase() ===
        username.toLowerCase()

    );

    if(cekUser){

        alert("Username sudah digunakan!");
        return;

    }

    /* =========================================================
       DATA USER BARU
    ========================================================= */

    const newUser = {

        id: Date.now(),

        nama: nama,

        kelas: kelas,

        username: username,

        password: password,

        role: "siswa",

        status: "Aktif",

        minat: "Belum Ada",

        isLogin: true

    };

    /* =========================================================
       RESET LOGIN USER LAIN
    ========================================================= */

    users.forEach(user => {

        user.isLogin = false;

    });

    /* =========================================================
       SIMPAN USER
    ========================================================= */

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    /* =========================================================
       SIMPAN LOGIN AKTIF
    ========================================================= */

    localStorage.setItem(
        "login",
        JSON.stringify(newUser)
    );

    /* =========================================================
       SUCCESS
    ========================================================= */

    alert("Registrasi berhasil!");

    /* =========================================================
       REDIRECT
    ========================================================= */

    window.location.href =
    "dashboard.html";

}

