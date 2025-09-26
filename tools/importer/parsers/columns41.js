/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid (contains heading, quote, and lower grid)
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get the top row: heading and quote
  const heading = mainGrid.querySelector('p.h2-heading');
  const quote = mainGrid.querySelector('p.paragraph-lg');

  // Get the nested grid for the lower row (divider, avatar/name/title, logo)
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.grid-gap-sm.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  let divider = null;
  let avatarBlock = null;
  let logoBlock = null;
  if (nestedGrid) {
    const nestedDivs = nestedGrid.querySelectorAll(':scope > div');
    divider = nestedDivs[0];
    avatarBlock = nestedDivs[1];
    logoBlock = nestedDivs[2];
  }

  // Compose the first content row (heading | quote)
  const row1 = [
    heading ? heading : '',
    quote ? quote : ''
  ];

  // Compose the second content row (avatar/name/title | logo)
  // The avatarBlock contains the avatar image and the name/title block
  let leftCell = '';
  if (avatarBlock) {
    leftCell = avatarBlock;
  }
  let rightCell = '';
  if (logoBlock) {
    rightCell = logoBlock;
  }
  const row2 = [leftCell, rightCell];

  // Build the table: header, then two content rows
  const table = WebImporter.DOMUtils.createTable([
    ['Columns'],
    row1,
    row2
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
