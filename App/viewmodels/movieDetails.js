define(['knockout'], function (ko) {
    return {
        movieDetails: ko.observableArray([]),
        moviesUri: 'http://192.168.160.39/api/Movies/',
        error: ko.observable(),
        ajaxHelper: function (uri, method, data) {
            var that = this;
            that.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    that.error(errorThrown);
                }
            })
        },
        activate: function (id) {
            //the router's activator calls this function and waits for it to complete before proceeding
            console.log('ViewModel activated...')
            var self = this;
            self.ajaxHelper(self.moviesUri + id, 'GET').done(function (data) {
                self.movieDetails(data);   
            });
        },
    };
});