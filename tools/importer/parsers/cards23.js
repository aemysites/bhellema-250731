/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info
  function extractCardInfo(cardEl) {
    let styleCell = '';
    let imageCell = '';
    let textCell = '';

    // Find image
    const img = cardEl.querySelector('img');
    if (img) {
      imageCell = img;
    }

    // Find title (h3) and description (div with class paragraph-sm)
    let title, desc;
    // Some cards are nested in .utility-text-align-center, others not
    const textScope = cardEl.querySelector('.utility-text-align-center') || cardEl;
    title = textScope.querySelector('h3');
    desc = textScope.querySelector('.paragraph-sm');

    // Combine title and description in text cell
    const textFragments = [];
    if (title) textFragments.push(title);
    if (desc) textFragments.push(desc);
    if (textFragments.length) {
      textCell = textFragments;
    }

    // Always return exactly 3 cells
    return [styleCell, imageCell, textCell];
  }

  // Find all tab panes (blocks of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find the grid containing card links
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Only process direct children that are <a>
    const cards = Array.from(grid.children).filter((el) => el.tagName === 'A');
    if (!cards.length) return;

    // Start table data: header row
    const tableRows = [ ['Cards (cards23)'] ];
    
    cards.forEach((cardEl) => {
      const cardRow = extractCardInfo(cardEl);
      // Ensure exactly 3 cells
      if (cardRow.length > 3) cardRow.length = 3;
      while (cardRow.length < 3) cardRow.push('');
      tableRows.push(cardRow);
    });

    const block = WebImporter.DOMUtils.createTable(tableRows, document);
    // Replace the grid with the block table
    grid.replaceWith(block);
  });
}
