/*!
 * EventEmitter v4.2.7 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */
(function(){"use strict";function t(){}function r(t,n){for(var e=t.length;e--;)if(t[e].listener===n)return e;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var e=t.prototype,i=this,s=i.EventEmitter;e.getListeners=function(n){var r,e,t=this._getEvents();if(n instanceof RegExp){r={};for(e in t)t.hasOwnProperty(e)&&n.test(e)&&(r[e]=t[e])}else r=t[n]||(t[n]=[]);return r},e.flattenListeners=function(t){var e,n=[];for(e=0;e<t.length;e+=1)n.push(t[e].listener);return n},e.getListenersAsObject=function(n){var e,t=this.getListeners(n);return t instanceof Array&&(e={},e[n]=t),e||t},e.addListener=function(i,e){var t,n=this.getListenersAsObject(i),s="object"==typeof e;for(t in n)n.hasOwnProperty(t)&&-1===r(n[t],e)&&n[t].push(s?e:{listener:e,once:!1});return this},e.on=n("addListener"),e.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},e.once=n("addOnceListener"),e.defineEvent=function(e){return this.getListeners(e),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(i,s){var n,e,t=this.getListenersAsObject(i);for(e in t)t.hasOwnProperty(e)&&(n=r(t[e],s),-1!==n&&t[e].splice(n,1));return this},e.off=n("removeListener"),e.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},e.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},e.manipulateListeners=function(r,t,i){var e,n,s=r?this.removeListener:this.addListener,o=r?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(e=i.length;e--;)s.call(this,t,i[e]);else for(e in t)t.hasOwnProperty(e)&&(n=t[e])&&("function"==typeof n?s.call(this,e,n):o.call(this,e,n));return this},e.removeEvent=function(e){var t,r=typeof e,n=this._getEvents();if("string"===r)delete n[e];else if(e instanceof RegExp)for(t in n)n.hasOwnProperty(t)&&e.test(t)&&delete n[t];else delete this._events;return this},e.removeAllListeners=n("removeEvent"),e.emitEvent=function(r,o){var e,i,t,s,n=this.getListenersAsObject(r);for(t in n)if(n.hasOwnProperty(t))for(i=n[t].length;i--;)e=n[t][i],e.once===!0&&this.removeListener(r,e.listener),s=e.listener.apply(this,o||[]),s===this._getOnceReturnValue()&&this.removeListener(r,e.listener);return this},e.trigger=n("emitEvent"),e.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},e.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},e._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return i.EventEmitter=s,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}).call(this);
/*
 * Basic JSONP helper (pure JS)
 */
var J50Npi = J50Npi || {currentScript:null,getJSON:function(b,d,h){var g=b+(b.indexOf("?")+1?"&":"?");var c=document.getElementsByTagName("head")[0];var a=document.createElement("script");var f=[];var e="";this.success=h;d.callback="J50Npi.success";for(e in d){f.push(e+"="+encodeURIComponent(d[e]))}g+=f.join("&");a.type="text/javascript";a.src=g;if(this.currentScript){c.removeChild(currentScript)}c.appendChild(a)},success:null};
function splitIntoLines(n,t){var e,o,r=[],h="",i=n.split(" ");for(e=0;e<i.length;)o=addWordOntoLine(h,i[e]),o.length>t?(0==h.length&&(h=o,e++),r.push(h),h=""):(h=o,e++);return h.length>0&&r.push(h),r}function addWordOntoLine(n,t){return 0!=n.length&&(n+=" "),n+=t}

function splitIntoLines(input, len) {
    var i;
    var output = [];
    var lineSoFar = "";
    var temp;
    var words = input.split(' ');
    for (i = 0; i < words.length;) {
        // check if adding this word would exceed the len
        temp = addWordOntoLine(lineSoFar, words[i]);
        if (temp.length > len) {
            if (lineSoFar.length == 0) {
                lineSoFar = temp;     // force to put at least one word in each line
                i++;                  // skip past this word now
            }
            output.push(lineSoFar);   // put line into output
            lineSoFar = "";           // init back to empty
        } else {
            lineSoFar = temp;         // take the new word
            i++;                      // skip past this word now
        }
    }
    if (lineSoFar.length > 0) {
        output.push(lineSoFar);
    }
    return(output);
}

