/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure WebImporter helper exists
  if (!WebImporter || !WebImporter.DOMUtils || !WebImporter.DOMUtils.createTable) return;

  // Header row with block name
  const headerRow = ['Hero (hero6)'];

  // ---
  // 1st content row: Background Image (optional)
  // ---
  // Find background image (img tag with cover-image class)
  let bgImg = element.querySelector('img.cover-image');
  let bgRow = [bgImg ? bgImg : ''];

  // ---
  // 2nd content row: Headline, Subheading, CTA in one cell
  // ---
  // Find heading (h1), subheading (p.subheading), and CTA buttons (inside .button-group)
  let card = element.querySelector('.card');
  let contentCellItems = [];
  if (card) {
    // Heading
    let heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCellItems.push(heading);
    // Subheading
    let subheading = card.querySelector('p, .subheading');
    if (subheading) contentCellItems.push(subheading);
    // CTA(s)
    let buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Add all buttons/links inside button group
      contentCellItems.push(...buttonGroup.children);
    }
  }
  // Fallback: If card not found, scan all
  if (!card) {
    let heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCellItems.push(heading);
    let subheading = element.querySelector('p, .subheading');
    if (subheading) contentCellItems.push(subheading);
    let buttonGroup = element.querySelector('.button-group');
    if (buttonGroup) {
      contentCellItems.push(...buttonGroup.children);
    }
  }
  // Remove empty text nodes
  contentCellItems = contentCellItems.filter(Boolean);
  let contentRow = [contentCellItems];

  // Compose table rows
  const rows = [headerRow, bgRow, contentRow];
  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
