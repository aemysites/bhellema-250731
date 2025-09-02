/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Prepare the table header row
  const headerRow = ['Cards (cards19)'];

  // Select all direct child card containers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  const rows = cardDivs.map((cardDiv) => {
    // Find the icon SVG wrapped in .icon (use the whole .icon for fidelity)
    const iconContainer = cardDiv.querySelector('.icon');
    let iconCellContent = '';
    if (iconContainer) {
      // Place the field:image comment before the .icon node
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:image '));
      frag.appendChild(iconContainer);
      iconCellContent = frag;
    }
    // Find the text (p tag)
    const p = cardDiv.querySelector('p');
    let textCellContent = '';
    if (p) {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(' field:text '));
      frag.appendChild(p);
      textCellContent = frag;
    }
    return [iconCellContent || '', textCellContent || ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
