/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if at least one column exists
  if (columns.length === 0) return;

  // Table row definitions
  // 1. Header row: the block name exactly as specified
  const headerRow = ['Columns (columns4)'];

  // 2. Content row: reference each column div (not cloning, keep semantic/structure)
  const contentRow = columns;

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
