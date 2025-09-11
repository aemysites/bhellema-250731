/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Hero (hero6)
  const headerRow = ['Hero (hero6)'];

  // --- Find the background image ---
  let imageCell = '';
  const imageDiv = element.querySelector('.utility-min-height-100dvh');
  if (imageDiv) {
    const img = imageDiv.querySelector('img');
    if (img) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = '<!-- field:image -->';
      const picture = document.createElement('picture');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      picture.appendChild(newImg);
      wrapper.appendChild(picture);
      imageCell = wrapper;
    }
  }
  const imageRow = [imageCell ? imageCell : ''];

  // --- Find text, subheading, and buttons ---
  let textCellContent = [];
  const textCard = element.querySelector('.card.utility-backdrop-filter-blur');
  if (textCard) {
    // Title
    const h1 = textCard.querySelector('h1');
    if (h1) textCellContent.push(h1);
    // Subheading (paragraph)
    const subheading = textCard.querySelector('p');
    if (subheading) textCellContent.push(subheading);
    // Buttons
    const buttonGroup = textCard.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) textCellContent.push(...buttons);
    }
  }

  let textRowCell;
  if (textCellContent.length > 0) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = '<!-- field:text -->';
    textCellContent.forEach((el) => wrapper.appendChild(el));
    textRowCell = wrapper;
  } else {
    textRowCell = '';
  }
  const textRow = [textRowCell];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  // Replace element with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
