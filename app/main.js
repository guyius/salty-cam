global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');
var shell = require('nw.gui').Shell;
var Tail = require('tail').Tail;

$(document).ready(function () {
    var folder = new folder_view.Folder($('#files'));
    var addressbar = new abar.AddressBar($('#addressbar'));
    var tail = new Tail("/Users/guybiton/Projects/guy.txt");
    folder.open(process.cwd());
    addressbar.set(process.cwd());

    folder.on('navigate', function (dir, mime) {
        if (mime.type == 'folder') {
            addressbar.enter(mime);
        } else {
            shell.openItem(mime.path);
        }
    });

    addressbar.on('navigate', function (dir) {
        folder.open(dir);
    });

    tail.on("line", function(data) {
        alert(data);
    });

    tail.on("error", function(error) {
        alert('ERROR: ' + error);
    });
});
