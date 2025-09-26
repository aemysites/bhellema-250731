/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns in the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: ensure we have at least 4 children (3 columns: name+tags, heading, rich text)
  // Source order: [name], [tags], [heading], [rich text]
  // We'll combine [name] and [tags] into the first column

  // --- Column 1: Name + Tags ---
  const col1 = document.createDocumentFragment();
  if (gridChildren[0]) col1.appendChild(gridChildren[0]); // Name
  if (gridChildren[1]) col1.appendChild(gridChildren[1]); // Tags

  // --- Column 2: Heading ---
  const col2 = gridChildren[2] || document.createDocumentFragment();

  // --- Column 3: Rich Text ---
  const col3 = gridChildren[3] || document.createDocumentFragment();

  // Columns block header row (must match block name exactly)
  const headerRow = ['Columns (columns31)'];
  const contentRow = [col1, col2, col3];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
