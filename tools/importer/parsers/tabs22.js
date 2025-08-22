/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must always be the block name
  const headerRow = ['Tabs'];
  const cells = [headerRow];

  // Get all immediate children of the top-level element
  const children = element.querySelectorAll(':scope > div');
  if (children.length < 2) {
    // Not enough structure to form tabs block
    return;
  }

  // The first child is the tab menu (tab labels)
  const tabMenu = children[0];
  // The second child is the tab content container
  const tabContents = children[1];

  // Get all tab labels (titles)
  const tabLinks = tabMenu.querySelectorAll('.w-tab-link');
  // Get all tab panels
  const tabPanes = tabContents.querySelectorAll('.w-tab-pane');

  const numTabs = Math.min(tabLinks.length, tabPanes.length);

  for (let i = 0; i < numTabs; i++) {
    const link = tabLinks[i];
    // Tab title (always present)
    let tabTitle = '';
    const titleDiv = link.querySelector('div');
    if (titleDiv) {
      tabTitle = titleDiv;
    } else {
      tabTitle = link.textContent.trim();
    }

    const tabPane = tabPanes[i];
    let tabHeading = null;
    let tabImage = null;
    let tabContent = null;

    const grid = tabPane.querySelector('.grid-layout');
    if (grid) {
      tabHeading = grid.querySelector('h2,h3,h4');
      tabImage = grid.querySelector('img');
      // Tab content: only if a non-heading, non-image node exists
      const contentNodes = Array.from(grid.childNodes).filter(node =>
        !(node === tabHeading || node === tabImage) &&
        (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim()))
      );
      if (contentNodes.length) {
        tabContent = contentNodes;
      }
    }

    // Always create 4 columns (even if 4th is empty)
    const row = [
      tabTitle,
      tabHeading || '',
      tabImage || '',
      tabContent || ''
    ];
    cells.push(row);
  }

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
