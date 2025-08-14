/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each contains a grid of cards)
  const panes = element.querySelectorAll('[class*="w-tab-pane"]');

  panes.forEach((pane) => {
    // Find the grid in each tab pane
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an 'a.utility-link-content-block' or 'a.card-link'
    const cards = Array.from(grid.children).filter((child) =>
      child.tagName === 'A' || child.tagName === 'a'
    );
    cards.forEach((card) => {
      // Image (first cell)
      let img = card.querySelector('img');
      if (!img) {
        // Some cards have no image, set to empty string
        img = '';
      }
      // Text Content (second cell)
      // Prefer h3 for headline, then paragraph for description
      let title = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      rows.push([img, textCell]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
