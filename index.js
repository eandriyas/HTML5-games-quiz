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

var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
    debug: true
});

app.on("ready", () => {
    let mainWindow = new BrowserWindow({
        height: 850,
        width: 411,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
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
        let result = knex.select("FirstName").from("User")
        console.log(result)
        result.then(function (rows) {
            mainWindow.webContents.send("resultSent", rows);
        })
    });
});



app.on("window-all-closed", () => {
    app.quit()
})