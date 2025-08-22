/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (the actual columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);

  // Defensive: ensure at least four columns (name, tags, heading, body)
  if (columns.length < 4) return;

  // Column 1: Name
  const nameEl = columns[0];
  // Column 2: Tags (vertical flex)
  const tagsEl = columns[1];
  // Column 3: Heading
  const headingEl = columns[2];
  // Column 4: Rich text body
  const bodyEl = columns[3];

  // Compose columns for row 2: name, tags, heading+body
  // The visual shows three content columns:
  // [name] | [tags] | [heading + body]
  // We'll combine heading and body as one column as they are visually grouped.

  const headingAndBody = document.createElement('div');
  // Reference (move) the actual elements, not clones, to preserve semantics
  headingAndBody.appendChild(headingEl);
  headingAndBody.appendChild(bodyEl);

  // Table rows
  const headerRow = ['Columns (columns30)'];
  const contentRow = [nameEl, tagsEl, headingAndBody];

  // Build table block
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(blockTable);
}
