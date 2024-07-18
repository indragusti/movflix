let dataFilm = [
    {
        id: 1,
        poster:
            "https://upload.wikimedia.org/wikipedia/id/thumb/9/91/Inception_poster.jpg/220px-Inception_poster.jpg",
        judul: "Inception",
        kategori: "Aksi, Fiksi Ilmiah, Thriller",
        trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        batasanUmur: 13,
        sinopsis:
            "Seorang pencuri yang memasuki mimpi orang lain untuk mencuri rahasia harus melakukan inception untuk menanamkan ide ke dalam alam bawah sadar target.",
    },
    {
        id: 2,
        poster:
            "https://irs.www.warnerbros.com/keyart-jpeg/movies/media/browser/the_dark_knight_key_art.jpg",
        judul: "The Dark Knight",
        kategori: "Aksi, Kejahatan, Drama",
        trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        batasanUmur: 13,
        sinopsis:
            "Batman menghadapi Joker, seorang dalang kriminal yang ingin menjatuhkan Kota Gotham ke dalam anarki.",
    },
    {
        id: 3,
        poster:
            "https://d5d5yejrba9lo.cloudfront.net/keyart-jpeg/movies/media/browser/interstellar_v_dd_ka_tt_cvrart_2000x3000_300dpi_en_3742435d.jpeg",
        judul: "Interstellar",
        kategori: "Fiksi Ilmiah, Drama, Petualangan",
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        batasanUmur: 13,
        sinopsis:
            "Sebuah tim penjelajah ruang angkasa melakukan perjalanan melalui lubang cacing untuk memastikan kelangsungan hidup umat manusia.",
    },
    {
        id: 4,
        poster:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        judul: "Avengers: Endgame",
        kategori: "Aksi, Petualangan, Drama",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        batasanUmur: 13,
        sinopsis:
            "Para Avengers yang tersisa harus mengumpulkan kekuatan mereka untuk mengalahkan Thanos dan mengembalikan tatanan alam semesta.",
    },
    {
        id: 5,
        poster:
            "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Parasite_%282019_film%29.png/220px-Parasite_%282019_film%29.png",
        judul: "Parasite",
        kategori: "Komedi, Drama, Thriller",
        trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
        batasanUmur: 15,
        sinopsis:
            "Keluarga miskin yang licik secara bertahap menyusup ke dalam kehidupan keluarga kaya dengan konsekuensi yang tak terduga.",
    },
];
let idSekarang = 0
let button = document.getElementById("tombolTambah");
button.addEventListener("click", tambah);
let mencari = document.getElementById("cari");
mencari.addEventListener('keyup', cari)
const userData = JSON.parse(localStorage.getItem('dataFilmMovlix'));

function render(arrayDataFilm) {
    document.getElementById('tabelListFilm').innerHTML = ""
    for (let i = 0; i < arrayDataFilm.length; i++) {
        let perData = arrayDataFilm[i]
        document.getElementById('tabelListFilm').innerHTML += `<tr>
        <td>${perData.judul}</td>
        <td><img src="${perData.poster}" alt=""></td>
        <td>${perData.kategori}</td>
        <td><a href="${perData.trailer}" target="#">Trailer</a></td>
        <td>${perData.batasanUmur}</td>
        <td>${perData.sinopsis}</td>
        <td><button onclick="edit(${perData.id})" id="edit-2"><i data-feather="edit-2"></i></button>
        <button onclick="hapus(${perData.id})" id="trash-2"><i data-feather="trash-2"></i></button></td>
        </tr>`;
    }
    feather.replace()
    localStorage.setItem('dataFilmMovlix', JSON.stringify(dataFilm));
    // if (!arrayDataFilm) {
    //     document.getElementById("filmKosong").style.display = "block"
    // }
}
if (userData === null) {
    render(dataFilm)
} else {
    dataFilm = userData
    render(dataFilm)
}

