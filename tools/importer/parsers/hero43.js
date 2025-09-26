/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with field comment and content
  function fieldCell(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    if (content) frag.appendChild(content);
    return frag;
  }

  // --- 1. Header row ---
  const headerRow = ['Hero'];

  // --- 2. Image row ---
  // Find the image element
  let img = element.querySelector('img');
  let imageCell = '';
  if (img) {
    // Wrap image in <picture> for best practice
    const picture = document.createElement('picture');
    picture.appendChild(img);
    imageCell = fieldCell('image', picture);
  }

  // --- 3. Content row ---
  // Find the main heading and CTA button
  let contentFrag = document.createDocumentFragment();
  // Heading
  const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) contentFrag.appendChild(heading);
  // Button/CTA
  const cta = element.querySelector('a, button');
  if (cta) contentFrag.appendChild(cta);
  // Only add field comment if there is content
  let textCell = '';
  if (contentFrag.childNodes.length) {
    textCell = fieldCell('text', contentFrag);
  }

  // --- Build table ---
  const cells = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
