define(['durandal/app', 'knockout'], function (app, ko) {
    var ctor = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchDirectorsUri = 'http://192.168.160.39/api/Directors/Search/'
        var directorsUri = 'http://192.168.160.39/api/Directors';
        var directorsCountUri = 'http://192.168.160.39/api/Directors/Count';
        var directorsLikesUri = 'http://192.168.160.39/api/Directors/Likes'
        self.searchText = ko.observable("");
        self.directors = ko.observableArray();
        self.directorsCount = ko.observable(null);
        self.error = ko.observable();
        self.css_show = ko.observable('hide');
        //--- Funções internas
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
        getAllDirectors = function () {
            console.log('CALL: getAllDirectors...')
            ajaxHelper(directorsCountUri, 'GET').done(function (data) {
                self.directorsCount(data);
            });
            ajaxHelper(directorsUri, 'GET').done(function (data) {
                self.directors(data);
            });
        };
        clearDirectors = function () {
            console.log('CALL: clearDirectors...')
            getAllDirectors();
            self.searchText("");
            self.css_show('hide');
        };
        searchDirectors = function () {
            console.log('CALL: searchDirectors...');
            if (self.searchText().length >= 3) {
                ajaxHelper(searchDirectorsUri + self.searchText(), 'GET').done(function (data) {
                    self.directors(data);
                    self.css_show('hide');
                if (self.directors().length == 0) {
                   self.css_show('');
                    };
            });
            };
            if (self.searchText().length == 0) {
                ajaxHelper(directorsUri, 'GET').done(function (data) {
                    self.directors(data);
                    self.css_show('hide');
                });
            }
        };
        getDirectorsByLikes = function () {
            console.log('CALL: getDirectorsByLikes...')
            ajaxHelper(directorsLikesUri, 'GET').done(function (data) {
                self.directors(data);
            });
        };
        //---- Chamada inicial
        getAllDirectors();

    };
    return ctor;
});