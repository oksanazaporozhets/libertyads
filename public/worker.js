self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'start':
            self.postMessage('WORKER STARTED: ' + data.msg);
            break;
        case 'stop':
            self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
            self.close(); // Terminates the worker.
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    };
}, false);
alert(1);
console.log('Worker started');


//$.ajax({
//    url: "http://libertyads.me/api/v1/adverts/",
//    // the name of the callback parameter, as specified by the YQL service
//    jsonp: "callback",
//    // tell jQuery we're expecting JSONP
//    dataType: "jsonp",
//    // tell YQL what we want and that we want JSON
//    data: {
//        q: "select title,abstract,url from search.news where query=\"cat\"",
//        format: "json"
//    },
//    // work with the response
//    success: function (response) {
//        console.log(response); // server response
//    }
//});

// This is a WorldIP free geo-location database.
//        J50Npi.getJSON("//api.wipmania.com/jsonp", {}, function (geodata) {
//            alert(geodata.address.country);
//            console.log(geodata);
//        });
