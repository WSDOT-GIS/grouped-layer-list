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
 * @param inputType Specify "select" (default) to use a select element or "input" to use an input element with a datalist of options.
 * @returns a form with controls that allows the user to change the webmap.
 */
export function createWebmapIdForm(inputType: "select" | "input" = "select") {
  const queryPomise = getWebMaps();

  const form = document.createElement("form");
  form.action = ".";
  form.classList.add("webmapForm");

  const progress = document.createElement("progress");
  form.appendChild(progress);

  let select: HTMLSelectElement | undefined;
  let input: HTMLInputElement | undefined;
  let datalist: HTMLDataListElement | undefined;

  if (inputType === "select") {
    select = document.createElement("select");
    select.disabled = true;
    select.innerHTML = "<option disabled selected>change map</option>";
    select.name = "webmap";
    form.appendChild(select);
  } else {
    input = document.createElement("input");
    input.name = "webmap";
    input.id = "webmapInput";
    input.type = "text";
    input.required = true;
    input.placeholder = "ArcGIS webmap id";
    input.title = "value must be hexadecimal webmap ID";
    input.pattern = /^[a-f0-9]+$/.source;

    datalist = document.createElement("datalist");
    datalist.id = "webmapList";

    form.appendChild(input);
    form.appendChild(datalist);

    input.setAttribute("list", datalist.id);
  }

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "change map";
  form.appendChild(button);

  queryPomise.then(
    results => {
      (select || input)!.disabled = false;
      results.forEach(pi => {
        const option = document.createElement("option");
        option.value = pi.id;
        option.textContent = option.label = pi.title;
        (select || datalist)!.appendChild(option);
      });
      form.removeChild(progress);
    },
    error => {
      console.error("AGOL query error", error);
      const customEvent = new CustomEvent("webmapqueryerror", {
        detail: { error }
      });
      form.dispatchEvent(customEvent);
      form.removeChild(progress);
    }
  );

  return form;
}
