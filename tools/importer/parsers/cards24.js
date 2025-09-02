/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Cards (cards24)'];

  // Collect all card links (each represents a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Build each card row
  const rows = cardLinks.map((a) => {
    // Find image (mandatory)
    const imageWrapper = a.querySelector('.utility-aspect-2x3');
    const img = imageWrapper ? imageWrapper.querySelector('img') : null;
    let imageCell = '';
    if (img) {
      imageCell = document.createElement('div');
      imageCell.innerHTML = '<!-- field:image -->';
      imageCell.appendChild(img);
    } else {
      imageCell = '';
    }

    // Find text content: tag/date and heading
    const textElements = [];

    // Tag and date row (keeps inline as in screenshot)
    const tagDate = a.querySelector('.flex-horizontal');
    if (tagDate) {
      textElements.push(tagDate);
    }

    // Title (h3)
    const heading = a.querySelector('h3');
    if (heading) {
      textElements.push(heading);
    }

    let textCell;
    if (textElements.length > 0) {
      textCell = document.createElement('div');
      textCell.innerHTML = '<!-- field:text -->';
      textElements.forEach(el => textCell.appendChild(el));
    } else {
      textCell = '';
    }

    return [imageCell, textCell];
  });

  // Compose cells for table
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
