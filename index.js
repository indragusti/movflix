let dataFilm = [
    {
        id: 1,
        poster: "https://upload.wikimedia.org/wikipedia/id/thumb/9/91/Inception_poster.jpg/220px-Inception_poster.jpg",
        judul: "Inception",
        kategori: "Aksi, Fiksi Ilmiah, Thriller",
        trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        batasanUmur: 13,
        sinopsis: "Seorang pencuri yang memasuki mimpi orang lain untuk mencuri rahasia harus melakukan inception untuk menanamkan ide ke dalam alam bawah sadar target.",
    },
    {
        id: 2,
        poster: "https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/the_dark_knight_key_art.jpg",
        judul: "The Dark Knight",
        kategori: "Aksi, Kejahatan, Drama",
        trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        batasanUmur: 13,
        sinopsis: "Batman menghadapi Joker, seorang dalang kriminal yang ingin menjatuhkan Kota Gotham ke dalam anarki.",
    },
    {
        id: 3,
        poster: "https://d5d5yejrba9lo.cloudfront.net/keyart-jpeg/movies/media/browser/interstellar_v_dd_ka_tt_cvrart_2000x3000_300dpi_en_3742435d.jpeg",
        judul: "Interstellar",
        kategori: "Fiksi Ilmiah, Drama, Petualangan",
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        batasanUmur: 13,
        sinopsis: "Sebuah tim penjelajah ruang angkasa melakukan perjalanan melalui lubang cacing untuk memastikan kelangsungan hidup umat manusia.",
    },
    {
        id: 4,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        judul: "Avengers: Endgame",
        kategori: "Aksi, Petualangan, Drama",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        batasanUmur: 13,
        sinopsis: "Para Avengers yang tersisa harus mengumpulkan kekuatan mereka untuk mengalahkan Thanos dan mengembalikan tatanan alam semesta.",
    },
    {
        id: 5,
        poster: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Parasite_%282019_film%29.png/220px-Parasite_%282019_film%29.png",
        judul: "Parasite",
        kategori: "Komedi, Drama, Thriller",
        trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
        batasanUmur: 15,
        sinopsis: "Keluarga miskin yang licik secara bertahap menyusup ke dalam kehidupan keluarga kaya dengan konsekuensi yang tak terduga.",
    },
];

let idSekarang = 0;

let buttonTambah = document.getElementById("tombolTambah");
let buttonUpdate = document.getElementById("tombolUpdate");
let buttonCancel = document.getElementById("tombolCancel");
let mencari = document.getElementById("cari");

let tabelListFilm = document.getElementById("tabelListFilm");
let filmKosong = document.getElementById("filmKosong");

let inputLinkGambar = document.getElementById("linkGambar");
let inputJudulFilm = document.getElementById("judulFilm");
let inputKategoriFilm = document.getElementById("kategoriFilm");
let inputTrailerFilm = document.getElementById("trailerFilm");
let inputBatasanUmur = document.getElementById("batasanUmur");
let inputSinopsisFilm = document.getElementById("sinopsisFilm");

buttonTambah.addEventListener("click", tambah);
mencari.addEventListener("keyup", cari);

const userData = JSON.parse(localStorage.getItem("dataFilmMovlix"));

function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function render(arrayDataFilm) {
    tabelListFilm.innerHTML = "";
    for (let i = 0; i < arrayDataFilm.length; i++) {
        let perData = arrayDataFilm[i];
        const trailerUrl = perData.trailer
        const videoId = getYouTubeVideoId(trailerUrl);
        tabelListFilm.innerHTML += `
        <div class="card">
            <img src="${perData.poster}" alt="${perData.judul} poster" class="card-img">
            <div class="card-content">
                <h3>${perData.judul}</h3>
                <p><strong>Kategori:</strong> ${perData.kategori}</p>
                <p><strong>Batasan Umur:</strong> ${perData.batasanUmur}</p>
                <p>${perData.sinopsis}</p>
                <a href="${perData.trailer}" target="#" class="trailer-link">Trailer</a>
                <div class="video-container">
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="card-actions">
                    <button onclick="edit(${perData.id})" class="edit-button"><i data-feather="edit-2"></i></button>
                    <button onclick="hapus(this)" class="delete-button" data-index="${i}"><i data-feather="trash-2"></i></button>
                </div>
            </div>
        </div>`;
    }
    feather.replace();
    localStorage.setItem("dataFilmMovlix", JSON.stringify(dataFilm));
    if (arrayDataFilm.length === 0) {
        filmKosong.style.display = "block";
    }
}


