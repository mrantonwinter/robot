///////////////////////////////////////////////////////////////////////////////////////////////////
// Rest Service.  used for all RESTful verbs


app.factory('RestService', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {

    var service = {

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Getters

        //default get function that returns a promise
        Get: function (url) {
            return $http({
                url: $rootScope.Config.BaseURL + url,
                method: "get",
                'Content-type': "application/json",
                withcredentials: true,
                headers: { ClientAuth: token }
            });
        },

        //autocomplete wants a particular type of promise and return data to work, so we have to repeat the get function
        SearchGet: function (url) {
            return $http.get(
                $rootScope.Config.BaseURL + url,
                {
                    'Content-type': "application/json",
                    withcredentials: true,
                    headers: { ClientAuth: token }
                });
        },

        ///////////////////////////////////////////////////////////////////////////////////////////
        // Setters

        //update
        Update: function (url, model) { return service.Upsert(url, model, "PUT"); },

        //insert
        Insert: function (url, model) { return service.Upsert(url, model, "POST"); },

        //delete verb
        Delete: function (url) {
            return $http({
                url: $rootScope.Config.BaseURL + url,
                method: "DELETE",
                'Content-type': "application/json",
                headers: { ClientAuth: token }
            });
        },

        ///////////////////////////////////////////////////////////////////////////////////////////

        //upload a file
        Upload: function (url, file, filename) {
            var defered = $q.defer();
            var r = new FileReader();

            r.onloadend = function (e) {
                var data = e.target.result;

                var fd = new FormData();
                fd.append(filename, data);

                $http.post($rootScope.Config.BaseURL + url, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        ClientAuth: token,
                        "Content-Type": undefined   //angular needs this undefined to upload files
                    }
                })
                .success(function () {
                    defered.resolve();
                })
                .error(function (data) {
                    defered.reject(data);
                });
            }

            r.readAsBinaryString(file);

            return defered.promise;
        },

        ///////////////////////////////////////////////////////////////////////////////////////////
        // helper functions

        //helper to clear a model.  the model must be of the format {rows:[], loading:false, count: 0 }
        Clear: function (model) {
            model.rows = [];
            model.loading = false;
            model.count = 0;
        },

        //gets and populates the passed in model.  the model must be of the format {rows:[], loading:false, count: 0 }
        GetAndPopulate: function (url, model) {
            model.loading = true;
            service.Get(url)
            .success(function (data) {
                model.rows = data;
                model.loading = false
                model.count = data.length;
            })
            .error(function (data, status, headers, config) {
                service.Clear(model);
                $rootScope.$broadcast("error", status, 'url = ' + url, config)
            });
        },

        //upsert, use POST or PUT verb
        Upsert: function (url, model, verb) {
            return $http({
                url: $rootScope.Config.BaseURL + url,
                data: model,
                method: verb,
                'Content-type': "application/json",
                headers: { ClientAuth: token }
            });
        },

    }

    return service;
}]);



