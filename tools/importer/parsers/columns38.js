/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we only target the direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column's DOM node itself becomes a TD cell content (preserving images, etc)
  const contentRow = columns.map(div => div);

  // The header row uses the required block name
  const headerRow = ['Columns (columns38)'];

  // Use the web-importer utility to create the correct table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original grid with the table
  element.replaceWith(table);
}
