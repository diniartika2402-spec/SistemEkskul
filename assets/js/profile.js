
// ================= LOAD FOTO =================

const profilePreview =
document.getElementById("profilePreview");

const uploadPhoto =
document.getElementById("uploadPhoto");

/* AMBIL FOTO DARI LOCAL STORAGE */

const savedPhoto =
localStorage.getItem("profilePhoto");

if(savedPhoto){
    profilePreview.src = savedPhoto;
}

/* ================= UPLOAD FOTO ================= */

uploadPhoto.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            profilePreview.src =
            e.target.result;

            localStorage.setItem(
                "profilePhoto",
                e.target.result
            );

        };

        reader.readAsDataURL(file);

    }

});

/* ================= LOAD USER ================= */

const profileName =
document.getElementById("profileName");

const username =
localStorage.getItem("username");

if(username){
    profileName.innerText = username;
}

document.addEventListener("DOMContentLoaded", () => {

    loadJoinedEkskul();

});

function loadJoinedEkskul(){

    const container =
    document.getElementById("joinedEkskulList");

    if(!container) return;

    const user =
    JSON.parse(localStorage.getItem("userLogin"));

    const data =
    JSON.parse(localStorage.getItem("joinedEkskul")) || [];

    const filtered =
    data.filter(item =>

        item.username === user.username

    );

    if(filtered.length === 0){

        container.innerHTML =
        `<p>Belum join ekskul</p>`;

        return;

    }

    container.innerHTML = "";

    filtered.forEach(item => {

        container.innerHTML += `

        <div class="joined-item">
            ${item.namaEkskul}
        </div>

        `;

    });

}