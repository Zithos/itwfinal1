define(['durandal/app', 'knockout'], function (app, ko) {
    var ctor = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchMoviesUri = 'http://192.168.160.39/api/Movies/Search/'
        var moviesUri = 'http://192.168.160.39/api/Movies';
        var moviesCountUri = 'http://192.168.160.39/api/Movies/Count';
        var moviesGrossUri = 'http://192.168.160.39/api/Movies/Gross';
        var moviesBudgetUri = 'http://192.168.160.39/api/Movies/Budget'
        self.searchText = ko.observable("");
        self.movies = ko.observableArray();
        self.moviesCount = ko.observable(null);
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
        getAllMovies = function () {
            console.log('CALL: getAllMovies...')
            ajaxHelper(moviesCountUri, 'GET').done(function (data) {
                self.moviesCount(data);
            });
            ajaxHelper(moviesUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        clearMovies = function () {
            console.log('CALL: clearMovies...')
            self.searchText("");
            self.css_show('hide');
            getAllMovies();
        };
        searchMovies = function () {
            console.log('CALL: searchDirectors...');
            if (self.searchText().length >= 3) {
                ajaxHelper(searchMoviesUri + self.searchText(), 'GET').done(function (data) {
                    self.movies(data);
                    self.css_show('hide');
                    if (self.movies().length == 0) {
                        self.css_show('');
                    };
                });
            };
            if(self.searchText().length == 0){
                ajaxHelper(moviesUri, 'GET').done(function (data) {
                    self.movies(data);
                    self.css_show('hide');    
                });
            }
        };
        data = function (movies) {
            data = movies[25]
            alert(data)
        };
        //---- Chamada inicial
        getAllMovies();

    };
    return ctor;
});