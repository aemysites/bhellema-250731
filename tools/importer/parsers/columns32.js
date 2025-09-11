/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout in the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // 1st column: Image
  const imgCol = cols[0]; // img element
  // 2nd column: All textual info
  const infoCol = cols[1];

  // Build the table rows
  const headerRow = ['Columns block (columns32)'];
  // For columns blocks, DO NOT add any field comments.
  // Place elements directly into their cells as references.
  const contentRow = [imgCol, infoCol];

  // Assemble full table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the section with the new table
  element.replaceWith(table);
}
