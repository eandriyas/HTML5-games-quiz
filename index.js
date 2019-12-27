const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron")
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});


const user = {
    status: false,
    data: {}
};

var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
    debug: false
});


app.on("ready", () => {
    let mainWindow = new BrowserWindow({
        height: 850,
        width: 411,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        label: 'Screen',
        submenu: [{
            label: 'Resizable Window',
            click() {
                mainWindow.setResizable(false);
            }
        }]
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'home.html'),
        protocol: 'file',
        slashes: true
    }));
    mainWindow.once("ready-to-show", () => {
        mainWindow.show()
    })

    ipcMain.on("mainWindowLoaded", function () {
        let result = knex.select("*").from("User")

        let userTest = knex.select("*")
            .from("User")
            .join("Level")
            .where("User.LevelId", "Level.LevelId")

        // console.log(userTest)
        userTest.then(function (rows) {
            console.log(rows);
        });
        result.then(function (rows) {
            if (rows == []) {
                user.status = false;
            } else {
                user.data = rows[0];
                user.status = true;
            }
            mainWindow.webContents.send("dataUser", user)
        })


    });

    //Terima data dari client
    /* ipcMain.on('sendData', function (evt, arg) {
        console.log(arg.data)

        let add = knex.insert({
            name: arg.data,
            poin: 0
        }).into("User").then();

        //Kirim data ke client
        let result = knex.select("*").from("User")
        console.log(result)
        result.then(function (rows) {
            mainWindow.webContents.send("sendDataResult", rows);
        })

        mainWindow.webContents.send('sendDataResult', {
            "data": "andriyas"
        })
    }) */

    //Tambah User
    ipcMain.on('tambahUser', function (evt, arg) {
        if (arg.nama != '') {
            let addUser = knex.insert({
                name: arg.nama,
                poin: 0
            }).into("User").then();

            let resultUser = knex.select("*").from("User");

            resultUser.then(function (rows) {
                if (rows == []) {
                    user.status = false;
                } else {
                    user.data = rows
                    user.status = true;
                    mainWindow.webContents.send("resultSent", rows);
                }
            })
        }
    })
});



app.on("window-all-closed", () => {
    app.quit()
})