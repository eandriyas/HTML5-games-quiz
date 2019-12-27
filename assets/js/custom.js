var contentPlay = document.getElementsByClassName('content-play');


var btnPoinStatus = document.getElementsByClassName("poin-status");

if (btnPoinStatus[0]) {
    btnPoinStatus[0].addEventListener("click", function () {
        alert('poin status')
    })
}

var btnPlay = document.getElementsByClassName('play-button');

if (btnPlay[0]) {
    btnPlay[0].addEventListener("click", function () {
        // window.location.href = "play.html";
        setPage('content-play');
    })
}


var btnBenar = document.getElementsByClassName('benar');
if (btnBenar[0]) {
    btnBenar[0].addEventListener("click", function () {
        setPage('content-play-after')
    })
}

var btnSalah = document.getElementsByClassName('salah');
if (btnSalah[0]) {
    btnSalah[0].addEventListener("click", function () {
        setPage('content-play-after-wrong')
    })
}

var btnBack = document.getElementsByClassName('btn-back');
if (btnBack[0]) {
    if (btnBack[0]['dataset']['back'] == 'home') {
        btnBack[0].addEventListener("click", function () {
            setPage('content-home')
        })
    }
}

var btnSetting = document.getElementsByClassName('btn-setting')
if (btnSetting[0]) {
    btnSetting[0].addEventListener("click", function () {
        setPage('content-level')
    })
}
var btnTentang = document.getElementsByClassName('btn-tentang')
if (btnTentang[0]) {
    btnTentang[0].addEventListener("click", function () {
        setPage('content-tentang')
    })
}
setPage('content-start')
setLevel('Level 2')
setPoin(100)

var btnStart = document.getElementsByClassName('content-start');
if (btnStart[0]) {
    btnStart[0].addEventListener("click", function () {
        setPage('content-home')
    })
}

/* Input Nama */
var btnInputNama = document.getElementsByClassName('btn-input-nama');
if (btnInputNama[0]) {
    btnInputNama[0].addEventListener("click", function () {
        var inputNama = document.getElementsByClassName("box-input");
        if (inputNama[0].value != '') {
            var nama = inputNama[0].value;
            ipc.send("tambahUser", {
                nama: nama
            })
        }
    })
}

var btnPlayNext = document.getElementsByClassName('btn-play-next');
if (btnPlayNext[0]) {
    btnPlayNext[0].addEventListener("click", function () {
        setPage('content-play')
    })
}

var btnPlayNextWrong = document.getElementsByClassName('btn-play-next-wrong');
if (btnPlayNextWrong[0]) {
    btnPlayNextWrong[0].addEventListener("click", function () {
        setPage('content-play')
    })
}

var btnTentangKeluar = document.getElementsByClassName('btn-tentang-keluar');
if (btnTentangKeluar[0]) {
    btnTentangKeluar[0].addEventListener("click", function () {
        setPage('content-home')
    })
}

var btnLevelBack = document.getElementsByClassName('btn-level-back');
if (btnLevelBack[0]) {
    btnLevelBack[0].addEventListener("click", function () {
        setPage('content-home')
    })
}

function setPage(contentSet) {
    var bodyPage = document.getElementById("Page");
    var pageList = ['content-start', 'content-home', 'content-play', 'content-box-nama', 'content-play-after', 'content-play-after-wrong', 'content-tentang', 'content-level'];

    //Set Page
    bodyPage['dataset']['page'] = contentSet;

    /* 
    Check list page lalu aktifkan page
    */
    for (i = 0; i < pageList.length; i++) {
        var content = document.getElementsByClassName(pageList[i])[0];
        if (contentSet == pageList[i]) {
            content.classList.remove('hide');
        } else {
            content.classList.add('hide');
        }
    }
    var groupStatus = document.getElementsByClassName('group-status');

    //Check status
    if (groupStatus) {
        if (contentSet == 'content-start' ||
            contentSet == 'content-box-nama' ||
            contentSet == 'content-play-after' ||
            contentSet == 'content-play-after-wrong' ||
            contentSet == 'content-level') {
            groupStatus[0].classList.add('hide');
        } else {
            groupStatus[0].classList.remove('hide');
        }
    }
}

function setLevel(level) {
    //Tambahkan di database

    //ganti text di html
    var textLevel = document.getElementsByClassName("text-level-status");
    textLevel[0].textContent = level;
}

function setPoin(poin) {
    //Tambahkan di database

    //ganti text di html
    var poinLevel = document.getElementsByClassName("text-poin-status");
    var jumlahPoin = parseInt(poinLevel[0].textContent, 10) + poin;

    poinLevel[0].textContent = jumlahPoin;
}