/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Build header row as required by block spec
  const headerRow = ['Columns (columns39)'];

  // 2. Extract columns: direct children of the grid
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, extract the main image (reference the existing image element)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    // Only reference the actual image element from the DOM; do not clone or create new
    return img || '';
  });

  // 4. Build the table data
  const tableData = [
    headerRow,
    contentRow
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace the original element with the new block
  element.replaceWith(block);
}
