/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block header as specified
  const headerRow = ['Cards (cards7)'];

  // Gather card rows
  const rows = [];

  // Get all immediate children (cards)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Each cardDiv should contain an image (mandatory)
    const img = cardDiv.querySelector('img');
    let imgCell = '';
    if (img) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(document.createComment(' field:image '));
      wrapper.appendChild(img);
      imgCell = wrapper;
    }
    // Second cell is always present and must be empty (no comment unless there's real content)
    const textCell = '';
    rows.push([imgCell, textCell]);
  });

  // Assemble cells for the createTable function
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
