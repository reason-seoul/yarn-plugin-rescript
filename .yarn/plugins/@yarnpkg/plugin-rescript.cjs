/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-rescript",
factory: function (require) {
var plugin=(()=>{var U=Object.create,l=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var L=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var S=t=>l(t,"__esModule",{value:!0});var i=t=>{if(typeof require!="undefined")return require(t);throw new Error('Dynamic require of "'+t+'" is not supported')};var T=(t,o)=>{for(var n in o)l(t,n,{get:o[n],enumerable:!0})},b=(t,o,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let e of A(o))!N.call(t,e)&&e!=="default"&&l(t,e,{get:()=>o[e],enumerable:!(n=R(o,e))||n.enumerable});return t},a=t=>b(S(l(t!=null?U(L(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var _={};T(_,{default:()=>Y});var x=a(i("child_process"));var m=a(i("clipanion")),s=a(i("@yarnpkg/core")),r=a(i("@yarnpkg/fslib")),y=a(i("@yarnpkg/cli")),g=a(i("@yarnpkg/plugin-essentials")),p=a(i("@yarnpkg/plugin-pnp")),d=class extends y.BaseCommand{async execute(){if(!g.default.commands)throw new Error("Yarn commands are not found. Please upgrade to Yarn 2.");let o=0,n=await s.Configuration.find(this.context.cwd,this.context.plugins),{project:e,workspace:B}=await s.Project.find(n,this.context.cwd);await e.resolveEverything({lockfileOnly:!0,report:new s.ThrowReport});let H=e.storedPackages.get(e.topLevelWorkspace.anchoredLocator.locatorHash),v=s.structUtils.makeIdent(null,"rescript"),f=H.dependencies.get(v.identHash);if(!f&&(o=await m.Cli.from(g.default.commands).run(["add","--dev","rescript"],this.context),o!==0||(o=await m.Cli.from(p.default.commands).run(["unplug","rescript"],this.context),o!==0)))return o;let C=e.storedResolutions.get(f.descriptorHash),j=e.storedPackages.get(C),u=new r.NodeFS,k=r.ppath.join(e.cwd,r.Filename.nodeModules);await u.mkdirPromise(k,{recursive:!0});let E=p.pnpUtils.getUnpluggedPath(j,{configuration:e.configuration}),I=r.ppath.join(E,"node_modules","rescript"),h=r.ppath.join(k,"rescript");async function w(){try{await u.symlinkPromise(I,h)}catch(c){(c==null?void 0:c.code)==="EEXIST"&&(await u.unlinkPromise(h),await w())}}return await w(),o}};d.paths=[["res","setup"]];var P=d;var D=()=>{let t=(0,x.spawn)("yarn",["res","setup"],{encoding:"utf8",shell:!0});t.stdout.on("data",console.log),t.stderr.on("data",console.error),t.on("close",o=>{o!==0&&process.exit(o),console.log("Setup ReScript successfully!")})},F={hooks:{afterAllInstalled:D},commands:[P]},Y=F;return _;})();
return plugin;
}
};
