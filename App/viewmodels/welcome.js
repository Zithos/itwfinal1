define(['durandal/app'], function (app) {
    var ctor = function () {
        modal = function () {
            console.log('Modal Activated')
            $('#myModal').modal('toggle');
        }
        setTimeout('modal()', 1000)
    };
    return ctor;
});
