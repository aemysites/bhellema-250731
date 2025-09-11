/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header must match exactly
  const headerRow = ['Columns (columns15)'];

  // Find the main .grid-layout (holds two columns: left content, right image)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  if (cols.length < 2) return; // Defensive: need both columns

  // Left column: capture all its contents as a single cell (preserves HTML)
  const leftCol = cols[0];
  // To ensure all text content is included, select all child elements and text nodes
  // We'll clone the left column deeply to preserve all structure and text
  const leftCell = leftCol.cloneNode(true);

  // Right column: the image element (may contain more than one image, but mostly one)
  // Directly clone the right column for consistency
  const rightCell = cols[1].cloneNode(true);

  // Compose rows for block table
  const columnsRow = [leftCell, rightCell];
  const rows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Output only the block table per spec
  element.replaceWith(table);
}
