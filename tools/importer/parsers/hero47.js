/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // --- 1. Find image for the hero background ---
  // The image is always in the first grid child
  const gridDivs = element.querySelectorAll(':scope .w-layout-grid > div');
  let imageEl = null;
  if (gridDivs.length > 0) {
    imageEl = gridDivs[0].querySelector('img');
  }

  // --- 2. Find text content (headline, subheading, CTA) ---
  // The text content is in the second grid child
  let textContentDiv = null;
  if (gridDivs.length > 1) {
    textContentDiv = gridDivs[1];
  }

  // Compose a fragment for the text field
  let textFrag = null;
  if (textContentDiv) {
    // We'll collect heading, subheading, and CTA (if present)
    const frag = document.createDocumentFragment();
    // Heading (h2)
    const heading = textContentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) frag.appendChild(heading);
    // Subheading (p)
    const subheading = textContentDiv.querySelector('p');
    if (subheading) frag.appendChild(subheading);
    // CTA (a.button)
    const cta = textContentDiv.querySelector('a.button, a');
    if (cta) frag.appendChild(cta);
    textFrag = fieldFragment('text', frag);
  }

  // Compose a fragment for the image field
  let imageFrag = null;
  if (imageEl) {
    // Wrap in <picture> for best practice
    const picture = document.createElement('picture');
    picture.appendChild(imageEl);
    imageFrag = fieldFragment('image', picture);
  }

  // --- 3. Build the table rows ---
  const rows = [];
  // Header row
  rows.push(['Hero']);
  // Image row
  rows.push([imageFrag]);
  // Text row
  rows.push([textFrag]);

  // --- 4. Create and replace ---
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
