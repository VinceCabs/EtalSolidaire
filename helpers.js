/**
 * Add a toast on the bottom right corner indicating status
 */
function toast(title, description) {
  SpreadsheetApp.getActive().toast(description, title, -1);
}

/**
 * Get the raw text from the active cell and display it in a dialog box.
 */
function getRawText() {
  let txt = SpreadsheetApp.getActiveSpreadsheet().getCurrentCell().getValue();
  let ui = SpreadsheetApp.getUi();
  let result = ui.alert(txt, ui.ButtonSet.OK);
}
