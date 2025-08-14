/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create Section Metadata Table for a Tab Panel: always use ['Tabs'] header
  function createTabPanelMeta(label) {
    return WebImporter.DOMUtils.createTable([
      ['Tabs'], // header row required
      ['component', 'tab-panel'],
      ['tab-label', label]
    ], document);
  }

  // Get all tab panel elements
  const tabPanels = Array.from(
    element.querySelectorAll('.w-tab-content > .w-tab-pane')
  );

  // Get all tab labels in order
  const tabLabels = Array.from(
    element.querySelectorAll('.w-tab-menu [role="tab"] > div')
  ).map(div => div.textContent.trim());

  // Defensive: match panels and labels
  const panels = [];
  for (let i = 0; i < tabPanels.length; i++) {
    const panel = tabPanels[i];
    const label = tabLabels[i] || `Tab ${i+1}`;
    // The content for the tab is the whole grid inside each pane
    const contentContainer = panel.querySelector(':scope > .w-layout-grid');
    // Clone the contentContainer so we don't remove content from the original DOM, and so we can append text nodes if needed
    let panelContent;
    if (contentContainer) {
      panelContent = contentContainer.cloneNode(true);
    } else {
      // fallback: just use panel itself if grid not found
      panelContent = panel.cloneNode(true);
    }
    // Make sure all direct text content in the pane is preserved (not just elements)
    // Gather any direct text nodes and append to the cloned grid
    Array.from(panel.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        panelContent.appendChild(document.createTextNode(node.textContent));
      }
    });
    panels.push({ label, content: panelContent });
  }

  // Build rows: header first
  const rows = [ ['Tabs'] ];

  panels.forEach((panel) => {
    // Each tab panel = content + Section Metadata Table
    rows.push([panel.content]);
    rows.push([createTabPanelMeta(panel.label)]);
    // ADD separator between tab panels for clarity, as per instructions (three dashes ---)
    rows.push(['---']);
  });
  // Remove trailing separator row if present
  if (rows[rows.length-1][0] === '---') {
    rows.pop();
  }
  // Create final block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
