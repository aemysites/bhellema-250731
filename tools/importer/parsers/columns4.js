/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Check for DOMUtils
  if (!WebImporter || !WebImporter.DOMUtils || !WebImporter.DOMUtils.createTable) return;

  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (each should be a div containing an img)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include the div itself (it wraps the img, and may have styling)
  const contentRow = columns.map((col) => col);

  // Build table data
  const tableData = [
    headerRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
