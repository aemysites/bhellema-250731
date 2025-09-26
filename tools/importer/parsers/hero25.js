/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a fragment with field comment and content
  function fieldFragment(fieldName, content) {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${fieldName} `));
    frag.appendChild(content);
    return frag;
  }

  // The main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the video embed (row 2)
  let embedDiv = null;
  let iframe = null;
  for (const div of grid.children) {
    const foundIframe = div.querySelector('iframe');
    if (foundIframe) {
      embedDiv = div;
      iframe = foundIframe;
      break;
    }
  }

  // Compose row 2: image (embed)
  let imageCellContent = null;
  if (embedDiv && iframe) {
    // Replace iframe with a link to its src
    const link = document.createElement('a');
    link.href = iframe.src;
    link.textContent = 'View video';
    // Remove the iframe from the embedDiv
    iframe.remove();
    // Optionally, remove any empty wrappers left by removing the iframe
    // Append the link to the embedDiv
    embedDiv.appendChild(link);
    imageCellContent = fieldFragment('image', embedDiv);
  }

  // Find the main heading (row 3)
  let headingDiv = null;
  for (const div of grid.children) {
    if (div.classList.contains('h1-heading')) {
      headingDiv = div;
      break;
    }
  }

  // Find the subheading/paragraph (row 3)
  let subheadingDiv = null;
  for (const div of grid.children) {
    if (div.querySelector('p')) {
      subheadingDiv = div;
      break;
    }
  }

  // Find the button group (row 3)
  let buttonDiv = null;
  for (const div of grid.children) {
    if (div.classList.contains('button-group')) {
      buttonDiv = div;
      break;
    }
  }

  // Compose row 3: text (headline, subheading, buttons)
  const textFrag = document.createDocumentFragment();
  if (headingDiv) textFrag.appendChild(headingDiv);
  if (subheadingDiv) textFrag.appendChild(subheadingDiv);
  if (buttonDiv) textFrag.appendChild(buttonDiv);
  let textCellContent = null;
  if (textFrag.childNodes.length) {
    textCellContent = fieldFragment('text', textFrag);
  }

  // Assemble the table
  const rows = [
    ['Hero (hero25)'],
    [imageCellContent],
    [textCellContent],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
