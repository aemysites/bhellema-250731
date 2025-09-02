/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero12)'];

  // --- 1st cell: background image (with field comment) ---
  let imageCell = '';
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const bgImgCandidate = gridDivs[0].querySelector('img');
    if (bgImgCandidate) {
      const imageDiv = document.createElement('div');
      imageDiv.insertAdjacentHTML('beforeend', '<!-- field:image -->');
      imageDiv.appendChild(bgImgCandidate.cloneNode(true));
      imageCell = imageDiv;
    }
  }

  // --- 2nd cell: text content (with field comment ONLY if not empty) ---
  let textCell = '';
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    const cardGrid = contentDiv.querySelector('.card-body .grid-layout');
    if (cardGrid) {
      // Find the side image (concert crowd)
      const leftImg = cardGrid.querySelector('img');
      // Find the block with h2 (heading and subcontent)
      let textBlock = Array.from(cardGrid.children).find(c => c.querySelector && c.querySelector('h2'));
      const textWrap = document.createElement('div');
      let hasContent = false;
      // Side image in text cell
      if (leftImg) {
        textWrap.appendChild(leftImg.cloneNode(true));
        hasContent = true;
      }
      if (textBlock) {
        // Heading
        const heading = textBlock.querySelector('h2');
        if (heading) {
          textWrap.appendChild(heading.cloneNode(true));
          hasContent = true;
        }
        // Features (bullets)
        const vertical = textBlock.querySelector('.flex-vertical');
        if (vertical) {
          vertical.querySelectorAll('.flex-horizontal').forEach(fh => {
            const p = fh.querySelector('p');
            if (p) {
              textWrap.appendChild(p.cloneNode(true));
              hasContent = true;
            }
          });
          // Dividers for visual separation
          vertical.querySelectorAll('.divider').forEach(divider => {
            textWrap.appendChild(divider.cloneNode(true));
            hasContent = true;
          });
        }
        // Call-to-action button
        const cta = textBlock.querySelector('.button-group a');
        if (cta) {
          textWrap.appendChild(cta.cloneNode(true));
          hasContent = true;
        }
      }
      if (hasContent) {
        textWrap.insertAdjacentHTML('afterbegin', '<!-- field:text -->');
        textCell = textWrap;
      }
    }
  }

  // Build table rows
  const cells = [
    headerRow,
    [imageCell],
    [textCell],
  ];
  // Replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
