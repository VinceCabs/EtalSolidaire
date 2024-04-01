/** 
 * Creates the menu item "Etal Solidaire"
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  menu = ui.createMenu('Etal Solidaire')
  menu.addItem('Add tickets #', 'addTicketsNb').addToUi();
  menu.addItem('Send Emails', 'sendEmails').addToUi();
}