function clear() {
    document.getElementById("linkGambar").value = ""
    document.getElementById("judulFilm").value = ""
    document.getElementById("kategoriFilm").value = ""
    document.getElementById("trailerFilm").value = ""
    document.getElementById("batasanUmur").value = ""
    document.getElementById("sinopsisFilm").value = ""
}
clear()

function tambah() {
    // masukin film ke arraydatafill
    let id = 1
    for (let i = 0; i < dataFilm.length; i++) {
        if (id === dataFilm[i].id) {
            id++
        } else {
            break
        }
    }
    let obj = {
        id: id,
        poster: document.getElementById("linkGambar").value,
        judul: document.getElementById("judulFilm").value,
        kategori: document.getElementById("kategoriFilm").value,
        trailer: document.getElementById("trailerFilm").value,
        batasanUmur: document.getElementById("batasanUmur").value,
        sinopsis: document.getElementById("sinopsisFilm").value
    }
    if (!obj.judul || !obj.poster || !obj.kategori || !obj.trailer || !obj.batasanUmur || !obj.sinopsis) {
        alert("WAJIB DI ISI SEMUA")
    } else {
        dataFilm.push(obj)
        clear()
    }
    render(dataFilm)
}

function update(idSekarang) {
    // dari value input, menjiplak obj yg sedang diedit sesuai id
    document.getElementById("tombolTambah").style.display = "block"
    document.getElementById("tombolUpdate").style.display = "none"
    document.getElementById("tombolCancel").style.display = "none"
    for (let i = 0; i < dataFilm.length; i++) {
        let iData = dataFilm[i]
        if (iData.id === idSekarang) {
            iData.poster = document.getElementById("linkGambar").value,
                iData.judul = document.getElementById("judulFilm").value,
                iData.kategori = document.getElementById("kategoriFilm").value,
                iData.trailer = document.getElementById("trailerFilm").value,
                iData.batasanUmur = document.getElementById("batasanUmur").value,
                iData.sinopsis = document.getElementById("sinopsisFilm").value
            break
        }
    }
    clear()
    render(dataFilm)
}

function cancel() {
    document.getElementById("tombolTambah").style.display = "block"
    document.getElementById("tombolUpdate").style.display = "none"
    document.getElementById("tombolCancel").style.display = "none"
    clear()
    render(dataFilm)
}

function cari() {
    // filter string di input cari di arrydatafilm 
    let diCari = document.getElementById("cari").value
    let sementara = []

    for (let i = 0; i < dataFilm.length; i++) {
        let obj = dataFilm[i]

        if (obj.judul.toLowerCase().includes(diCari.toLowerCase()) ||
            obj.kategori.toLowerCase().includes(diCari.toLowerCase()) ||
            obj.sinopsis.toLowerCase().includes(diCari.toLowerCase()) ||
            String(obj.batasanUmur).toLowerCase().includes(String(diCari).toLowerCase())) {
            sementara.push(obj)
        }
    }
    render(sementara)
}


function hapus(del) {
    // menghapus obj dimana icon hapus ssuai id

    dataFilm.splice(del - 1, 1)
    if (dataFilm.length === 0) {
        dataFilm = []
    }
    render(dataFilm)
}

function edit(id) {
    // menampilkan obj ke value input 
    document.getElementById("tombolTambah").style.display = "none"
    document.getElementById("tombolUpdate").style.display = "block"
    document.getElementById("tombolCancel").style.display = "block"
    for (let i = 0; i < dataFilm.length; i++) {
        let iData = dataFilm[i]
        if (iData.id === id) {
            document.getElementById("judulFilm").value = iData.judul
            document.getElementById("kategoriFilm").value = iData.kategori
            document.getElementById("trailerFilm").value = iData.trailer
            document.getElementById("batasanUmur").value = iData.batasanUmur
            document.getElementById("sinopsisFilm").value = iData.sinopsis
            document.getElementById("linkGambar").value = iData.poster
            idSekarang = id
            window.scrollTo({ top: 0, behavior: "smooth" });
            break
        }
    }
}
