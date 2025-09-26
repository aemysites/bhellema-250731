/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must use target block name exactly)
  const headerRow = ['Hero (hero40)'];

  // --- Row 2: Background Image ---
  // Find the first image in the hero block
  const img = element.querySelector('img');
  let imageCell = null;
  if (img) {
    // Reference the existing image element, add field comment before
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:image '));
    frag.appendChild(img);
    imageCell = frag;
  }

  // --- Row 3: Text Content ---
  // Find heading, paragraph, and CTA button
  const frag = document.createDocumentFragment();
  const h1 = element.querySelector('h1');
  if (h1) frag.appendChild(h1);
  const p = element.querySelector('p');
  if (p) frag.appendChild(p);
  const cta = element.querySelector('a');
  if (cta) frag.appendChild(cta);
  let textCell = null;
  if (frag.childNodes.length > 0) {
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    textFrag.appendChild(frag);
    textCell = textFrag;
  }

  // Build table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
