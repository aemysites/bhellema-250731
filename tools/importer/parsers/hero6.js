/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to add field comment before content
  function withFieldHint(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // 1. Table header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row (image field)
  let imageCell = '';
  const imageEl = element.querySelector('img');
  if (imageEl) {
    // Reference the existing image element, wrap in <picture>
    const picture = document.createElement('picture');
    picture.appendChild(imageEl);
    imageCell = withFieldHint('image', picture);
  }

  // 3. Text row (text field)
  let textCell = '';
  const card = element.querySelector('.card');
  if (card) {
    textCell = withFieldHint('text', card);
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
