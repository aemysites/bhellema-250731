/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return; // Defensive: expect at least 4 for this layout

  // Left column: Name (Taylor Brooks)
  const left = columns[0];
  // Middle column: Tags
  const middle = columns[1];
  // Right column: Heading + rich text
  const heading = columns[2];
  const richText = columns[3];

  // Compose the right column's content (heading and rich text, preserving structure and all content)
  const rightContent = document.createElement('div');
  rightContent.appendChild(heading);
  rightContent.appendChild(richText);

  // Per specification: use the target block name exactly
  const headerRow = ['Columns (columns30)'];

  // Assemble the table rows, referencing existing elements
  const dataRow = [left, middle, rightContent];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  // Replace the original element with our block table
  element.replaceWith(table);
}
