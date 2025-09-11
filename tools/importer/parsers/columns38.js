/* global WebImporter */
export default function parse(element, { document }) {
  // Find each direct child div (these are the column cells in the grid)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column consists of its inner HTML (which is typically just one image/div per column)
  // We reference the column elements directly, as required
  const headerRow = ['Columns (columns38)']; // Table header must match block name exactly
  const columnsRow = columns.map((col) => col); // No content is skipped; images are preserved

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
