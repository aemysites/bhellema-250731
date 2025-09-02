/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row for Columns block
  const headerRow = ['Columns (columns4)'];

  // Extract the direct children of the grid (each is a column)
  const columnElements = Array.from(element.children);

  // Each column cell should contain only the original DOM element (preserve DOM reference)
  const contentRow = columnElements;

  // Compose table data
  const tableData = [headerRow, contentRow];

  // Build and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
