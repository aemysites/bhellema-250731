/* global WebImporter */
export default function parse(element, { document }) {
  // Always use block name as header row
  const headerRow = ['Columns (columns45)'];

  // Find the grid container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: expect 2 columns (text content, button)
  // Column 1: All text content (eyebrow, heading, paragraph)
  // Column 2: Button

  // Column 1: Find the text block (the div with eyebrow, heading, paragraph)
  const textCol = columns.find(col => col.querySelector('.h1-heading'));
  // Column 2: Find the button (the anchor)
  const buttonCol = columns.find(col => col.tagName === 'A');

  // Prepare cells for the second row
  const row = [];
  if (textCol) {
    row.push(textCol);
  } else {
    row.push(document.createElement('div'));
  }
  if (buttonCol) {
    row.push(buttonCol);
  } else {
    row.push(document.createElement('div'));
  }

  // Build table data
  const cells = [headerRow, row];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
