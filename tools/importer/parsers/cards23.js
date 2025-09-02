/* global WebImporter */
export default function parse(element, { document }) {
  // The element is the tabs content block, only process the active tab
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  const activeTab = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activeTab) return;

  const grid = activeTab.querySelector('.w-layout-grid');
  if (!grid) return;

  // Only direct children <a> are cards
  const cards = Array.from(grid.children).filter(child => child.tagName === 'A');

  cards.forEach(card => {
    let imageCell = '';
    let textCell = '';

    // Find image (mandatory for image cell), cell can be empty if missing
    let imgEl = card.querySelector('img.cover-image');
    if (imgEl) {
      // field:image comment
      const imgComment = document.createComment(' field:image ');
      imageCell = [imgComment, imgEl];
    } else {
      imageCell = '';
    }

    // Find all text content, not just heading and description
    // Instead of using selectors, include all text nodes and elements that are visually rendered in the card
    // Remove any image element from the clone
    const cardClone = card.cloneNode(true);
    // Remove all img tags from clone to avoid duplicating in text cell
    Array.from(cardClone.querySelectorAll('img.cover-image')).forEach(img => img.remove());
    // field:text comment
    if (cardClone.textContent.trim()) {
      const textComment = document.createComment(' field:text ');
      // Wrap all content for text cell in a div
      const textDiv = document.createElement('div');
      textDiv.appendChild(textComment);
      // Append heading and paragraphs (preserving order)
      Array.from(cardClone.children).forEach(child => {
        if (
          child.classList.contains('h4-heading') ||
          child.classList.contains('paragraph-sm') ||
          child.classList.contains('flex-horizontal') ||
          child.classList.contains('utility-text-align-center')
        ) {
          textDiv.appendChild(child);
        }
      });
      // If nothing found by classes, just append all textContent
      if (!textDiv.querySelector('.h4-heading') && !textDiv.querySelector('.paragraph-sm')) {
        textDiv.appendChild(document.createTextNode(cardClone.textContent.trim()));
      }
      textCell = textDiv;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
