/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the background image
  let imageEl = null;
  const img = element.querySelector('img.cover-image');
  if (img && img.src) imageEl = img;

  // 2. Extract main heading
  let headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');

  // 3. Extract subheading/paragraph
  let paraEl = element.querySelector('p');

  // 4. Extract call-to-action (CTA)
  let ctaEl = null;
  // Prefer button inside .button-group, fallback to .button or .w-button
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    ctaEl = buttonGroup.querySelector('a.button, a.w-button');
  }
  if (!ctaEl) ctaEl = element.querySelector('a.button, a.w-button');

  // Compose the content cell: heading, para, cta (in order, in a div)
  const contentCell = document.createElement('div');
  if (headingEl) contentCell.appendChild(headingEl);
  if (paraEl) contentCell.appendChild(paraEl);
  if (ctaEl) contentCell.appendChild(ctaEl);

  // Compose table rows as per requirements
  const headerRow = ['Hero (hero39)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
