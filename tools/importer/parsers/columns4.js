/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get all direct children divs (each represents a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 2. Guard: must have at least one column
  if (!columnDivs.length) return;

  // 3. Per instructions, use provided block name as header
  const headerRow = ['Columns (columns4)'];

  // 4. The second row: each cell is the corresponding column div (each contains the image)
  //    Reference the actual div elements, don't clone or create new
  const contentRow = columnDivs;

  // 5. Build the table, referencing actual elements
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 6. Replace the original grid element with the table
  element.replaceWith(table);
}
