define(['durandal/app', 'knockout'], function (app, ko) {
    var ctor = function () {
        console.log('ViewModel initiated...')
        var self = this;;
        var directorLikesUri = 'http://192.168.160.39/api/Directors/Likes'
        self.director = ko.observableArray();
        self.error = ko.observable();
        function ajaxHelper(uri, method, data) {
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
        }
        //--- Funções visíveis do exterior
        getAllMovies = function () {
            console.log('CALL: getAllMovies...')
            ajaxHelper(directorLikesUri, 'GET').done(function (data) {
                self.director(data);
            });
        };
        getAllMovies();

    };
    return ctor;
});