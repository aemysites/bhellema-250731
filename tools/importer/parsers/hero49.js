/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    frag.appendChild(content);
    return frag;
  }

  // Find image element (for hero image)
  let img = element.querySelector('img');
  let imageCell = null;
  if (img) {
    // Wrap image in <picture> for best practice
    const picture = document.createElement('picture');
    picture.appendChild(img);
    imageCell = fieldFragment('image', picture);
  }

  // Find heading and CTA button
  let heading = null;
  let button = null;
  // Search for heading (h1/h2/h3)
  heading = element.querySelector('h1, h2, h3, .h1-heading, .h2-heading, .h3-heading');
  // Search for CTA button (anchor with button class)
  button = element.querySelector('a.button, a.w-button, button');

  // Compose text cell
  let textCell = null;
  if (heading || button) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));
    if (heading) frag.appendChild(heading);
    if (button) frag.appendChild(button);
    textCell = frag;
  }

  // Table rows
  const headerRow = ['Hero'];
  const imageRow = [imageCell];
  const textRow = [textCell];

  // Compose table
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
