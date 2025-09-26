/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // 1. Find the image (for 'image' field)
  let imageEl = element.querySelector('img');
  let imageCell = '';
  if (imageEl) {
    // Use the actual <img> element as required by the model (alt is collapsed)
    imageCell = fieldFragment('image', imageEl);
  }

  // 2. Find the main heading and CTA/button (for 'text' field)
  // We'll look for the largest heading and any button/link in the right-side grid
  let textCell = '';
  // Find the right-side container (the one with the heading and button)
  let rightGrid = Array.from(element.querySelectorAll(':scope > div > div, :scope > div')).find(div =>
    div.querySelector('h1, h2, h3, h4, h5, h6')
  );
  if (!rightGrid) {
    // fallback: find any container with a heading
    rightGrid = element.querySelector('h1, h2, h3, h4, h5, h6')?.parentElement;
  }
  let textFrag = document.createDocumentFragment();
  if (rightGrid) {
    // Find heading
    const heading = rightGrid.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textFrag.appendChild(heading);
    // Find CTA (button or link)
    const cta = rightGrid.querySelector('a, button');
    if (cta) textFrag.appendChild(cta);
  }
  if (textFrag.childNodes.length) {
    textCell = fieldFragment('text', textFrag);
  }

  // Table rows
  const rows = [
    ['Hero'],
    [imageCell],
    [textCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
