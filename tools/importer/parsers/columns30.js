/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns30) block: always use the block name as the header row
  const headerRow = ['Columns (columns30)'];

  // Identify all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element if present
  const cells = columns.map((col) => {
    // Only reference the existing <img> element (do not clone or create new)
    const img = col.querySelector('img');
    return img || '';
  });

  // Compose the table rows: header, then one row with the columns
  const tableRows = [
    headerRow,
    cells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
