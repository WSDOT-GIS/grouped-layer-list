import configs from "./config/main";

// function emitEvent(this: HTMLSelectElement, ev: Event) {
//   const option = this.selectedOptions[0];
//   const configName = option.value;
//   const config = (configs as any)[configName];
//   const { layers } = config;
//   const outEvent = new CustomEvent("configselect", { detail: layers });
//   this.dispatchEvent(outEvent);
// }

export function createConfigSelector() {
  const docFrag = document.createDocumentFragment();
  let option = document.createElement("option");
  option.text = "Select a config";
  option.selected = true;
  option.disabled = true;
  docFrag.appendChild(option);
  for (const configName in configs) {
    if (configs.hasOwnProperty(configName)) {
      const config = (configs as any)[configName];
      const title: string = config.pageTitle;
      option = document.createElement("option");
      option.value = configName;
      option.text = option.label = title || configName;
      docFrag.appendChild(option);
    }
  }
  const select = document.createElement("select");
  select.appendChild(docFrag);
  select.name = "config";

  const form = document.createElement("form");
  form.action = location.href;
  form.appendChild(select);
  form.classList.add("config-select");

  select.addEventListener("change", () => {
    form.submit();
  });

  return form;
}
