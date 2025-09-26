/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with a field comment and content
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Find the main image (background image)
  const img = element.querySelector('img');
  let imageCell = '';
  if (img) {
    // Use the existing <img> element directly
    imageCell = fieldFragment('image', img);
  }

  // Find the text content (headline, subheading, CTA)
  // The text content is in the second .card-body
  const cardBody = element.querySelector('.card-body');
  let textCell = '';
  if (cardBody) {
    // We'll create a fragment with the field comment and all cardBody content
    // Remove any overlay divs or non-content elements if present
    // (Here, cardBody only contains heading, paragraph, and button group)
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));
    // Clone children to avoid moving them out of the DOM
    Array.from(cardBody.childNodes).forEach((node) => {
      frag.appendChild(node.cloneNode(true));
    });
    textCell = frag;
  }

  // Build the table rows
  const rows = [
    ['Hero'],
    [imageCell],
    [textCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
