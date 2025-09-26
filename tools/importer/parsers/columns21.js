/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block: 4 columns, 1 row of content under header
  // 1. Get the grid container (holds the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Get the four columns (direct children of grid)
  //    - 1st: branding + social
  //    - 2nd: Trends
  //    - 3rd: Inspire
  //    - 4th: Explore
  const columns = Array.from(grid.children);
  if (columns.length < 4) return;

  // 3. Build cells for the second row
  //    - Each cell is the full column content
  //    - Do NOT add field comments for Columns blocks
  const rowCells = columns.map(col => col);

  // 4. Table header row
  const headerRow = ['Columns (columns21)'];

  // 5. Build table
  const cells = [headerRow, rowCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element
  element.replaceWith(table);
}
