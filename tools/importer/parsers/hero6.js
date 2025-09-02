/* global WebImporter */
export default function parse(element, { document }) {
  // --- Helper Functions ---
  // Create table with 1 column and 3 rows as specified

  // 1. Header row (always the block name as per spec)
  const headerRow = [ 'Hero (hero6)' ];

  // 2. Image row
  let imageCell = '';
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    const firstDiv = grid.children[0];
    if (firstDiv) {
      const img = firstDiv.querySelector('img');
      if (img) {
        // Reference the existing <img> element, do not clone
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createComment(' field:image '));
        frag.appendChild(img);
        imageCell = frag;
      }
    }
  }

  // 3. Text row (heading, subheading, CTAs)
  let textCell = '';
  if (grid && grid.children[1]) {
    const rightCol = grid.children[1];
    // Look for the .card with text content
    const card = rightCol.querySelector('.card');
    if (card) {
      // Build a frag with the comment, then reference all original child nodes
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:text '));
      Array.from(card.childNodes).forEach((node) => {
        frag.appendChild(node);
      });
      textCell = frag;
    }
  }

  // Compose rows for table
  const tableRows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
