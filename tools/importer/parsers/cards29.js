/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;
  // Always use the correct header row
  const headerRow = ['Cards (cards29)'];
  const rows = [];

  // Each direct child div is a card container
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // For this HTML, ensure image cell, and NO second cell (no unnecessary empty columns)
    rows.push([img]);
  });

  // Replace even if rows is empty, to guarantee modification
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
