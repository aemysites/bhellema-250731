/* global WebImporter */
export default function parse(element, { document }) {
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) return;

  const tabLinks = Array.from(tabMenu.children).filter(e => e.matches('a,button,[role="tab"]'));
  const panes = Array.from(tabContent.children).filter(e => e.classList.contains('w-tab-pane'));

  const rows = [];
  const headerRow = ['Tabs'];
  rows.push(headerRow);

  for (let i = 0; i < tabLinks.length; i++) {
    const tabTitleEl = tabLinks[i];
    // Tab Title
    let tabTitle = '';
    const labelDiv = tabTitleEl.querySelector('.paragraph-lg, div');
    if (labelDiv) {
      tabTitle = labelDiv;
    } else {
      tabTitle = tabTitleEl;
    }
    // Tab Pane
    let tabPane = panes[i];
    const wantedTab = tabTitleEl.getAttribute('data-w-tab');
    if (wantedTab) {
      const matchPane = panes.find(
        p => p.getAttribute('data-w-tab') === wantedTab
      );
      if (matchPane) tabPane = matchPane;
    }
    let heading = '';
    let image = '';
    let content = '';
    if (tabPane) {
      let grid = tabPane.querySelector('.w-layout-grid, .grid-layout');
      if (!grid) grid = tabPane;
      heading = grid.querySelector('h1, h2, h3, h4, .h2-heading, .h1-heading');
      image = grid.querySelector('img');
      // Tab content should not be the same as heading
      const contentCandidates = Array.from(grid.childNodes).filter(
        n => n.nodeType === 1 && n !== heading && n !== image
      );
      // Only assign content if there is content not equal to heading
      if (contentCandidates.length > 0) {
        content = contentCandidates.length === 1 ? contentCandidates[0] : contentCandidates;
      } else {
        content = '';
      }
    }
    // Always output 4 columns per row for Tabs block
    rows.push([
      tabTitle || '',
      heading || '',
      image || '',
      content || ''
    ]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
