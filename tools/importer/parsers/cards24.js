/* global WebImporter */
export default function parse(element, { document }) {
  // Get all anchor card elements directly under the grid
  const cardEls = element.querySelectorAll(':scope > a.utility-link-content-block');

  // Header row as specified in the block description
  const rows = [ ['Cards (cards24)'] ];

  // Iterate through each card and extract required content
  cardEls.forEach(card => {
    // --- Column 1: Style (blank, as no variant classes are present) ---
    const cellStyle = '';

    // --- Column 2: Image or Icon ---
    // Find the image inside the aspect-ratio wrapper
    let imgCell = '';
    const imgWrapper = card.querySelector(':scope > div.utility-aspect-2x3');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) imgCell = img;
    }

    // --- Column 3: Text content ---
    const metaDiv = card.querySelector(':scope > div.flex-horizontal');
    const heading = card.querySelector(':scope > h3');
    // Compose content: Tag, date, heading
    const textCell = document.createElement('div');
    if (metaDiv) {
      // Clone children of metaDiv (tag and date)
      Array.from(metaDiv.children).forEach(child => {
        textCell.appendChild(child.cloneNode(true));
      });
    }
    if (heading) {
      // Add heading (card title)
      const title = heading.cloneNode(true);
      textCell.appendChild(title);
    }
    // Description and CTA are not present in this HTML, so skip

    // Push the row [style, image, text]
    rows.push([cellStyle, imgCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
