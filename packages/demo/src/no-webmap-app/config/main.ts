import airport from "./airport.json";
import config from "./config.json";
import crmp from "./crmp.json";
import fishPassageBarriers from "./fish-passage-barriers.json";
import functionalClass from "./FunctionalClass.json";
import traffic from "./traffic.json";

const output = {
  airport,
  config,
  crmp,
  fishPassageBarriers,
  functionalClass,
  traffic
};

export default output;

export function getConfigLayers(configName: string) {
  return (output as any)[configName];
}
