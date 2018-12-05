/**
 * Dumps a list of webmap items and data to standard out.
 * @argument [groupId] - ArcGIS Online / Portal group ID
 */

// Adds browser style Fetch API to Node.
require("isomorphic-fetch");

/**
 * Constructs item URL from itemID.
 * @param {string} itemId
 * @returns {string}
 */
function getItemUrl(itemId) {
  return `https://www.arcgis.com/sharing/rest/content/items/${itemId}/data?f=json`;
}

/**
 * Gets data associated with an item
 * @param {Object} item - AGOL item
 */
async function getItemData(item) {
  const { id } = item;
  const dataUrl = getItemUrl(id);
  const itemResponse = await fetch(dataUrl);
  const itemData = await itemResponse.json();
  return { item, itemData };
}

/**
 * Gets webmaps in a group.
 * @param {string} groupId Group ID
 */
async function getWebmaps(groupId) {
  const url = `https://www.arcgis.com/sharing/rest/content/groups/${groupId}?f=json&num=100`;
  const response = await fetch(url);
  const groups = await response.json();
  const { items } = groups;
  const output = items.map(getItemData);
  return await Promise.all(output);
}

(async () => {
  // Set default group ID if one not provided as argument.
  let geoportalGroupId = "4420606812de4ca8a1ba1ab70b6e4e48";
  // Get group ID argument if provided, overwriting default.
  if (process.argv && process.argv.length >= 3) {
    [, , geoportalGroupId] = process.argv;
  }
  // Get the webmap objects.
  const webmaps = await getWebmaps(geoportalGroupId);
  // Write as JSON to stdout
  process.stdout.write(JSON.stringify(webmaps, undefined, 2));
})();
