/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: create a fragment from a list of nodes
  function fragFromNodes(nodes) {
    const frag = document.createDocumentFragment();
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  }

  // Get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the two main columns
  const columns = Array.from(grid.children).filter((child) => child.tagName !== 'IMG');

  // Column 1: Textual content (eyebrow, heading, subheading)
  const textCol = columns.find((col) => col.querySelector('h2') || col.querySelector('h3'));
  // Column 2: Contact list (ul > li)
  const contactCol = columns.find((col) => col.tagName === 'UL');

  // --- Column 1: Textual content ---
  const textNodes = [];
  if (textCol) {
    // Eyebrow
    const eyebrow = textCol.querySelector('h2');
    if (eyebrow) textNodes.push(eyebrow);
    // Heading
    const heading = textCol.querySelector('h3');
    if (heading) textNodes.push(heading);
    // Subheading/paragraph
    const subheading = textCol.querySelector('p');
    if (subheading) textNodes.push(subheading);
  }

  // --- Column 2: Contact methods ---
  const contactNodes = [];
  if (contactCol) {
    const items = contactCol.querySelectorAll('li');
    items.forEach((li) => {
      // Each li: icon + label + detail
      const icon = li.querySelector('.icon-container');
      const label = li.querySelector('h4');
      // Detail: either a div or a link
      let detail = li.querySelector('div.utility-display-block, div:not(.icon-container):not([class*=heading])');
      if (!detail) detail = li.querySelector('a');
      // Compose mini card
      const miniFrag = document.createDocumentFragment();
      if (icon) miniFrag.appendChild(icon);
      if (label) miniFrag.appendChild(label);
      if (detail) miniFrag.appendChild(detail);
      contactNodes.push(miniFrag);
    });
  }

  // --- Image (full width below columns) ---
  const img = grid.querySelector('img');

  // Table header
  const headerRow = ['Columns (columns9)'];
  // Table columns row
  const columnsRow = [
    textNodes.length ? fragFromNodes(textNodes) : '',
    contactNodes.length ? fragFromNodes(contactNodes) : ''
  ];
  // Table image row (must match number of columns as columnsRow)
  let imageRow = null;
  if (img) {
    imageRow = [img, '']; // image in first cell, second cell empty for column match
  }

  // Build table
  const cells = [
    headerRow,
    columnsRow
  ];
  if (imageRow) {
    cells.push(imageRow);
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
