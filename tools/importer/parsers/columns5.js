/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns: left content and right image
  // The outer grid div contains one child div (content) and one img
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  let leftDiv = null;
  let rightImg = null;

  // Find left column: div with section and heading
  leftDiv = grid.querySelector('.section');

  // Find right column: image
  rightImg = grid.querySelector('img');

  // If either is missing, handle edge case by leaving cell empty
  // Table header
  const headerRow = ['Columns (columns5)'];

  // Table row: left = full content block, right = image
  const tableRow = [leftDiv || '', rightImg || ''];

  // Build table
  const cells = [headerRow, tableRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
