/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns'];

  // Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each immediate child div of the grid contains an image
  const imageDivs = Array.from(grid.children);

  // For each column, extract the image (with its container for aspect/rotation)
  const columns = imageDivs.map(div => {
    // Find the image inside this column
    const img = div.querySelector('img');
    if (img) {
      // Use the entire aspect/rotation wrapper for styling (not just the img)
      const aspectWrapper = div.querySelector('div');
      return aspectWrapper ? aspectWrapper : img;
    }
    return '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
