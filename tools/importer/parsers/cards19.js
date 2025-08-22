/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards19)'];

  // Collect the immediate card elements (each child div is a card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for each card
  const rows = cardDivs.map((cardDiv) => {
    // Find icon or image (in div.icon)
    let iconOrImage = '';
    const iconWrapper = cardDiv.querySelector('div.icon');
    if (iconWrapper) {
      iconOrImage = iconWrapper;
    } else {
      const img = cardDiv.querySelector('img');
      if (img) iconOrImage = img;
    }

    // Find text content (the paragraph)
    let textContent = '';
    const para = cardDiv.querySelector('p');
    if (para) textContent = para;
    else {
      const fallbackText = Array.from(cardDiv.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );
      if (fallbackText) {
        const span = document.createElement('span');
        span.textContent = fallbackText.textContent.trim();
        textContent = span;
      }
    }

    // Always three cells: [style, icon/image, text]
    return [
      '',                // Style cell - left blank
      iconOrImage,       // Icon/Image cell
      textContent        // Text cell
    ];
  });

  // Construct the block table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}
