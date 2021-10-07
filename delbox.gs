var ui = SpreadsheetApp.getUi();
function onOpen(e){
  
  ui.createMenu("delbox").addItem("Get Emails", "delboxapi").addToUi(); //this will create a menu and an item
  
}

function delboxapi(){        //this function will get all the mail's data
  var input = ui.prompt('delbox', 'delboxapi', Browser.Buttons.OK_CANCEL);
  
  if (input.getSelectedButton() == ui.Button.CANCEL){
    return;
  }
  
  var label = GmailApp.getUserLabelByName('delboxapi');    // we assign the label here.
  var threads = label.getThreads();        //we will get all the threads too.
  
  for(var i = threads.length - 1; i >=0; i--){
    var messages = threads[i].getMessages();
    
    for (var j = 0; j <messages.length; j++){
      var message = messages[j];
      if (message.isUnread()){
        getEverything(message);        // we call the fucntion get everything here in the loop
        GmailApp.markMessageRead(message);
      }
    }
    threads[i].removeLabel(label);
    
  }
  
}

function getEverything(message){
  var timeanddate = message.getDate();
  var textfromsubject = message.getSubject();
  var recievedFrom = message.getFrom();
  var Mailtext = message.getPlainBody();
  
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  activeSheet.appendRow([timeanddate,textfromsubject ,recievedFrom , Mailtext]); // this creates rows in the spreadsheet and prints.
}
