/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards24)'];

  // Select each card anchor directly under the grid div
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build up the rows for the Cards block
  const rows = cards.map(card => {
    // IMAGE
    // Always use the actual <img> element, not a clone
    const imageWrapper = card.querySelector('.utility-aspect-2x3');
    const img = imageWrapper ? imageWrapper.querySelector('img') : null;

    // TEXT CELL
    // Tag and date (horizontal flex)
    const labelRow = card.querySelector('.flex-horizontal');
    // Heading (could be h3 or with a special class)
    const heading = card.querySelector('h3, .h4-heading');
    // Compose the text cell (in block order):
    // - tag/date row (as element)
    // - heading (as element)
    const textCell = [];
    if (labelRow) textCell.push(labelRow);
    if (heading) textCell.push(heading);
    // Each row is [img, [labelRow, heading]]
    return [img, textCell];
  });

  // Table content: header row, then each card row
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
