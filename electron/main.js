'use strict';

const electron = require('electron');

const autoUpdater = require('electron-updater').autoUpdater

const { app, ipcMain, BrowserWindow, dialog,globalShortcut } = electron;

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        autoHideMenuBar: true,
        fullscreenable: true
    });

    var url = 'file://' + __dirname + '/../www/index.html';
    win.loadURL(url);

    win.maximize();

    updateHandle();
    ipcMain.on('check-for-update', function(event, arg) {
        updateHandle();
    });

    win.on('closed', () => {

        win = null;

    });

     globalShortcut.register('CommandOrControl+T+F+Y', () => {
        win.webContents.openDevTools(); // 调试使用
     })

}

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle() {
   let message={
        appName:'英语听读',
        downloaded: '已经升级到最新版，将在重启此应用后生效！'
    };

    autoUpdater.on('error', function(error){
        sendUpdateMessage(-1)
    });

    //当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', function() {
        sendUpdateMessage(0)
    });

    //当发现一个可用更新的时候触发，更新包下载会自动开始
    autoUpdater.on('update-available', function(info) {
        sendUpdateMessage(1);
    });

    //当没有可用更新的时候触发
    autoUpdater.on('update-not-available', function(info) {
        sendUpdateMessage(2)
    });
    
    // 更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
        win.webContents.send('downloadProgress', progressObj)
    })

    /**
     *  event Event
     *  releaseNotes String - 新版本更新公告
     *  releaseName String - 新的版本号
     *  releaseDate Date - 新版本发布的日期
     *  updateURL String - 更新地址
     * */
    autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
/*        var index = dialog.showMessageBox(win, {
            type: 'info',
            buttons: ['现在重启', '稍后重启'],
            title: message.appName,
            message: message.downloaded
        });

        if (index === 1) {
            return;
        }

        autoUpdater.quitAndInstall(); //在下载完成后，重启当前的应用并且安装更新
*/    });

    autoUpdater.checkForUpdates();
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
  win.webContents.send('message', text)
}

// This method will be called when Electron has finished

// initialization and is ready to create browser windows.

// Some APIs can only be used after this event occurs.

app.on('ready', createWindow);
// Quit when all windows are closed.

app.on('window-all-closed', () => {

    // On OS X it is common for applications and their menu bar

    // to stay active until the user quits explicitly with Cmd + Q

    if (process.platform !== 'darwin') {

        app.quit();

    }

});
app.on('activate', () => {

    // On OS X it's common to re-create a window in the app when the

    // dock icon is clicked and there are no other windows open.

    if (win === null) {

        createWindow();

    }

});