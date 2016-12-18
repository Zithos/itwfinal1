define(['durandal/app', 'knockout'], function (app, ko) {
    var ctor = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchGenresUri = 'http://192.168.160.39/api/Genres/Search/'
        var genresUri = 'http://192.168.160.39/api/Genres';
        var genresCountUri = 'http://192.168.160.39/api/Genres/Count';
        self.searchText = ko.observable("");
        self.genres = ko.observableArray();
        self.genresCount = ko.observable(null);
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
        getAllGenres = function () {
            console.log('CALL: getAllGenres...')
            ajaxHelper(genresCountUri, 'GET').done(function (data) {
                self.genresCount(data);
            });
            ajaxHelper(genresUri, 'GET').done(function (data) {
                self.genres(data);
            });
        };
        clearGenres = function () {
            console.log('CALL: clearGenres...')
            self.searchText("");
            self.css_show('hide');
            getAllGenres();
        };
        searchGenres = function () {
            console.log('CALL: searchGenres...');
            if (self.searchText().length >= 3) {
                ajaxHelper(searchGenresUri + self.searchText(), 'GET').done(function (data) {
                    self.genres(data);
                    self.css_show('hide');
                    if (self.genres().length == 0) {
                        self.css_show('');
                    };
                });
            };
        };
        //---- Chamada inicial
        getAllGenres();

    };
    return ctor;
});