function addWordOntoLine(line, word) {
    if (line.length != 0) {
        line += " ";
    }
    return(line += word);
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor(i * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

(function (globalScope) {
    // Globals
    if (!globalScope.libertyAds) {
        globalScope.libertyAds = {
            // To keep track of which embeds we have already processed
            foundEls : [],
            dataObj:[]
        };

        // innit emmiter
        var ee = new EventEmitter();

        // This is a WorldIP free geo-location database.
//        J50Npi.getJSON("//api.wipmania.com/jsonp", {}, function (geodata) {
//            alert(geodata.address.country);
//            console.log(geodata);
//        });

        // Getting all ads
        J50Npi.getJSON('//libertyads.herokuapp.com/ads', {}, function (geodata) {
            libertyAds.dataObj = geodata;
            console.log('data:load', geodata);
            ee.emitEvent('data:load');
        });
    }

    var els = document.getElementsByTagName('script');
    var re = /widget\.js/;

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.src.match(re) && libertyAds.foundEls.indexOf(el) < 0) {
            libertyAds.foundEls.push(el);
            console.log('Identified embed tag %o with info: %o', el, libertyAds.foundEls.indexOf(el));

            ee.addListener('data:load', (function (el) {
                return function () {

                    var size = el.getAttribute('data-size').split('x'),
                        svgData = [
                            'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
                            '<style type="text/css"><![CDATA[ * {font-family: Tahoma;} .title{font-size: 16px; text-decoration: underline; fill: blue;} .text{font-size: 14px;} .url{font-size: 12px; fill:green;}]]></style>'
                        ],
                        x = 4;

                    if (size == '728x90') {

                        getRandomSubarray(libertyAds.dataObj, 2).forEach(function (ad) {
                            var y = 20;
                            svgData.push('<a xlink:href="' + escapeHtml(ad.url) + '" target="_top"><text class="title" x="' + x + '" y="' + y + '">' + encodeURIComponent(escapeHtml(ad.title)) + '</text></a>');

                            splitIntoLines(ad.text, 50).forEach(function (line) {
                                y += 20;
                                svgData.push('<text class="text" x="' + x + '" y="' + y + '">' + encodeURIComponent(escapeHtml(line)) + '</text>');
                            });

                            y += 20;
                            svgData.push('<a xlink:href="' + escapeHtml(ad.url) + '" target="_top"><text class="url" x="' + x + '" y="' + y + '">' + encodeURIComponent(escapeHtml(ad.vurl || ad.url)) + '</text></a>');

                            x += 362;
                        });

                    } else if (size == '240x400') {

                        var y = 20;

                        getRandomSubarray(libertyAds.dataObj, 4).forEach(function (ad) {
                            svgData.push('<a xlink:href="' + escapeHtml(ad.url) + '" target="_top"><text class="title" x="' + x + '" y="' + y + '">' + encodeURIComponent(escapeHtml(ad.title)) + '</text></a>');

                            splitIntoLines(ad.text, 30).forEach(function (line) {
                                y += 20;
                                svgData.push('<text class="text" x="' + x + '" y="' + y + '">' + encodeURIComponent(escapeHtml(line)) + '</text>');
                            });

                            y += 20;
                            svgData.push('<a xlink:href="' + escapeHtml(ad.url) + '" target="_top"><text class="url" x="' + x + '" y="' + y + '">' + encodeURIComponent(escapeHtml(ad.vurl || ad.url)) + '</text></a>');

                        });

                    }

                    svgData.push('</svg>');

                    var objectDocument = document.createElement("object");
                    objectDocument.style.border = "1px solid green";
                    objectDocument.width = size[0];
                    objectDocument.height = size[1];
                    objectDocument.setAttribute("type", "image/svg+xml");
                    objectDocument.setAttribute('data', svgData.join(''));

                    objectDocument.addEventListener('load', function () {
                        console.log('SVGElement loaded: %o', el);
                    }, false);

                    el.parentNode.insertBefore(objectDocument, el);

                    // Always remove after use
                    return true;
                }
            })(el));

        } else {
            console.log('Skipping embed tag %o with info: %o', el, libertyAds.foundEls.indexOf(el));
        }
    }
}(this));