$(function () {

  var fileName = "test.txt";
  var fileSystem;
  var storage;

  function errorHandler(e /* FileError */) {
    var msg = '';

    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
      default:
        msg = 'Unknown Error';
        break;
    };

    $('#storage').html('Error: ' + msg);
  }

  $('.storage').attr('disabled', 'disabled');

  $('#check').click(function () {
    fileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    $('#checkOutput').html((fileSystem && fileSystem !== undefined) ? "available" : "not available");
  });

  $('#request').click(function () {
    fileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    fileSystem(window.PERSISTENT, /* 10Mb*/2 * 1024 * 1024
                                    , function (fs) {
                                      storage = fs; $('#storage').html('Created');
                                      $('.storage').removeAttr('disabled')

                                    }, errorHandler);
  });

  $('#create').click(function () {
    storage.root.getFile(fileName, { create: true, exclusive: false }
                                    , function (fileEntry) {
                                      $('#storage').html('File ' + fileEntry.name + ' created');
                                    }, errorHandler);
  });

  $('#load').click(function () {

    storage.root.getFile(fileName, {}, function (fileEntry) {

      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
          $('#fileContents').html(this.result);
        };
        reader.readAsText(file);
      }, errorHandler);
    }, errorHandler);
  });

  $('#save').click(function () {

    storage.root.getFile(fileName, {}, function (fileEntry) {

      // Create a FileWriter object for our FileEntry.
      fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function (e) {
          console.log('Write completed.');
        };

        fileWriter.onerror = function (e) {
          console.log('Write failed: ' + e.toString());
        };

        // Create a new Blob and write it to log.txt.
        var bb = new WebKitBlobBuilder();
        bb.append($('#fileContents').html());
        fileWriter.write(bb.getBlob('text/plain'));

      }, errorHandler);

    }, errorHandler);
  });

  $('#dir').click(function () {
    var dirReader = storage.root.createReader();
    var readFiles = function () {
      dirReader.readEntries(function (files) {
        for (var i = 0; i < files.length; i++) {
          console.log(files[i].name);
        }
        if (files.length > 0)
          readFiles();
      }, errorHandler);
    };
    readFiles();
  });

  $('#delete').click(function () {

    storage.root.getFile(fileName, { create: false },
      function (fileEntry) {
        fileEntry.remove(function () {
          console.log('File removed.');
        }, errorHandler);
      }, errorHandler);

  });
});