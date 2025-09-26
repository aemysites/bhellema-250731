/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns1) - Columns block with images in columns
  // Per instructions: DO NOT add field comments for Columns blocks

  // Header row
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate child divs (each contains an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the content (here, each is a div with an image)
  const columns = columnDivs.map(div => div);

  // Only one row of columns for this block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}
