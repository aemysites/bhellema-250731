/* global WebImporter */
export default function parse(element, { document }) {
  // Critical fix: Only the first (background) image should be in the second row with <!-- field:image -->; the card image must be included as content within the text cell under <!-- field:text -->

  // 1. Get main grid
  const mainGrid = element.querySelector('.grid-layout.desktop-1-column');
  if (!mainGrid) return;

  // 2. Get background image (first grid child)
  let bgImg = null;
  if (mainGrid.children[0]) {
    bgImg = mainGrid.children[0].querySelector('img');
  }

  // 3. Get the content area (second grid child)
  const content = mainGrid.children[1] || null;
  let cardGrid = null;
  if (content) {
    cardGrid = content.querySelector('.card-body .grid-layout');
  }

  // 4. Get card image, heading, list, and CTA
  let cardImg = null, heading = null, cta = null, detailPs = [];
  if (cardGrid) {
    cardImg = cardGrid.querySelector('img');
    heading = cardGrid.querySelector('h2');
    const flexVert = cardGrid.querySelector('.flex-vertical');
    if (flexVert) {
      flexVert.querySelectorAll('.flex-horizontal').forEach(row => {
        const p = row.querySelector('p');
        if (p) detailPs.push(p);
      });
    }
    const btnGroup = cardGrid.querySelector('.button-group');
    if (btnGroup) {
      cta = btnGroup.querySelector('a');
    }
  }

  // Header row
  const headerRow = ['Hero (hero12)'];

  // Row 2: background image only, field collapsing for alt
  let bgCell = '';
  if (bgImg) {
    const pic = document.createElement('picture');
    const img = bgImg.cloneNode(true);
    if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
    pic.appendChild(img);
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:image '));
    frag.appendChild(pic);
    bgCell = frag;
  }

  // Row 3: text cell, ALL content including the card image must be under <!-- field:text -->
  let textCell = '';
  if (heading || cardImg || detailPs.length || cta) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));
    // Card image (inside text field, as part of content)
    if (cardImg) {
      const pic2 = document.createElement('picture');
      const img2 = cardImg.cloneNode(true);
      if (!img2.hasAttribute('alt')) img2.setAttribute('alt', '');
      pic2.appendChild(img2);
      frag.appendChild(pic2);
    }
    // Heading
    if (heading) frag.appendChild(heading);
    // Details
    detailPs.forEach(p => frag.appendChild(p));
    // CTA
    if (cta) frag.appendChild(cta);
    textCell = frag;
  }

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [bgCell],
    [textCell],
  ], document);
  element.replaceWith(table);
}
