const electron = require("electron");
const remote = electron.remote;

const ipc = electron.ipcRenderer;
let profile = {};

document.addEventListener("DOMContentLoaded", function () {
    ipc.send("mainWindowLoaded")
    ipc.on("resultSent", function (evt, result) {
        console.log("resultSent" + result);
    });

    ipc.on("dataUser", function (evt, data) {
        console.log(data)
        profile = data;

        if (data.status == false) {
            setPage("content-box-nama")
        } else {
            setUser(data.data)
            setPage("content-home")
        }
    })
});

var btnLevelStatus = document.getElementsByClassName("level-status");
if (btnLevelStatus[0]) {
    btnLevelStatus[0].addEventListener("click", function () {

        //Kirim data ke server
        ipc.send("sendData", {
            "data": "testing"
        })

        //Terima data dari server
        ipc.on("sendDataResult", function (evt, result) {
            console.log(result)
        })
    })
}

var btnKeluar = document.getElementsByClassName('btn-keluar');
if (btnKeluar[0]) {
    btnKeluar[0].addEventListener("click", function () {
        let w = remote.getCurrentWindow()

        var keluar = confirm('Apakah anda akan keluar aplikasi?');
        if (keluar) {
            w.close()
        }
    })
}

function setUser(user) {
    var statusName = document.getElementsByClassName("text-status");

    statusName[0].textContent = user.Name;

    var poinValue = document.getElementsByClassName("text-poin-status")

    poinValue[0].textContent = user.Poin;
}