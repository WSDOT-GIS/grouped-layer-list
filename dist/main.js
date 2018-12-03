define(["esri/config","esri/arcgis/utils","esri/dijit/HomeButton","esri/geometry/Extent","esri/geometry/webMercatorUtils","esri/arcgis/Portal","esri/dijit/LayerList"],function(e,t,n,r,o,a,i){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=r.__importDefault(n(8)),a=n(9);function i(e,t){var n,o=("string"==typeof e?document.getElementById(e):e).querySelectorAll(".esriList > li"),a=function(e){var t=new Map,n=function(n){e.hasOwnProperty(n)&&e[n].forEach(function(e){return t.set(e,n)})};for(var r in e)n(r);return t}(t),i=0,s=new Map;return o.forEach(function(e){var t=e.querySelector("label");if(t){var r=t.textContent,o=a.get(r)||"Other";if(o!==n){var u="layer-list-group-"+i;s.set(u,o),e.classList.add("layer-list-group-start",u),i++}n=o}}),Array.from(s,function(e){var t=r.__read(e,2);return"."+t[0]+":before { content: '"+t[1]+"' }"}).join("\n")}t.getGroupsFromCreateMapItem=function(e){if(e.itemData.applicationProperties){var t=e.itemData.applicationProperties;if(t.viewing){var n=t.viewing;if(n.layerGrouping){var r=n.layerGrouping;if(r&&r.enabled&&r.groups)return r.groups}}}return null},t.convertLayer=function(e){var t=e.id,n=e.title,r=e.visibility,o=e.layerObject;return{id:t,title:n,layer:o,visibility:r,showLegend:!0,showOpacitySlider:!0,showSubLayers:!o.layerInfos||o.layerInfos.length>1}};var s=function(e){function t(t,n){var o=this;if(t.groups){var s=t.layers,u=new(Array.bind.apply(Array,r.__spread([void 0],function(e,t,n,o){var a,i,s,u,c,l,f,d,p,y,h,v;return void 0===n&&(n="id"),r.__generator(this,function(b){switch(b.label){case 0:for(u in s=[],e)s.push(u);c=0,b.label=1;case 1:if(!(c<s.length))return[3,10];if(l=s[c],!e.hasOwnProperty(l))return[3,9];f=e[l],d=function(e){var a,i;return r.__generator(this,function(r){switch(r.label){case 0:if(!(a=t.find(function(t){return t[n]===e}))){if(i='No layer found with "'+n+'" of "'+e+'".',o)throw new ReferenceError(i);return console.warn(i),[2,"continue"]}return[4,a];case 1:return r.sent(),[2]}})},b.label=2;case 2:b.trys.push([2,7,8,9]),p=r.__values(f),y=p.next(),b.label=3;case 3:return y.done?[3,6]:(h=y.value,[5,d(h)]);case 4:b.sent(),b.label=5;case 5:return y=p.next(),[3,3];case 6:return[3,9];case 7:return v=b.sent(),a={error:v},[3,9];case 8:try{y&&!y.done&&(i=p.return)&&i.call(p)}finally{if(a)throw a.error}return[7];case 9:return c++,[3,1];case 10:return[2]}})}(t.groups,t.layers,t.groupProperty,t.throwOnGroupNotFound))));s.filter(function(e){return!u.includes(e)}).forEach(function(e){return u.push(e)}),t.layers=u.reverse()}return o=e.call(this,t,n)||this,t.groups&&o.on("load",function(e){var r=i(n,t.groups),o=document.createElement("style");o.textContent=r,document.head.appendChild(o)}),t.metadata&&a.addMetadataTabs(o,t.metadataFormatterPage||void 0),o}return r.__extends(t,e),t}(o.default);t.default=s},function(t,n){t.exports=e},function(e,t,n){"use strict";n.r(t),n.d(t,"__extends",function(){return o}),n.d(t,"__assign",function(){return a}),n.d(t,"__rest",function(){return i}),n.d(t,"__decorate",function(){return s}),n.d(t,"__param",function(){return u}),n.d(t,"__metadata",function(){return c}),n.d(t,"__awaiter",function(){return l}),n.d(t,"__generator",function(){return f}),n.d(t,"__exportStar",function(){return d}),n.d(t,"__values",function(){return p}),n.d(t,"__read",function(){return y}),n.d(t,"__spread",function(){return h}),n.d(t,"__await",function(){return v}),n.d(t,"__asyncGenerator",function(){return b}),n.d(t,"__asyncDelegator",function(){return m}),n.d(t,"__asyncValues",function(){return w}),n.d(t,"__makeTemplateObject",function(){return g}),n.d(t,"__importStar",function(){return _}),n.d(t,"__importDefault",function(){return x});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function o(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function i(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n}function s(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i}function u(e,t){return function(n,r){t(n,r,e)}}function c(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function l(e,t,n,r){return new(n||(n=Promise))(function(o,a){function i(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,s)}u((r=r.apply(e,t||[])).next())})}function f(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}function d(e,t){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}function p(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function y(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function h(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(y(arguments[t]));return e}function v(e){return this instanceof v?(this.v=e,this):new v(e)}function b(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(e,t||[]),a=[];return r={},i("next"),i("throw"),i("return"),r[Symbol.asyncIterator]=function(){return this},r;function i(e){o[e]&&(r[e]=function(t){return new Promise(function(n,r){a.push([e,t,n,r])>1||s(e,t)})})}function s(e,t){try{(n=o[e](t)).value instanceof v?Promise.resolve(n.value.v).then(u,c):l(a[0][2],n)}catch(e){l(a[0][3],e)}var n}function u(e){s("next",e)}function c(e){s("throw",e)}function l(e,t){e(t),a.shift(),a.length&&s(a[0][0],a[0][1])}}function m(e){var t,n;return t={},r("next"),r("throw",function(e){throw e}),r("return"),t[Symbol.iterator]=function(){return this},t;function r(r,o){t[r]=e[r]?function(t){return(n=!n)?{value:v(e[r](t)),done:"return"===r}:o?o(t):t}:o}}function w(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=p(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise(function(r,o){(function(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)})(r,o,(t=e[n](t)).done,t.value)})}}}function g(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function _(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function x(e){return e&&e.__esModule?e:{default:e}}},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t){e.exports=o},function(e,t){e.exports=a},function(e,t){e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),o=n(10),a="https://wsdot-gis.github.io/geospatial-metadata";function i(e,t){return void 0===t&&(t=a),t?t+"?"+("url="+encodeURIComponent(e+"?f=xml")):e}t.addMetadataTabs=function(e,t){void 0===t&&(t=a),e.on("load",function(n){n.target.querySelectorAll(".esriTitleContainer > input[type=checkbox]").forEach(function(n){n.addEventListener("click",function(n){if(this.dataset.layerIndex){var a,s=parseInt(this.dataset.layerIndex,10),u=e.layers[s];try{a=this.parentElement.parentElement.nextElementSibling}catch(e){if(!(e instanceof TypeError))throw e}a&&function(e,t,n,a){r.__awaiter(this,void 0,void 0,function(){var s,u,c,l,f,d,p,y,h,v,b;return r.__generator(this,function(r){switch(r.label){case 0:return t&&t.layer&&t.layer.url?(s=t.layer.url,[4,o.detectLayerMetadataSupport(s)]):[2];case 1:return r.sent()?[4,o.getMetadataLinks(s)]:[2];case 2:for(y in u=r.sent(),(c=document.createElement("li")).tabIndex=0,c.dataset.tabId="metadata",c.dataset.layerIndex=n.toString(10),c.setAttribute("role","tab"),c.classList.add("esriTabMenuItem"),c.textContent="Metadata",(l=document.createElement("div")).classList.add("esriTab","metadata-panel"),l.setAttribute("role","tabpanel"),l.dataset.tabId="metadata",f=e.firstElementChild,d=e.children[1],f.appendChild(c),d.appendChild(l),(p=document.createElement("ul")).classList.add("layer-metadata-list"),u)u.hasOwnProperty(y)&&(h=u[y],(v=document.createElement("a")).target="wsdot-metadata",v.href=i(h,a),v.textContent=y,(b=document.createElement("li")).appendChild(v),p.appendChild(b));return l.appendChild(p),[2]}})})}(a,u,s,t)}},{once:!0,passive:!0})})})}},function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function i(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,s)}u((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var s="exts/LayerMetadata/validLayers?f=json",u="exts/LayerMetadata/layerSources?f=json",c="exts/LayerMetadata/metadata",l=function(e){function t(t){var n=e.call(this,t.message)||this;return n.errorInfo=t,n.code=t.code,n}return o(t,e),t}(Error);function f(e){return a(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return[4,fetch([e,"f=json"].join("?"))];case 1:return[4,n.sent().json()];case 2:if((t=n.sent()).error)throw new l(t.error);return[2,t]}})})}function d(e){return a(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return t=[e,u].join("/"),[4,fetch(t)];case 1:return[4,n.sent().json()];case 2:return[2,n.sent()]}})})}t.ArcGisError=l,t.getServiceInfo=f,t.detectLayerMetadataSupport=function(e){return a(this,void 0,void 0,function(){var t;return i(this,function(n){switch(n.label){case 0:return[4,f(e)];case 1:return(t=n.sent()).supportedExtensions?[2,/LayerMetadata/.test(t.supportedExtensions)]:[2,!1]}})})},t.getLayerSources=d,t.getMetadataLinks=function(e,t){return a(this,void 0,void 0,function(){var n,r,o;return i(this,function(a){switch(a.label){case 0:return t?[3,2]:[4,d(e)];case 1:t=a.sent(),a.label=2;case 2:for(o in n=[e,c].join("/"),r={},t)r[o]=[n,t[o][0]].join("/");return[2,r]}})})},t.getValidLayers=function(e){return a(this,void 0,void 0,function(){var t,n;return i(this,function(r){switch(r.label){case 0:return t=[e,s].join("/"),[4,fetch(t)];case 1:return[4,r.sent().json()];case 2:if((n=r.sent()).layerIds)return[2,n.layerIds];throw n.error?new l(n.error):new TypeError("response was not expected type: "+JSON.stringify(n))}})})}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(3),i=n.n(a),s=n(1),u=n.n(s),c=n(4),l=n.n(c),f=n(5),d=n.n(f),p=n(6),y=n.n(p);const h=["true","on","✓","✔","🗸","🗹","☑","✅"],v=["false","off","⍻","X"];function b(e,t){return function(e,t){let n=e.map(e=>`(?:${e})`).join("|");return t&&(n=`^(?:${n})$`),new RegExp(`${n}`,"i")}(!0===e?h:!1===e?v:h.concat(...v),t)}class m{static parse(e){const t=b(!0,!0),n=b(!1,!0);let r,o=!!t.test(e)||!n.test(e)&&void 0;return void 0===o&&/^\d+(?:[\s,]\d+)*$/.test(e)&&(r=e.split(/\D+/).map(e=>parseInt(e,10)),o=!0),null===o?null:new m({visible:o,visibleLayers:r})}constructor(e){e&&(this.visible=e.visible,this.visibleLayers=e.visibleLayers)}apply(e){const{layer:t}=e;if(!t)return;const n=t;n.suspend&&n.suspend(),null!=this.visible&&(e.visibility=this.visible,t.setVisibility(this.visible)),e.showSubLayers&&this.visibleLayers&&t.setVisibleLayers(this.visibleLayers),n.resume&&n.resume()}toString(){return null==this.visible?"":this.visible?this.visibleLayers?this.visibleLayers.join(" "):"✓":"⍻"}}var w=n(7),g=n.n(w),_=function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function i(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,s)}u((r=r.apply(e,t||[])).next())})};const x="IYrj3otxNjPsrTRD";u.a.defaults.io.httpsDomains.push("wsdot.wa.gov"),u.a.defaults.io.corsEnabledServers.push("wsdot.wa.gov","data.wsdot.wa.gov");const L=function(){const e=function(){return _(this,void 0,void 0,function*(){const e=new g.a.Portal("https://www.arcgis.com"),t=yield e.queryItems({num:100,q:`orgid:${x} AND type:("Web Map" NOT "Application") AND tags:"geoportal"`}),{results:n}=t;return n})}(),t=document.createElement("form");t.action=".",t.classList.add("webmapForm");const n=document.createElement("input");n.name="webmap",n.id="webmapInput",n.type="text",n.required=!0,n.placeholder="ArcGIS webmap id",n.title="value must be hexadecimal webmap ID",n.pattern=/^[a-f0-9]+$/.source;const r=document.createElement("datalist");r.id="webmapList",n.setAttribute("list",r.id);const o=document.createElement("button");return o.type="submit",o.textContent="change map",t.appendChild(n),t.appendChild(r),t.appendChild(o),e.then(e=>{e.forEach(e=>{const t=document.createElement("option");t.textContent=t.value=e.id,t.label=e.title,r.appendChild(t)})},e=>{console.error("AGOL query error",e);const n=new CustomEvent("webmapqueryerror",{detail:{error:e}});t.dispatchEvent(n)}),t}();const O=function(){const e=location.search?location.search.match(/\bwebmap=([a-f0-9]+)\b/i):null;return e?e[1]:"d2666674071e4263ac344046f09b7599"}();i.a.createMap(O,"map",{mapOptions:{extent:function(){const e=new URL(location.href).searchParams.get("map-extent");if(!e)return;const[t,n,r,o]=e.split(/[\s,]/g).map(e=>parseFloat(e));return new d.a({xmin:t,ymin:n,xmax:r,ymax:o,spatialReference:{wkid:4326}})}()||void 0}}).then(e=>{const{map:t,itemInfo:n,errors:a}=e,i=document.createElement("button");i.id="homeButton",t.root.appendChild(i),new l.a({visible:!0,map:t},i).startup(),t.root.appendChild(L);const s=Object(r.getGroupsFromCreateMapItem)(n)||void 0;a&&a.length>0&&(console.group("create map error"),a.forEach(e=>console.error(e)),console.groupEnd());const u=n.itemData.operationalLayers.map(r.convertLayer),c=new o.a({groups:s,groupProperty:"title",map:t,metadata:!0,layers:u,throwOnGroupNotFound:!1},"layerList");!function(e){if(!(window.URL&&window.URLSearchParams&&window.history))throw new Error("Browser must support all of the following features: URL, URLSearchParams, history.");const t=document.createElement("div");t.classList.add("layer-link");const n=document.createElement("a");n.href=new URL(location.href,location.href.replace(/\?.+$/,"")).toString(),n.textContent="📋",n.title="copy URL with layer settings to clipboard",n.target="_blank",n.classList.add("layer-link__anchor"),t.classList.add("layer-link-disabled"),t.appendChild(n),e.map.on("extent-change",({extent:e})=>{e=y.a.webMercatorToGeographic(e);const{xmin:r,ymin:o,xmax:a,ymax:i}=e,s=[r,o,a,i].map(e=>Math.round(1e4*e)/1e4).join(" "),u=new URL(n.href);u.searchParams.set("map-extent",s),n.href=u.toString(),t.classList.remove("layer-link-disabled")}),e.on("toggle",function(r){t.classList.remove("layer-link-copied"),t.classList.remove("layer-link-disabled");const{layerIndex:o,visible:a,subLayerIndex:i}=r,s=e.layers[o],u=new URL(n.href),c=u.searchParams.get(s.id),l=c?m.parse(c):null,f=!!l&&null!=l.visibleLayers;let d;d=s.showSubLayers&&(f||null!=i)?new m(s.layer):new m({visible:a}),u.searchParams.set(s.id,d.toString()),n.href=u.toString()}),n.onclick=function(e){const r="Could not copy to clipboard. Right-click link and use context menu to copy link.",o=navigator.clipboard;return o&&o.writeText?(o.writeText(n.href).then(()=>{t.classList.add("layer-link-copied")},e=>{alert(r)}),!1):(alert(r),!1)},e.map.root.appendChild(t)}(c),window.URL&&window.URLSearchParams&&window.history&&c.on("load",()=>{const e=new URL(location.href),{searchParams:t}=e;t&&function(e,t){if(!e||!window.URLSearchParams)return;const n=t.layers;for(const t of n){if(!t.id||!e.has(t.id))continue;const n=e.get(t.id);if(!n)continue;const r=m.parse(n);r?r.apply(t):console.warn(`could not parse "${n}" into layer settings for layer ${t.id}.`)}}(t,c)}),c.startup()}).catch(e=>{console.error("map creation error",e)})}])});
//# sourceMappingURL=main.js.map