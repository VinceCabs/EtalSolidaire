const TICKETS_COLUMN_HEADER = "# de ticket"
const TICKETS_PER_PAGE = 8


function addTicketsNb(sheet = SpreadsheetApp.getActiveSheet()) {
  // Gets the data from the passed sheet
  const dataRange = sheet.getDataRange();
  // Fetches displayed values for each row in the Range HT Andrew Roberts 
  // https://mashe.hawksey.info/2020/04/a-bulk-email-mail-merge-with-gmail-and-google-sheets-solution-evolution-using-v8/#comment-187490
  // @see https://developers.google.com/apps-script/reference/spreadsheet/range#getdisplayvalues
  const data = dataRange.getDisplayValues();

  // Assumes row 1 contains our column headings
  const heads = data.shift();

  // Gets the index of the column named 'Email Status' (Assumes header names are unique)
  // @see http://ramblings.mcpher.com/Home/excelquirks/gooscript/arrayfunctions
  const ticketsColIdx = heads.indexOf(TICKETS_COLUMN_HEADER);

  // get column as array of array. i.e. [[1], [2]]
  const ticketsColumn = data.map(function (value, index) { return [value[ticketsColIdx]]; });


  // count empty cells
  const emptyCells = ticketsColumn.length - ticketsColumn.filter(String).length;

  // prepare list of tickets positions with page shift to follow the right order. i.e [1, 9, 2, 10, ...]
  const pageNb = Math.floor(emptyCells / TICKETS_PER_PAGE) + 1;
  const position = [];
  for (let ticketPagePosition = 1; ticketPagePosition < TICKETS_PER_PAGE + 1; ticketPagePosition++) {
    for (let page = 0; page < pageNb; page++) {
      position.push(ticketPagePosition + TICKETS_PER_PAGE * page)
    }
  }

  // insert tickets positions into empty cells
  for (let i = 0; i < ticketsColumn.length; i++) {
    if (!ticketsColumn[i][0]) {
      ticketsColumn[i][0] = position.shift()
    }
  }

  // update tickets column in sheet
  r = sheet.getRange(2, ticketsColIdx + 1, ticketsColumn.length).setValues(ticketsColumn)

  toast("Add tickets #", "Tickets numbers added");
}
