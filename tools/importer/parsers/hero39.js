/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as required by block guidelines
  const headerRow = ['Hero (hero39)'];

  // 2. Find the background image (first img inside the first grid cell)
  // Defensive: Find any direct img descendant
  let bgImg = element.querySelector('img');
  // Only include image element itself as cell (not as link)
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Compose the content cell: heading, paragraph, button
  // The heading, paragraph, and button are all inside the 2nd grid cell (the second .w-layout-grid > div)
  // We'll gather the h1, paragraph, and the button-group (which contains the a)
  let gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  // Defensive: fallback if structure changes
  let contentDiv = gridDivs && gridDivs.length > 1 ? gridDivs[1] : null;
  let contentElements = [];
  if (contentDiv) {
    // Find the heading
    const h1 = contentDiv.querySelector('h1');
    if (h1) contentElements.push(h1);
    // Find the paragraph (could be in a flex container)
    const paragraph = contentDiv.querySelector('p');
    if (paragraph) contentElements.push(paragraph);
    // Find the call-to-action button (inside .button-group)
    const button = contentDiv.querySelector('.button-group a');
    if (button) contentElements.push(button);
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // 4. Build the table
  const tableCells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // 5. Replace original element
  element.replaceWith(block);
}
