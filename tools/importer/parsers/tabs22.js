/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure WebImporter and DOMUtils exist
  if (!window.WebImporter || !WebImporter.DOMUtils || !WebImporter.DOMUtils.createTable) {
    return;
  }

  // Header row as required
  const cells = [['Tabs']];

  // Find tab menu labels (usually <a> elements with text)
  // and tab panes with content
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // For each tab, grab label, heading, image, etc.
  for (let i = 0; i < Math.max(tabLinks.length, tabPanes.length); i++) {
    const tabLink = tabLinks[i];
    let tabLabel = '';
    if (tabLink) {
      // Defensive: Try to find the tab title (<div> inside the <a>)
      const labelDiv = tabLink.querySelector('div');
      tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    }

    // Build tab label cell with comment
    const tabLabelCell = [];
    if (tabLabel) {
      tabLabelCell.push(document.createComment(' field:title '));
      tabLabelCell.push(tabLabel);
    }

    // Build tab content cell (heading, image, etc)
    const contentCell = [];
    const tabPane = tabPanes[i];
    if (tabPane) {
      // Usually there's a single grid child containing the real content
      const grid = tabPane.querySelector('.w-layout-grid');
      if (grid) {
        // Try to locate heading (h3, h4, etc)
        let headingElem = grid.querySelector('h3,h4,h5,h6');
        if (headingElem) {
          contentCell.push(document.createComment(' field:content_heading '));
          contentCell.push(headingElem);
        }
        // Try to locate image
        let imageElem = grid.querySelector('img');
        if (imageElem) {
          contentCell.push(document.createComment(' field:content_image '));
          contentCell.push(imageElem);
        }
      }
    }

    // Each tab row: [label, content]
    cells.push([
      tabLabelCell.length ? tabLabelCell : '',
      contentCell.length ? contentCell : '',
    ]);
  }

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
