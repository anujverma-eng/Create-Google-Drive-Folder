
function onOpen() { //This is the new standard script for the onOpen trigger that creates a menu item.
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('GDrive')
    .addItem('Create Folders','myFunction')
    .addToUi();
    AvermaPrompt();
  }
  
  function AvermaPrompt(){
    SpreadsheetApp.getUi().alert("Don't Do the Followings : \n \n 1. Don't write anything Extra in any Column. \n 2. Don't Unhide the Columns. \n 3. Don't Merge any Cells \n 4. Don't write Anything Extra Except the RootFolder Id in Column - B \n \n Do the Following : \n \n 1. Always Use the Ladder System. \n 2. Always Remember the Statement : \n \t - The Parent can have n number of Childs and the Siblings can not have the Same name. \n 3. Always add the Root Folder in Cell - B3. \n 4. Always Go Level Wise Level. \n \n Usage : Click on GDrive> Create Folders in the Top Ribbon \n \n - - Created By  :  `Anuj Verma`");
  }
  
  
  function crtGdriveFolder() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var levelInput = Browser.inputBox('input Level', Browser.Buttons.OK_CANCEL);  
    Logger.log(levelInput)
    var Level =  levelInput * 2 + 1; 
    Logger.log(Level)
    var numRows = sheet.getLastRow();   // Number of rows to process
    var dataRange = sheet.getRange(3, Number(Level)-1, numRows, Number(Level)); //startRow, startCol, endRow, endCol
    var data = dataRange.getValues();
    var parentFolderID = new Array();
  
    for(var i in data)
      {        
      parentFolderID[i] = data [i][0];
      if (data [i][0] == "")
        {
        parentFolderID[i] = parentFolderID[i-1];
        }  
      }
      
      
     for(var i in data){
      if (data [i][1] !== "")
        {
          
        var folderName = data[i][1]; 
        Logger.log(parentFolderID[i])
        var theParentFolder = DriveApp.getFolderById(parentFolderID[i]);
  
        var newFolderID = sheet.getRange(Number(i)+3,Number(Level)+1);
  
        var folderIdValue = createFolderFn(theParentFolder,folderName,newFolderID,levelInput,parentFolderID[i]);
  
        newFolderID.setValue(folderIdValue);
        
        var addLink = sheet.getRange(Number(i)+3,Number(Level));
        var value = addLink.getDisplayValue();
        // addLink.setValue('=hyperlink("https://drive.google.com/corp/drive/folders/'+ folderIdValue +'","' + value + '")'); 
        addLink.setValue(folderIdValue); 
        // var theParentFolder = DriveApp.getFolderById(parentFolderID[i]);
        
          
         
        }
      }
  
    for(var i in data){
      if(data[i][1]!==""){
        var folderName = data[i][1];
        var theParentFolder = DriveApp.getFolderById(parentFolderID[i]);
  
        if(levelInput>=5){
  
          var val=true
          val = createExcelFN(theParentFolder,folderName,levelInput,parentFolderID[i]);
          Logger.log(val)
          
          if(val == true){
          Logger.log("File Found")
          
          }
          else{
            Logger.log("File NOT Found")
            var newFolderID = sheet.getRange(Number(i)+3,Number(Level)+1);
  
            var folderIdValue = createFolderFnAFTER5(theParentFolder,folderName,newFolderID,levelInput,parentFolderID[i]);
  
            newFolderID.setValue(folderIdValue);
        
            var addLink = sheet.getRange(Number(i)+3,Number(Level));
            var value = addLink.getDisplayValue();
            // addLink.setValue('=hyperlink("https://drive.google.com/corp/drive/folders/'+ folderIdValue +'","' + value + '")'); 
            addLink.setValue(folderIdValue); 
         }
  
        };
      };
    };
  
  }
  
  
  //Create folder if does not exists only
  function createFolderFn(theParentFolder, folderName,newFolderID,levelInput,parentFolderID){
    // var theParentFolder = DriveApp.getFolderById(parentFolderID);
    Logger.log(theParentFolder)
    var subFolders = theParentFolder.getFolders();
    var doesntExists = true;
    var theChildFolder = '';
    
    // Check if folder already exists.
    while(subFolders.hasNext()){
      Logger.log('creatFolderFn while')
      var folder = subFolders.next();
      
      //If the name exists return the id of the folder
      if(folder.getName() === folderName){
        doesntExists = false;
        theChildFolder = folder;
        return theChildFolder.getId();
      };
    };
  
  
    //If the name doesn't exists, then create a new folder
    if(doesntExists == true && levelInput!=5){
      //If the file doesn't exists
        var theChildFolder = theParentFolder.createFolder(folderName);   
        var folderIdValue = theChildFolder.getId();
  
      return theChildFolder.getId();
    }
  };
  
  
  
  //Create folder if does not exists only
  function createExcelFN(theParentFolder, folderName,levelInput,parentFolderID){
    var subFolders = DriveApp.getFolderById(parentFolderID).getFiles();
    // var subFolders = DriveApp.getFiles();
    Logger.log(subFolders)
    var doesntExists = true;
    Logger.log('before while')
    while(subFolders.hasNext()){
      Logger.log('iNN while')
      var folder = subFolders.next();
  
      if(folder.getName() === folderName){
        doesntExists = false;
        theChildFolder = folder;
        return true;
      }
    }
  
    //If the name doesn't exists, then create a new folder
    if(doesntExists == true && levelInput==5){
      Logger.log('False Return')
      return false;
    }
  };
  
  function createFolderFnAFTER5(theParentFolder, folderName,newFolderID,levelInput,parentFolderID){
    // var theParentFolder = DriveApp.getFolderById(parentFolderID);
    Logger.log(theParentFolder)
    var subFolders = theParentFolder.getFolders();
    var doesntExists = true;
    var theChildFolder = '';
    
    // Check if folder already exists.
    while(subFolders.hasNext()){
      Logger.log('creatFolderFn while')
      var folder = subFolders.next();
      
      //If the name exists return the id of the folder
      if(folder.getName() === folderName){
        doesntExists = false;
        theChildFolder = folder;
        return theChildFolder.getId();
      };
    };
  
  
    //If the name doesn't exists, then create a new folder
    if(doesntExists == true){
      //If the file doesn't exists
        var theChildFolder = theParentFolder.createFolder(folderName);   
        var folderIdValue = theChildFolder.getId();
  
      return theChildFolder.getId();
    }
  };
  
  
  