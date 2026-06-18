
function login() {

    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    let role =
    document.getElementById("role").value;

    if(username === "" || password === ""){

        alert("Username dan password wajib diisi!");
        return;

    }

    /* ================= AMBIL DATA USER ================= */

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    /* ================= CARI USER ================= */

    let user =
    users.find(u =>

        u.username === username &&
        u.password === password

    );

    /* ================= LOGIN ADMIN ================= */

    if(role === "admin"){

        if(
            username === "admin" &&
            password === "admin123"
        ){

            localStorage.setItem(
                "login",
                JSON.stringify({
                    username: "admin",
                    role: "admin"
                })
            );

            document.getElementById("loading")
            .style.display = "block";

            setTimeout(() => {

                window.location.href =
                "AdminDashboard/dashboard-admin.html";

            }, 800);

            return;

        }else{

            alert("Username / Password admin salah!");
            return;

        }

    }

    /* ================= LOGIN SISWA ================= */

    if(!user){

        alert("Akun tidak ditemukan!");
        return;

    }

    /* ================= SET LOGIN ================= */

    users.forEach(u => {

        u.isLogin = false;

    });

    user.isLogin = true;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "login",
        JSON.stringify(user)
    );

    document.getElementById("loading")
    .style.display = "block";

    setTimeout(() => {

        window.location.href =
        "pages/dashboard.html";

    }, 800);

}


function logout(){

    const konfirmasi =
    confirm("Yakin ingin logout?");

    if(!konfirmasi) return;

    /* ================= HAPUS LOGIN ================= */

    localStorage.removeItem("login");

    /* ================= REDIRECT ================= */

    window.location.href =
    "../index.html";

}


