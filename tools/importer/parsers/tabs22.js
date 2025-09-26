/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with field comment and content
  function fieldFragment(field, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${field} `));
    frag.appendChild(content);
    return frag;
  }

  // Get tab headers and content panels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a, [role="tab"]')) : [];
  const tabContents = element.querySelector('.w-tab-content');
  const tabPanes = tabContents ? Array.from(tabContents.children) : [];

  // Build rows: header row, then one row per tab
  const rows = [];
  rows.push(['Tabs (tabs22)']);

  for (let i = 0; i < tabLinks.length; i++) {
    const tabLink = tabLinks[i];
    const tabTitleText = tabLink.textContent.trim();
    // Find corresponding tab pane by index (assuming order matches)
    const tabPane = tabPanes[i];
    if (!tabPane) continue;

    // Find heading (h3/h4/h5/h6) and image inside the tab pane
    let headingEl = tabPane.querySelector('h3,h4,h5,h6');
    let headingType = headingEl ? headingEl.tagName.toLowerCase() : '';
    let imageEl = tabPane.querySelector('img');

    // Build tab title cell (with field comment)
    const tabTitleCell = fieldFragment('title', document.createTextNode(tabTitleText));

    // Build tab content cell (with field comments for each field)
    const tabContentFrag = document.createDocumentFragment();
    if (headingEl) {
      tabContentFrag.appendChild(document.createComment(' field:content_heading '));
      tabContentFrag.appendChild(headingEl);
      if (headingType) {
        tabContentFrag.appendChild(document.createComment(' field:content_headingType '));
      }
    }
    if (imageEl) {
      tabContentFrag.appendChild(document.createComment(' field:content_image '));
      tabContentFrag.appendChild(imageEl);
    }
    // There is no richtext in this example, but if there were, add it here
    // const richtext = ...
    // if (richtext) {
    //   tabContentFrag.appendChild(document.createComment(' field:content_richtext '));
    //   tabContentFrag.appendChild(richtext);
    // }

    rows.push([tabTitleCell, tabContentFrag]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
