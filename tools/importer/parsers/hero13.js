/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with field comment and content
  function fieldFragment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    frag.appendChild(content);
    return frag;
  }

  // --- 1. HEADER ROW ---
  const headerRow = ['Hero (hero13)'];

  // --- 2. IMAGE ROW ---
  // Find the background image
  let imageEl = null;
  // Look for the first .cover-image inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // First grid cell is the background image
    const img = gridDivs[0].querySelector('img.cover-image');
    if (img) {
      imageEl = document.createElement('picture');
      imageEl.appendChild(img);
    }
  }
  // Only add field comment for 'image' (not imageAlt)
  const imageRow = [imageEl ? fieldFragment('image', imageEl) : ''];

  // --- 3. TEXT ROW ---
  // Find the card body (contains heading, inset image, text, CTA)
  let textContentFrag = document.createDocumentFragment();
  // Card body
  let cardBody = null;
  if (gridDivs.length > 1) {
    cardBody = gridDivs[1].querySelector('.card-body');
  }
  if (cardBody) {
    // Find the inset image (the first .cover-image inside .card-body)
    const insetImg = cardBody.querySelector('img.cover-image');
    if (insetImg) {
      // Only add field comment for 'image' if not already used
      // But since model only has one image field, we skip field comment for inset image
      const pic = document.createElement('picture');
      pic.appendChild(insetImg);
      textContentFrag.appendChild(pic);
    }
    // Find heading
    const heading = cardBody.querySelector('h2');
    if (heading) {
      textContentFrag.appendChild(heading);
    }
    // Find all flex-horizontal blocks (icon + text)
    const flexBlocks = cardBody.querySelectorAll('.flex-horizontal');
    flexBlocks.forEach(block => {
      // Each block is an icon + paragraph
      const icon = block.querySelector('.icon-small');
      const para = block.querySelector('p');
      if (icon && para) {
        const div = document.createElement('div');
        div.appendChild(icon);
        div.appendChild(para);
        textContentFrag.appendChild(div);
      }
    });
    // Find CTA button
    const cta = cardBody.querySelector('.button-group a');
    if (cta) {
      textContentFrag.appendChild(cta);
    }
  }
  // Only add field comment for 'text' (not for heading, not for button text, not for alt)
  const textRow = [textContentFrag.childNodes.length ? fieldFragment('text', textContentFrag) : ''];

  // --- Assemble block ---
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
