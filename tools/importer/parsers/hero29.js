/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    frag.appendChild(content);
    return frag;
  }

  // HEADER ROW: Block name
  const headerRow = ['Hero (hero29)'];

  // --- IMAGE ROW ---
  // Find the background image (img inside .ix-parallax-scale-out-hero)
  let imageEl = element.querySelector('.ix-parallax-scale-out-hero img');
  let imageCell = '';
  if (imageEl) {
    // Use the existing <img> element, wrapped in <picture> for robustness
    const picture = document.createElement('picture');
    picture.appendChild(imageEl);
    imageCell = fieldFragment('image', picture);
  }

  // --- TEXT ROW ---
  // Find the main heading (h1)
  let textCell = '';
  const h1 = element.querySelector('h1');
  if (h1) {
    // Use the existing h1 element as richtext
    textCell = fieldFragment('text', h1);
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
