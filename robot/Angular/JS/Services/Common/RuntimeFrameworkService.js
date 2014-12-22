///////////////////////////////////////////////////////////////////////////////////////////////////
// RuntimeFramework - common non UI based functionality


app.factory('RuntimeFrameworkService', ['$rootScope', function ($rootScope) {

    var service = {

        ///////////////////////////////////////////////////////////////////////////////////////////

        //creates a clone of an object 
        Clone: function (obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        //sets the values of the first object from the values of the second obj
        LoadFrom: function (firstObj, secondObj) {
            for (var k in secondObj) firstObj[k] = secondObj[k];
        },


        NullOrValue: function (obj, key) {
            return obj == null ? 'null' : obj[key];
        },

        NullOrValueRemoveSlash: function (str) {
            return str == null || str == '' ? 'null' : service.RemoveSlash(str);
        },

        RemoveSlash: function (str) {
            return str.replace(/\//g, '');
        },

        SlashToArray: function (str) {

            return str == null ? [] : _.without(str.split('/'), "");
        },

        //helper function to remove ids from a slash delimited list
        RemoveID: function (str, id) {
            str = str.replace(String(id) + "/", "");
            return str == "/" ? "" : str;
        },

        HasID: function (str, id) {
            id = '/' + id + '/';
            return str == null ? false : (str.indexOf(id) >= 0);
        },

        // helper function to add an id to a slash delimited list
        AddID: function (str, id) {
            str = str == null ? '' : str;
            str += (str == '' ? '/' : '') + id + '/';
            return str;
        },

        RemoveFromRows: function (rows, key, id) {
            return _.reject(rows, function (row) { return row[key] == id });
        }
    }

    return service;
}]);
