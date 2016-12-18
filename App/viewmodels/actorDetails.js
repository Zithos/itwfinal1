define(['knockout'], function (ko) {
    return {
        actorDetails: ko.observableArray([]),
        actorUri: 'http://192.168.160.39/api/Actors/',
        error: ko.observable(),
        ajaxHelper: function (uri, method, data) {
            var self = this;
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        },
        activate: function (id) {
            //the router's activator calls this function and waits for it to complete before proceeding
            console.log('ViewModel activated...')
            var self = this;
            self.ajaxHelper(self.actorUri + id, 'GET').done(function (data) {
                self.actorDetails(data);
            });
        },
    };
});