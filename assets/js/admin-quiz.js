
// ================= DATA =================

let quizData =
JSON.parse(localStorage.getItem("quizData")) || [];

/* ================= RENDER ================= */

function renderQuiz(){

    const container =
    document.getElementById("quizList");

    if(!container) return;

    container.innerHTML = "";

    quizData.forEach((item,index)=>{

        container.innerHTML += `

        <div class="quiz-admin-card glass">

            <h3>
                ${index+1}. ${item.soal}
            </h3>

            <p>
                Kategori:
                <b>${item.kategori}</b>
            </p>

            <div class="admin-action">

                <button onclick="editQuiz(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                onclick="hapusQuiz(${index})">

                    Hapus

                </button>

            </div>

        </div>

        `;

    });

}

/* ================= TAMBAH ================= */

function tambahQuiz(){

    const soal =
    document.getElementById("soalQuiz").value;

    const kategori =
    document.getElementById("kategoriQuiz").value;

    if(!soal || !kategori){

        alert("Lengkapi data!");
        return;

    }

    quizData.push({

        soal,
        kategori

    });

    saveQuiz();
    clearForm();

}

/* ================= SAVE ================= */

function saveQuiz(){

    localStorage.setItem(
        "quizData",
        JSON.stringify(quizData)
    );

    renderQuiz();

}

/* ================= HAPUS ================= */

function hapusQuiz(index){

    if(confirm("Hapus soal ini?")){

        quizData.splice(index,1);

        saveQuiz();

    }

}

/* ================= EDIT ================= */

function editQuiz(index){

    const item =
    quizData[index];

    document.getElementById("soalQuiz").value =
    item.soal;

    document.getElementById("kategoriQuiz").value =
    item.kategori;

    quizData.splice(index,1);

    saveQuiz();

}

/* ================= CLEAR ================= */

function clearForm(){

    document.getElementById("soalQuiz").value = "";

}

/* ================= INIT ================= */

renderQuiz();

