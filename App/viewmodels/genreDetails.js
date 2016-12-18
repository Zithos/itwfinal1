define(['knockout'], function (ko) {
    return {
        genreDetails: ko.observableArray([]),
        genreUri: 'http://192.168.160.39/api/Genres/',
        escolha: ko.observable(),
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
            console.log(self.genreUri + id)
            self.ajaxHelper(self.genreUri + id, 'GET').done(function (data) {
                self.genreDetails(data);
            }); 
            if (id == 1) { this.escolha('action');}
            if (id == 2) { this.escolha('adventure')}
            if (id == 3) { this.escolha('animation')}
            if (id == 4) { this.escolha('biography')}
            if (id == 5) { this.escolha('comedy')}
            if (id == 6) { this.escolha('crime')}
            if (id == 7) { this.escolha('documentary')}
            if (id == 8) { this.escolha('drama')}
            if (id == 9) { this.escolha('family')}
            if (id == 10) { this.escolha('fantasy')}
            if (id == 11) { this.escolha('film-noir')}
            if (id == 12) { this.escolha('game-show')}
            if (id == 13) { this.escolha('history')}
            if (id == 14 ) { this.escolha('horror')}
            if (id == 15) { this.escolha('music') }
            if (id == 16) { this.escolha('musical')}
            if (id == 17) { this.escolha('mistery')}
            if (id == 18) { this.escolha('news')}
            if (id == 19) { this.escolha('reality.tv')}
            if (id == 20) { this.escolha('romance')}
            if (id == 21) { this.escolha('sci-fi')}
            if (id == 22) { this.escolha('short')}
            if (id == 23) { this.escolha('sport')}
            if (id == 24) { this.escolha('thriller')}
            if (id == 25) { this.escolha('war')}
            if (id == 26) { this.escolha('western')}
        },
    };
});