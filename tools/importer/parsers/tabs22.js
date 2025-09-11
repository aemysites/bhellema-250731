/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get direct children matching selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the tab menu and tab content
  const tabMenu = Array.from(element.children).find(
    el => el.classList.contains('w-tab-menu')
  );
  const tabContent = Array.from(element.children).find(
    el => el.classList.contains('w-tab-content')
  );
  if (!tabMenu || !tabContent) return;

  // Get tab labels and content panes
  const tabLinks = getDirectChildren(tabMenu, 'a');
  const tabPanes = getDirectChildren(tabContent, 'div.w-tab-pane');

  // Always use 'Tabs' as the header row per spec
  const headerRow = ['Tabs'];

  // Build each tab row
  const rows = tabLinks.map((tabLink, i) => {
    // Tab Title
    const labelDiv = tabLink.querySelector('div');
    const tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    const labelCell = document.createElement('div');
    labelCell.innerHTML = `<!-- field:title -->${tabLabel}`;

    // Tab Content cell
    const tabPane = tabPanes[i];
    const contentCell = document.createElement('div');
    if (tabPane) {
      // Extract content
      const grid = tabPane.querySelector('.w-layout-grid');
      if (grid) {
        // Heading
        const heading = grid.querySelector('h3, h4, h5, h6');
        if (heading) {
          contentCell.innerHTML += `<!-- field:content_heading -->${heading.outerHTML}`;
        }
        // Image
        const img = grid.querySelector('img');
        if (img) {
          contentCell.innerHTML += img.outerHTML;
        }
        // Any additional richtext nodes
        const additionalNodes = Array.from(grid.children).filter(n => {
          if (heading && n.isSameNode(heading)) return false;
          if (img && n.isSameNode(img)) return false;
          return true;
        });
        additionalNodes.forEach(node => {
          if (node.textContent.trim()) {
            contentCell.innerHTML += `<!-- field:content_richtext -->${node.outerHTML}`;
          }
        });
      }
    }
    return [labelCell, contentCell];
  });

  // Compose table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
