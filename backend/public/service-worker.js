"use strict";var precacheConfig=[["/index.html","ac3a127a740a022bfac5226c3822f0a7"],["/static/css/main.a7c07a05.css","22697a8ecd6c2ca0a8223b01ef7c267e"],["/static/media/captainMarvel.ec583237.png","ec5832375fa8aa5e2041313dd8ba9253"],["/static/media/chow.a87f071a.jpg","a87f071a012d6915804d84c9d0e653d0"],["/static/media/ctb.a0c74993.jpg","a0c749939ab688e90b54446235814f08"],["/static/media/defaultUser.8323e88b.jpg","8323e88b8843959a036ffdf464fa44b0"],["/static/media/dkb.603366d0.jpg","603366d0943b128e3b959f3c12715a3d"],["/static/media/g0g.103ad817.png","103ad8170dd377763110e7e347941817"],["/static/media/gdb.94b74b49.png","94b74b49bffd5afb07f7015d67e2c06a"],["/static/media/goku.a9a58180.gif","a9a5818048574f2960b3a9f796150638"],["/static/media/jlb.caec684a.png","caec684a38138a3ce45624b7b9dcdb6b"],["/static/media/kungfu.d351b662.png","d351b66266e796219c781b86b610d9a2"],["/static/media/ll.e29f3a46.gif","e29f3a46f3e23971104872d47c959392"],["/static/media/netflix.ba1bef15.jpg","ba1bef152d5b65fb9b5282a0dcb999c5"],["/static/media/pacman.57cdd14b.gif","57cdd14bd5a7c4007b92fddd816f2d76"],["/static/media/teentitan.166f6c70.png","166f6c7009e91eabf10dc726cdc6902c"],["/static/media/watch.a8a381a6.jpg","a8a381a64cb56db52ebe47bb58fa1aa0"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});