/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find tabs menu and pane container
  const tabMenu = element.querySelector('[role="tablist"]');
  const tabContentWrap = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContentWrap) return;

  // Extract tab labels (in order)
  const tabLinks = Array.from(tabMenu.children);
  const tabLabels = tabLinks.map(link => {
    // Try to find the label text from the direct child div if present
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Extract tabs content panes (order should match tabLinks)
  const tabPanes = Array.from(tabContentWrap.children);

  // Construct the table rows
  const headerRow = ['Tabs'];
  const rows = [headerRow];

  // For each tab, build [label, content] row
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    if (!pane) continue;

    // Defensive: Get the grid containing the content (should be 1st child)
    let contentGrid = pane.querySelector('.w-layout-grid, .grid-layout');
    if (!contentGrid) {
      // fallback to pane itself
      contentGrid = pane;
    }

    // Find content elements (heading, image, etc)
    const contentNodes = [];

    // Find Heading (h3, h2 or similar)
    const heading = contentGrid.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      // Insert field comment and then heading
      contentNodes.push(document.createComment(' field:found_heading '));
      contentNodes.push(heading);
    }
    // Find Image
    const img = contentGrid.querySelector('img');
    if (img) {
      contentNodes.push(document.createComment(' field:found_image '));
      contentNodes.push(img);
    }
    // Any other rich text (paragraphs etc)? None in example, but could add:
    // const paragraphs = contentGrid.querySelectorAll('p');
    // paragraphs.forEach(p => {
    //   contentNodes.push(document.createComment(' field:found_richtext '));
    //   contentNodes.push(p);
    // });

    // Defensive: If nothing found, add the entire grid
    if (contentNodes.length === 0) {
      contentNodes.push(contentGrid);
    }

    // Build the row: [label, [contents...]]
    rows.push([
      label,
      contentNodes
    ]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
