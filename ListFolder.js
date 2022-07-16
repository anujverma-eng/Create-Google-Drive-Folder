function listAllFolders() {
  var folderId = Browser.inputBox('Enter folder ID', Browser.Buttons.OK_CANCEL);
  if (folderId === "") {
    Browser.msgBox('Folder ID is invalid');
    return;
  }
  var ss = SpreadsheetApp.getActiveSheet();
  var parentFolder = DriveApp.getFolderById(folderId);
  var folderList = parentFolder.getFolders();
  while (folderList.hasNext()) {
    try {
      var childFolder = folderList.next();
      var data = [childFolder.getName(), childFolder.getUrl(), childFolder.getId(), childFolder.getDateCreated(),childFolder.getName(),childFolder.getSize(),childFolder.getLastUpdated()];
      ss.appendRow(data);

    } catch (e) {
      Logger.log(e)
    }
  }
};
