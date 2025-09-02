/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row
  const headerRow = ['Cards (cards37)'];
  // Helper for field comments
  function fieldComment(name) {
    return document.createComment(` field:${name} `);
  }

  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the outer grid
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  const rows = [];
  // The children of mainGrid: first card (a), then nested grid
  const gridChildren = Array.from(mainGrid.children);

  // 1. First big card
  const firstCard = gridChildren.find((el) => el.matches('a.utility-link-content-block'));
  if (firstCard) {
    // IMAGE
    let imageCell = [];
    const imageWrapper = firstCard.querySelector('.utility-aspect-2x3');
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) {
        imageCell.push(fieldComment('image'));
        imageCell.push(img);
      }
    }
    // TEXT
    let textCell = [];
    const textBlock = firstCard.querySelector('.utility-padding-all-2rem');
    if (textBlock) {
      const heading = textBlock.querySelector('h3');
      const desc = textBlock.querySelector('p');
      const cta = textBlock.querySelector('.button');
      textCell.push(fieldComment('text'));
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      if (cta) textCell.push(cta);
    }
    rows.push([
      imageCell,
      textCell.length > 1 ? textCell : ['']
    ]);
  }

  // 2. Nested grid: remaining cards
  const nestedGrid = gridChildren.find((el) => el.classList.contains('grid-layout') && el !== mainGrid);
  if (nestedGrid) {
    const cards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
    cards.forEach((card) => {
      // IMAGE
      let imageCell = [];
      const aspect = card.querySelector('.utility-aspect-1x1, .utility-aspect-2x3');
      if (aspect) {
        const img = aspect.querySelector('img');
        if (img) {
          imageCell.push(fieldComment('image'));
          imageCell.push(img);
        } else {
          imageCell = [''];
        }
      } else {
        imageCell = [''];
      }
      // TEXT
      let textCell = [];
      const heading = card.querySelector('h3');
      const desc = card.querySelector('p');
      textCell.push(fieldComment('text'));
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push([
        imageCell,
        textCell.length > 1 ? textCell : ['']
      ]);
    });
  }

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
