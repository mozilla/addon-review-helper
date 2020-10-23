import { getTitle } from "./getTitle";
import getVersions  from "./getVersions";

console.log('!!!!! Content scripts has loaded !!!!!');

getTitle();

let versions = getVersions();
console.log('VERSIONS', versions)


// store.dispatch(setTitle('CEVA TEST'))