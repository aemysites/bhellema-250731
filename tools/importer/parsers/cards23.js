/* global WebImporter */
export default function parse(element, { document }) {
  function getVariant(card) {
    if (card.classList.contains('card-link') && card.classList.contains('secondary-card-link')) {
      return 'card, dark';
    }
    if (card.classList.contains('utility-link-content-block')) {
      return 'card';
    }
    return '';
  }

  function getImage(card) {
    const img = card.querySelector('img');
    return img || '';
  }

  function getRichText(card) {
    // Collect all text content except images
    const texts = [];
    // For standard cards
    const h3 = card.querySelector('h3');
    if (h3) {
      const h3clone = h3.cloneNode(true);
      texts.push(h3clone);
    }
    // Find all paragraph-sm under card
    const descs = card.querySelectorAll('div.paragraph-sm');
    descs.forEach((desc, i) => {
      if (texts.length > 0) {
        texts.push(document.createElement('br'));
      }
      texts.push(desc.cloneNode(true));
    });
    // For secondary card (with flex-horizontal container), also extract from nested .utility-text-align-center
    if (texts.length === 0) {
      const altH3 = card.querySelector('.utility-text-align-center h3');
      if (altH3) {
        texts.push(altH3.cloneNode(true));
      }
      const altDesc = card.querySelector('.utility-text-align-center .paragraph-sm');
      if (altDesc) {
        if (texts.length > 0) {
          texts.push(document.createElement('br'));
        }
        texts.push(altDesc.cloneNode(true));
      }
    }
    return texts.length > 0 ? texts : '';
  }

  const tabPanes = element.querySelectorAll(':scope > .w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Select all direct card links (both variants, as structure differs)
    const cards = Array.from(grid.querySelectorAll('a.utility-link-content-block, a.card-link'));
    const rows = [['Cards (cards23)']];
    cards.forEach((card) => {
      const variant = getVariant(card);
      const image = getImage(card);
      const richText = getRichText(card);
      rows.push([
        variant,
        image,
        richText
      ]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    tabPane.replaceWith(table);
  });
}
