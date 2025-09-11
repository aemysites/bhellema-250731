/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Columns row: each cell is the referenced div for each column
  const columnsRow = columnDivs.map((col) => col);

  // Table header row as specified
  const headerRow = ['Columns (columns4)'];

  // Build table: header, then one row with all columns
  const tableArray = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
