/* global WebImporter */
export default function parse(element, { document }) {
  // Extract direct child columns from the grid container
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row must match EXACTLY
  const headerRow = ['Columns (columns38)'];

  // Build the row with each cell as image or corresponding content
  const contentRow = columns.map((col) => {
    // If a single img, reference it directly
    if (col.children.length === 1 && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    }
    // If the col is empty, return empty string
    if (col.textContent.trim() === '' && col.children.length === 0) {
      return '';
    }
    // Otherwise, place the column div itself (preserves content/structure)
    return col;
  });

  // Assemble table rows
  const rows = [headerRow, contentRow];

  // Create table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
