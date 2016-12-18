define(['durandal/app', 'knockout'], function (app, ko) {
    var ctor = function (){
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchActorsUri = 'http://192.168.160.39/api/Actors/Search/'
        var actorsUri = 'http://192.168.160.39/api/Actors';
        var actorsCountUri = 'http://192.168.160.39/api/Actors/Count';
        self.searchText = ko.observable("");
        self.actors = ko.observableArray();
        self.actorsCount = ko.observable(null);
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
        getAllActors = function () {
            console.log('CALL: getAllActors...')
            ajaxHelper(actorsCountUri, 'GET').done(function (data) {
                self.actorsCount(data);
            });
            ajaxHelper(actorsUri, 'GET').done(function (data) {
                self.actors(data);
            });
        };
        clearActors = function () {
            console.log('CALL: clearActors...')
            getAllActors();
            self.searchText("");
            self.css_show('hide');
        };
        searchActors = function () {
            console.log('CALL: searchActors...');
            if (self.searchText().length >= 3) {
                ajaxHelper(searchActorsUri + self.searchText(), 'GET').done(function (data) {
                    self.actors(data);
                    self.css_show('hide');
                    if (self.actors().length == 0) {
                        self.css_show('');
                    };
                });
            }
            if (self.searchText().length == 0) {
                ajaxHelper(actorsUri, 'GET').done(function (data) {
                    self.actors(data);
                    self.css_show('hide');
                });
            }
        };
        //---- Chamada inicial
        getAllActors();
    };
    return ctor;
});