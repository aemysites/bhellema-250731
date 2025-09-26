/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with field comment and content
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // HEADER ROW
  const headerRow = ['Hero (hero37)'];

  // ROW 2: Image (none in this case, so empty cell, no field hint)
  const imageRow = [''];

  // ROW 3: Text (headline, subheading, CTA)
  // Find the headline, subheading, and CTA button
  let headline, subheading, cta;
  // The structure is section > div.container > div.grid-layout > [div (text), a (cta)]
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find the div with the heading
    const gridChildren = Array.from(grid.children);
    for (const child of gridChildren) {
      if (!headline && child.querySelector('h1, h2, h3, h4, h5, h6')) {
        headline = child.querySelector('h1, h2, h3, h4, h5, h6');
        subheading = child.querySelector('p, .subheading');
      }
      if (!cta && child.tagName === 'A') {
        cta = child;
      }
    }
  }

  // Compose the text content into a single richtext fragment
  const textFrag = document.createDocumentFragment();
  if (headline) textFrag.appendChild(headline);
  if (subheading) {
    // Add a space between headline and subheading if both exist
    if (headline) textFrag.appendChild(document.createElement('br'));
    textFrag.appendChild(subheading);
  }
  if (cta) {
    // Add a space before CTA if other content exists
    if (headline || subheading) textFrag.appendChild(document.createElement('br'));
    textFrag.appendChild(cta);
  }

  // Only add field comment if there is content
  const textCell = textFrag.childNodes.length
    ? fieldFragment('text', textFrag)
    : '';

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    [textCell],
  ], document);
  element.replaceWith(table);
}
