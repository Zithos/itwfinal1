define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Main Page', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'Movies', moduleId: 'viewmodels/movies', nav: true },
                { route: 'Actors', moduleId: 'viewmodels/actors', nav: true },
                { route: 'Directors', moduleId: 'viewmodels/directors', nav: true },
                { route: 'Genres', moduleId: 'viewmodels/genres', nav: true },
                { route: 'Top 60 Gross', moduleId: 'viewmodels/moviesGross', nav: false },
                { route: 'Top 60 Budget', moduleId: 'viewmodels/moviesBudget', nav: false },
                { route: 'Top 60 Actors', moduleId: 'viewmodels/actorsLikes', nav: false },
                { route: 'Top 60 Directors', moduleId: 'viewmodels/directorLikes', nav: false },
                { route: 'MovieDetails/:id', moduleId: 'viewmodels/movieDetails', nav: false, hash: '#movieDetails' },
                { route: 'DirectorDetails/:id', moduleId: 'viewmodels/directorDetails', nav: false, hash: '#directorDetails' },
                { route: 'ActorDetails/:id', moduleId: 'viewmodels/actorDetails', nav: false, hash: '#actorDetails' },
                { route: 'GenreDetails/:id', moduleId: 'viewmodels/genreDetails', nav: false, hash: '#genreDetails' },
                { route: 'LanguageDetails/:id', moduleId: 'viewmodels/languageDetails', nav: false, hash: '#languageDetails' },
                { route: 'paisesDetails/:id', moduleId: 'viewmodels/paisesDetails', nav: false, hash: '#paisesDetails' },
            ]).buildNavigationModel();
            return router.activate();
        }
    };
});