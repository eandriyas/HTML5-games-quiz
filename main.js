const electron = require("electron");
const remote = electron.remote;

const ipc = electron.ipcRenderer;

document.addEventListener("DOMContentLoaded", function () {
    ipc.send("mainWindowLoaded")
    ipc.on("resultSent", function (evt, result) {
        let resultEl = document.getElementById("result");
        console.log(result);

        if (result == []) {

        }
        for (var i = 0; i < result.length; i++) {
            resultEl.innerHTML += "First Name: " + result[i].FirstName.toString() + "<br/>";
        }
    });
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

        var keluar = confirm('Keluar');
        if (keluar) {
            w.close()
        }
    })
}