// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"euTuy":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "138b6a135baa4167";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"igcvL":[function(require,module,exports) {
// API token access from config.
const apiKey = config.MY_API_TOKEN;
// Access elements in the DOM.
const searchButton = document.querySelector("#search-button");
const results = document.querySelector("#results");
const grid = document.querySelector(".grid");
// Listen for the user to search with a query inputted.
searchButton.addEventListener("click", (e)=>{
    // Prevent the form from refreshing the page.
    e.preventDefault();
    renderResults();
});
// Render the search grid of all results.
async function renderResults() {
    try {
        // Show the loading icon.
        toggleLoader(true);
        // Clear the results grid of movie art.
        results.innerHTML = "";
        // Search field submitted text.
        const searchQuery = document.querySelector(".search-text").value;
        // API request and populate the results grid of movie artwork.
        const movieData = await fetchMovies(searchQuery);
        renderMovies(movieData);
        // API request and populate the results grid of tv shows artwork.
        const tvShowsData = await fetchTvShows(searchQuery);
        renderTvShows(tvShowsData);
        // Sort the tv shows and movies by their popularity ranking stored on the HTML attribute data-popularity.
        sortResultsByPopularity();
    } catch (err) {
        console.log(err);
    } finally{
        // Remove the loading icon.
        toggleLoader(false);
        scrollToResults();
    }
}
// Toggle the loader icon displaying.
function toggleLoader(state) {
    if (state) {
        // Create a loader icon and append it after the search bar.
        const loader = document.createElement("div");
        loader.innerHTML = "<hr/><hr/><hr/><hr/>";
        loader.classList.add("load");
        grid.appendChild(loader);
    } else {
        // Select the loader icon and remove it.
        const loading = document.querySelector(".load");
        loading.remove();
    }
}
// Check the validity of a response and parse if it is ok.
async function checkStatusAndParse(response) {
    if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);
    return await response.json();
}
// Fetch from the API all movies matching the search query.
async function fetchMovies(searchQuery) {
    try {
        const moviesResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
        const moviesData = await checkStatusAndParse(moviesResponse);
        return moviesData;
    } catch (err) {
        console.log(err);
    }
}
// Render the results grid with all matching movies from the search query.
async function renderMovies(moviesData) {
    try {
        // Ensure a valid movie object exists consisting of an id and artwork.
        const validMoviesData = moviesData.results.filter((movie)=>movie.id && movie["poster_path"]);
        validMoviesData.forEach(async (movie)=>{
            renderArtwork(movie);
            renderDetails(movie, "movie");
            const streamingData = await fetchMovieData(movie.id);
            renderStreamingData(streamingData, movie.id);
        });
    } catch (err) {
        console.log(err);
    }
}
// Fetch from the API all tv shows matching the search query.
async function fetchTvShows(searchQuery) {
    try {
        const showsResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
        const showsData = await checkStatusAndParse(showsResponse);
        return showsData;
    } catch (err) {
        console.log(err);
    }
}
// Render the results grid with all matching tv shows from the search query.
async function renderTvShows(showsData) {
    try {
        // Ensure a valid tv show object exists consisting of an id and artwork.
        const validShowsData = showsData.results.filter((movie)=>movie.id && movie["poster_path"]);
        validShowsData.forEach(async (show)=>{
            renderArtwork(show);
            renderDetails(show, "show");
            const streamingData = await fetchShowData(show.id);
            renderStreamingData(streamingData, show.id);
        });
    } catch (err) {
        console.log(err);
    }
}
// Render the movie artwork into the results grid.
function renderArtwork(media) {
    const artworkURL = `https://image.tmdb.org/t/p/w500/${media["poster_path"]}`;
    const id = media.id;
    // Create each movie artwork result card to be shown in the results grid and set its popularity.
    results.insertAdjacentHTML("afterbegin", `<div class="card img-fluid col-xs-1 col-m-3 d-flex justify-content-center" data-popularity="${media.popularity}">
	        <div id="${media.id}" class="card-front">
	            <img id="${media.id}" class="movie-art img-fluid" src="${artworkURL}">
	        </div>
	    </div>`);
    // Listen for a click on the movie artwork and show the movie details when it occurs.
    const artCover = document.getElementById(id);
    artCover.addEventListener("click", (e)=>{
        showDetails(e);
    });
}
// Render the card containing all the movie or show details from the API request.
function renderDetails(media, mediaType) {
    let mediaName;
    let mediaDate;
    if (mediaType === "movie") {
        mediaName = "title";
        mediaDate = "release_date";
    }
    if (mediaType === "show") {
        mediaName = "name";
        mediaDate = "first_air_date";
    }
    const cardInfo = document.createElement("div");
    cardInfo.innerHTML = `<div class="card-info col-xs-1 col-m-3" id="card${media.id}">
        <div class="card-format p-4">
            <div class="movie-title mb-3"><b>Title: </b><br>${media[mediaName]}</div>
            <div class="release-date mb-3"><b>Release Date: </b><br>${media[mediaDate]}</div>
            <div class="movie-info mb-3"><b>Description: </b><br>${media["overview"]}</div>
            <div class="stream-on" id="stream${media.id}">
                <b>Watch Here</b>
                <ul class="subscription"><b>Stream On:</b></ul>
                <ul class="rent"><b>Rent On:</b></ul>
                <ul class="buy"><b>Buy On:</b></ul>
            </div>
        </div>
    </div>`;
    // Add the hidden movie details card after the relevant movie artwork card.
    const targetMedia = document.getElementById(media.id);
    targetMedia.after(cardInfo);
}
// Fetch the list of watch providers where a movie is available to be streamed, rented, or bought.
async function fetchStreamingData(id, mediaType = "movie") {
    try {
        let apiUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;
        if (mediaType === "show") apiUrl = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`;
        const streamingResponse = await fetch(apiUrl);
        const streamingData = await checkStatusAndParse(streamingResponse);
        return streamingData;
    } catch (err) {
        console.log(err);
    }
}
// Movie fetch helper function.
async function fetchMovieData(movieId) {
    return await fetchStreamingData(movieId);
}
// Show fetch helper function.
async function fetchShowData(showId) {
    return await fetchStreamingData(showId, "show");
}
// Render the data of where a movie can be streamed to the movie details card.
function renderStreamingData(streamingData, id) {
    const streamOn = document.querySelector(`#stream${id}`);
    const subList = document.querySelector(`#stream${id} .subscription`);
    const rentList = document.querySelector(`#stream${id} .rent`);
    const buyList = document.querySelector(`#stream${id} .buy`);
    // Checking if any services are available in Canada.
    if (!streamingData.results["CA"]) streamOn.innerHTML = "<b>Not available to stream, rent, or buy in Canada.</b>";
    else {
        // Checking if available with a subscription in Canada.
        if (streamingData.results["CA"]["flatrate"]) // Loop through subscription providers in Canada.
        streamingData.results["CA"]["flatrate"].forEach((provider)=>{
            let li = document.createElement("li");
            subList.appendChild(li).innerHTML = provider["provider_name"];
        });
        else {
            let li = document.createElement("li");
            subList.appendChild(li).innerHTML = "Not available in Canada.";
        }
        // Checking if available for rent in Canada.
        if (streamingData.results["CA"]["rent"]) // Loop through rent providers in Canada.
        streamingData.results["CA"]["rent"].forEach((provider)=>{
            let li = document.createElement("li");
            rentList.appendChild(li).innerHTML = provider["provider_name"];
        });
        else {
            let li1 = document.createElement("li");
            rentList.appendChild(li1).innerHTML = "Not available in Canada.";
        }
        // Checking if available to buy in Canada.
        if (streamingData.results["CA"]["buy"]) // Loop through buy providers in Canada.
        streamingData.results["CA"]["buy"].forEach((provider)=>{
            let li = document.createElement("li");
            buyList.appendChild(li).innerHTML = provider["provider_name"];
        });
        else {
            let li2 = document.createElement("li");
            buyList.appendChild(li2).innerHTML = "Not available in Canada.";
        }
    }
}
// Show card of movie details and streaming availability in results grid after the movie artwork that is clicked.
function showDetails(e) {
    const targetMedia = document.getElementById(e.target.id);
    const infoCard = document.getElementById(`card${e.target.id}`);
    infoCard.style.display = infoCard.style.display == "block" ? "none" : "block";
    targetMedia.after(infoCard);
}
// Display results grid and scroll to it.
function scrollToResults() {
    grid.style.display = "flex";
    results.style.display = "flex";
    window.scroll({
        top: results.getBoundingClientRect().top,
        behavior: "smooth"
    });
}
// Sort results given the assigned data-popularity HTML attribute.
function sortResultsByPopularity() {
    var mediaCard = document.querySelectorAll(".card");
    Array.from(mediaCard).sort((a, b)=>b.dataset.popularity - a.dataset.popularity).forEach((el)=>el.parentNode.appendChild(el));
}

},{}]},["euTuy","igcvL"], "igcvL", "parcelRequire94c2")

//# sourceMappingURL=index.5baa4167.js.map
