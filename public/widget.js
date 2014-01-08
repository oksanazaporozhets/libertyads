var J50Npi={currentScript:null,getJSON:function(b,d,h){var g=b+(b.indexOf("?")+1?"&":"?");var c=document.getElementsByTagName("head")[0];var a=document.createElement("script");var f=[];var e="";this.success=h;d.callback="J50Npi.success";for(e in d){f.push(e+"="+encodeURIComponent(d[e]))}g+=f.join("&");a.type="text/javascript";a.src=g;if(this.currentScript){c.removeChild(currentScript)}c.appendChild(a)},success:null};

(function (global) {

    // Globals
    if (!global.libertyAds) {

        global.libertyAds = {};

        // This is a WorldIP free geo-location database.
        J50Npi.getJSON("//api.wipmania.com/jsonp", {}, function (geodata) {
            alert(geodata.address.country);
            console.log(geodata);
        });

//        // Getting all ads
//        J50Npi.getJSON('//libertyads.herokuapp.com/ads', {}, function (geodata) {
//            console.log(geodata);
//        });
    }


    var libertyAds = global.libertyAds;

    // To keep track of which embeds we have already processed
    if (!libertyAds.foundEls) libertyAds.foundEls = [];
    var foundEls = libertyAds.foundEls;

    var els = document.getElementsByTagName('script');
    var re = /widget\.js/;

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.src.match(re) && foundEls.indexOf(el) < 0) {
            foundEls.push(el);
            console.log('Identified embed tag %o with info: %o', el, foundEls.indexOf(el));

            var size = el.getAttribute('data-size').split('x');

            var SVGData = [
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.2">',
                '<a xlink:href="/svg/index.html" target="_top"><text x="0" y="15">This is Scalable Vector Graphic (SVG) Text</text></a>',
                '</svg>'
            ];

            var SVGElement = document.createElement("object");
            SVGElement.style.border = "1px solid green";
            SVGElement.width = size[0];
            SVGElement.height = size[1];
            SVGElement.setAttribute("type", "image/svg+xml");
            SVGElement.setAttribute('data', SVGData.join());
            SVGElement.addEventListener('load', function () {
                console.log('SVGElement loaded: %o', el);
            }, false);
            el.parentNode.insertBefore(SVGElement, el);
        } else {
            console.log('Skipping embed tag %o with info: %o', el, foundEls.indexOf(el));
        }
    }
}(this));