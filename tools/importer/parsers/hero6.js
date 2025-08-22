/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get the first direct child matching a tag name
  function getDirectDescendant(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tag);
  }

  // Block Header
  const headerRow = ['Hero (hero6)'];

  // ---
  // 1. Background image row
  // Locate the main img (background)
  let bgImg = element.querySelector('img');
  const bgRow = [bgImg ? bgImg : ''];

  // ---
  // 2. Content: headline, subheading, CTA
  // Find the content grid (the text section is deeply nested)
  // The h1, p, and button group are in the deepest card div
  let contentCard = element.querySelector('.card');
  let contentElements = [];

  if (contentCard) {
    // Get h1 (title), p (subheading), and button group (CTA)
    const h1 = getDirectDescendant(contentCard, 'h1');
    if (h1) contentElements.push(h1);
    const p = getDirectDescendant(contentCard, 'p');
    if (p) contentElements.push(p);
    // Find the button group (div.button-group)
    const buttonGroup = contentCard.querySelector('.button-group');
    if (buttonGroup) {
      // Just add the button group as a single element (includes all CTAs)
      contentElements.push(buttonGroup);
    }
  }
  const contentRow = [contentElements];

  // ---
  // Compose table
  const tableCells = [
    headerRow, // 1st row: header
    bgRow,     // 2nd row: image
    contentRow // 3rd row: text & CTA
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(block);
}
