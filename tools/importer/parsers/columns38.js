/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Set table header as per strict instructions
  const headerRow = ['Columns (columns38)'];

  // Find direct column divs only (no nested divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the content row: each column cell gets its main image
  const contentRow = columns.map(col => {
    // Try to get the first img for each column
    const img = col.querySelector('img');
    // If no image, fallback to text content, else empty cell
    if (img) return img;
    if (col.textContent && col.textContent.trim()) {
      const span = document.createElement('span');
      span.textContent = col.textContent.trim();
      return span;
    }
    return document.createTextNode('');
  });

  // Construct table rows
  const rows = [headerRow, contentRow];

  // Create table using provided API
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original block with the block table
  element.replaceWith(table);
}
