import Portal from "esri/arcgis/Portal";

const wsdotAgolOrgId = "IYrj3otxNjPsrTRD";

/**
 * Queries ArcGIS online for WSDOT webmaps.
 */
async function getWebMaps() {
  const portal = new Portal.Portal("https://www.arcgis.com");
  const queryResults = await portal.queryItems({
    num: 100,
    q: `orgid:${wsdotAgolOrgId} AND type:("Web Map" NOT "Application") AND tags:"geoportal"`
  });
  const { results } = queryResults as Portal.PortalQueryResult;
  return results as Portal.PortalItem[];
}

/**
 * Creates a form from which a user can reload the application with a different webmap.
 */
export function createWebmapIdForm() {
  const queryPomise = getWebMaps();

  const form = document.createElement("form");
  form.action = ".";
  form.classList.add("webmapForm");

  const input = document.createElement("input");
  input.name = "webmap";
  input.id = "webmapInput";
  input.type = "text";
  input.required = true;
  input.placeholder = "ArcGIS webmap id";
  input.title = "value must be hexadecimal webmap ID";
  input.pattern = /^[a-f0-9]+$/.source;

  const datalist = document.createElement("datalist");
  datalist.id = "webmapList";

  input.setAttribute("list", datalist.id);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "change map";

  form.appendChild(input);
  form.appendChild(datalist);
  form.appendChild(button);

  queryPomise.then(
    results => {
      results.forEach(pi => {
        const option = document.createElement("option");
        option.textContent = option.value = pi.id;
        option.label = pi.title;
        datalist.appendChild(option);
      });
    },
    error => {
      console.error("AGOL query error", error);
      const customEvent = new CustomEvent("webmapqueryerror", {
        detail: { error }
      });
      form.dispatchEvent(customEvent);
    }
  );

  return form;
}