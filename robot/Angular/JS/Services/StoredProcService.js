///////////////////////////////////////////////////////////////////////////////////////////////////
// StoredProcService

app.factory('StoredProcService', ['$rootScope', 'RestService', function ($rootScope, RestService) {

    var service = {

        Model: {
            rows: [], count: 0, loading: false, error: false
        },

        ///////////////////////////////////////////////////////////////////////////////////////////

        Init: function () {
            RestService.GetAndPopulate('StoredProcs', service.Model);
        },

        Detail: function (storedProc) {
            return RestService.Get('StoredProcs/' + storedProc +'/');
        }
    }

    return service;
}]);



