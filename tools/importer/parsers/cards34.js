/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    frag.appendChild(content);
    return frag;
  }

  // Find all card anchor elements (each card is an <a> inside the main grid)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');
  const rows = [];

  // Header row as required
  rows.push(['Cards (cards34)']);

  // For each card, extract image and text content
  cardLinks.forEach((cardLink) => {
    // Image cell
    let imageCell = '';
    const img = cardLink.querySelector('img');
    if (img) {
      // Wrap image in <picture> for best practice
      const picture = document.createElement('picture');
      picture.appendChild(img.cloneNode(true));
      imageCell = fieldFragment('image', picture);
    }

    // Text cell
    let textCell = '';
    // The text content is everything except the image
    // Find the main text container (the div after the image)
    // This div contains tag, meta, heading, description, CTA
    const contentDiv = cardLink.querySelector('img')?.nextElementSibling;
    if (contentDiv) {
      // Only include the actual content, not the image
      // Clone the contentDiv to avoid moving it
      textCell = fieldFragment('text', contentDiv.cloneNode(true));
    }

    rows.push([
      imageCell,
      textCell,
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
