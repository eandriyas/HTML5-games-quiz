var contentPlay = document.getElementsByClassName('content-play');

var btnLevelStatus = document.getElementsByClassName("level-status");
if (btnLevelStatus[0]) {
    btnLevelStatus[0].addEventListener("click", function () {
        alert('level status')
    })
}
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
        alert('benar')
    })
}

var btnSalah = document.getElementsByClassName('salah');
if (btnSalah[0]) {
    btnSalah[0].addEventListener("click", function () {
        alert('salah')
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
        alert('setting');
    })
}
var btnTentang = document.getElementsByClassName('btn-tentang')
if (btnTentang[0]) {
    btnTentang[0].addEventListener("click", function () {
        alert('Tentang');
    })
}
var btnKeluar = document.getElementsByClassName('btn-keluar');
if (btnKeluar[0]) {
    btnKeluar[0].addEventListener("click", function () {
        confirm('Keluar');
    })
}

setPage('content-home')
setLevel('Level 2')
setPoin(100)

var btnStart = document.getElementsByClassName('content-start');
if (btnStart[0]) {
    btnStart[0].addEventListener("click", function () {
        setPage('content-home')
    })
}

function setPage(contentSet) {
    var bodyPage = document.getElementById("Page");
    var pageList = ['content-start', 'content-home', 'content-play'];

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

    //Check status
    if (contentSet == 'content-start') {
        btnLevelStatus[0].classList.add('hide');
        btnPoinStatus[0].classList.add('hide')
    } else {
        btnLevelStatus[0].classList.remove('hide');
        btnPoinStatus[0].classList.remove('hide')
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