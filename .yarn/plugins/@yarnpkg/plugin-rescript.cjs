/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-rescript",
factory: function (require) {
var plugin;(()=>{"use strict";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>a});const r=require("clipanion"),o=require("@yarnpkg/cli");var n=function(e,t,r,o){var n,c=arguments.length,a=c<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(c<3?n(a):c>3?n(t,r,a):n(t,r))||a);return c>3&&a&&Object.defineProperty(t,r,a),a};class c extends o.BaseCommand{async execute(){return 0}}c.usage=r.Command.Usage({description:"Setup rescript dependencies"}),n([r.Command.Path("res","setup")],c.prototype,"execute",null);const a={hooks:{},commands:[c]};plugin=t})();
return plugin;
}
};