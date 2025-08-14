/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Block header row as required
  const headerRow = ['Hero (hero28)'];

  // 2. Extract background image (must be dynamically referenced)
  let bgImg = '';
  const img = element.querySelector('img');
  if (img && img.src) {
    bgImg = img;
  }

  // 3. Extract content: headline, subheading, CTA (all inside the relevant container)
  // Use the div that holds the h1 and any possible CTA
  let contentCell = '';
  // Find the container with h1
  const h1 = element.querySelector('h1');
  if (h1) {
    // Use the closest parent div that contains the h1 and possible CTA
    const h1Container = h1.closest('div');
    if (h1Container && h1Container.contains(h1)) {
      contentCell = h1Container;
    } else {
      contentCell = h1;
    }
  }

  // 4. Compose table rows: header, background image, content
  const rows = [
    headerRow,
    [bgImg || ''],
    [contentCell || ''],
  ];

  // 5. Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
