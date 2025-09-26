/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows, header row first
  // Model fields: image (reference), imageAlt (collapsed), text (richtext, collapsed)
  // Each card = one row, columns: [image, text]

  // Get all card divs (each immediate child is a card)
  const cardDivs = Array.from(element.children);

  // Build table rows
  const rows = [];
  // Header row: must be exactly one column
  const headerRow = ['Cards (cards35)'];
  rows.push(headerRow);

  cardDivs.forEach((cardDiv) => {
    // Find image (reference)
    const img = cardDiv.querySelector('img');
    let imageCell = '';
    if (img) {
      // Wrap image in <picture>, preserve alt
      const picture = document.createElement('picture');
      picture.appendChild(img); // Move the existing <img> into <picture>
      // Add field comment before image
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(picture);
      imageCell = frag;
    }
    // No text content in source, so second cell is empty (no hint for collapsed field)
    rows.push([imageCell, '']);
  });

  // Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
