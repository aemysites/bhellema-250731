/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract text content from a container for the text cell
  function extractTextContent(container) {
    if (!container) return null;
    const parts = [];
    // Get heading
    const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) parts.push(heading);
    // Get paragraphs AFTER heading (if heading exists), else all ps
    let ps = [];
    if (heading) {
      let sibling = heading.nextElementSibling;
      while (sibling) {
        if (sibling.tagName.toLowerCase() === 'p') ps.push(sibling);
        sibling = sibling.nextElementSibling;
      }
    } else {
      ps = Array.from(container.querySelectorAll('p'));
    }
    parts.push(...ps);
    return parts.length ? parts : null;
  }

  // Collect all top-level card containers
  const cardContainers = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  rows.push(['Cards (cards25)']); // Block header row

  cardContainers.forEach(card => {
    // Style cell: always blank unless a variant is present, which we don't see here
    const style = '';
    // Image cell: use the direct child img or img inside the primary container
    const img = card.querySelector('img');
    // Text content cell: use the .utility-padding-all-2rem if present, else look for heading/ps in card
    let textContent = null;
    const pad = card.querySelector('.utility-padding-all-2rem');
    if (pad) {
      textContent = extractTextContent(pad);
    } else {
      textContent = extractTextContent(card);
    }
    // Each row must have 3 cells: [style, image, textContent]
    rows.push([
      style,
      img || '',
      (textContent && textContent.length) ? textContent : ''
    ]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
