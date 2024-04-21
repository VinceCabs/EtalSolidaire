/**
 * Add a toast on the bottom right corner indicating status
 */
function toast(title, description) {
    SpreadsheetApp.getActive().toast(description, title, -1);
}