if (userData === null || userData.length === 0) {
    render(dataFilm);
} else {
    dataFilm = userData;
    render(dataFilm);
}

function clear() {
    inputLinkGambar.value = "";
    inputJudulFilm.value = "";
    inputKategoriFilm.value = "";
    inputTrailerFilm.value = "";
    inputBatasanUmur.value = "";
    inputSinopsisFilm.value = "";
}
clear();

function tambah() {
    let id = 1;
    for (let i = 0; i < dataFilm.length; i++) {
        if (id === dataFilm[i].id) {
            id++;
        } else {
            break;
        }
    }
    let obj = {
        id: id,
        poster: inputLinkGambar.value,
        judul: inputJudulFilm.value,
        kategori: inputKategoriFilm.value,
        trailer: inputTrailerFilm.value,
        batasanUmur: inputBatasanUmur.value,
        sinopsis: inputSinopsisFilm.value,
    };
    if (!obj.judul || !obj.poster || !obj.kategori || !obj.trailer || !obj.batasanUmur || !obj.sinopsis) {
        alert("WAJIB DI ISI SEMUA");
    } else {
        dataFilm.push(obj);
        clear();
    }
    render(dataFilm);
}

function update(idSekarang) {
    buttonTambah.style.display = "block";
    buttonUpdate.style.display = "none";
    buttonCancel.style.display = "none";
    for (let i = 0; i < dataFilm.length; i++) {
        let iData = dataFilm[i];
        if (iData.id === idSekarang) {
            iData.poster = inputLinkGambar.value;
            iData.judul = inputJudulFilm.value;
            iData.kategori = inputKategoriFilm.value;
            iData.trailer = inputTrailerFilm.value;
            iData.batasanUmur = inputBatasanUmur.value;
            iData.sinopsis = inputSinopsisFilm.value;
            break;
        }
    }
    clear();
    render(dataFilm);
}

function cancel() {
    buttonTambah.style.display = "block";
    buttonUpdate.style.display = "none";
    buttonCancel.style.display = "none";
    clear();
    render(dataFilm);
}

function cari() {
    let diCari = mencari.value;
    let sementara = [];
    for (let i = 0; i < dataFilm.length; i++) {
        let obj = dataFilm[i];
        if (
            obj.judul.toLowerCase().includes(diCari.toLowerCase()) ||
            obj.kategori.toLowerCase().includes(diCari.toLowerCase()) ||
            obj.sinopsis.toLowerCase().includes(diCari.toLowerCase()) ||
            String(obj.batasanUmur).toLowerCase().includes(String(diCari).toLowerCase())
        ) {
            sementara.push(obj);
        }
    }
    if (sementara.length === 0) {
        tabelListFilm.innerHTML = `<div><h1>Hasil Pencarian Kosong</h1></div>`
    } else {
        render(sementara);
    }
}

function showConfirmationPopup(callback) {
    const popup = document.getElementById("confirmationPopup");
    popup.style.display = "flex";

    const confirmButton = document.getElementById("confirmDelete");
    confirmButton.onclick = function () {
        callback(true);
        popup.style.display = "none";
    };

    const cancelButton = document.getElementById("cancelDelete");
    cancelButton.onclick = function () {
        callback(false);
        popup.style.display = "none";
    };
}

function hapus(baris) {
    const index = baris.getAttribute("data-index");
    showConfirmationPopup(function (confirmed) {
        if (confirmed) {
            dataFilm.splice(index, 1);
            if (dataFilm.length === 0) {
                dataFilm = [];
            }
            render(dataFilm);
        }
    });
}


function edit(id) {
    buttonTambah.style.display = "none";
    buttonUpdate.style.display = "block";
    buttonCancel.style.display = "block";
    for (let i = 0; i < dataFilm.length; i++) {
        let iData = dataFilm[i];
        if (iData.id === id) {
            inputJudulFilm.value = iData.judul;
            inputKategoriFilm.value = iData.kategori;
            inputTrailerFilm.value = iData.trailer;
            inputBatasanUmur.value = iData.batasanUmur;
            inputSinopsisFilm.value = iData.sinopsis;
            inputLinkGambar.value = iData.poster;
            idSekarang = id;
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
        }
    }
}
