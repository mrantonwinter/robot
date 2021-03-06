﻿app.controller("WebAPI", function ($scope, $rootScope, StoredProcService, TemplateService) {

    $scope.Model = StoredProcService.Model;
    StoredProcService.Init();

    $scope.Title = "WebAPI";

    $scope.Search = {
        StoredProc: ""
    };

    $scope.Templates = ["Angular/Views/Common/RawData.html", "Angular/Views/WebAPI/Model.html", "Angular/Views/WebAPI/DAL.html", "Angular/Views/WebAPI/Controller.html", "Angular/Views/WebAPI/IService.html", "Angular/Views/WebAPI/Service.html", "Angular/Views/WebAPI/IRepository.html", "Angular/Views/WebAPI/Repository.html"];

    ///////////////////////////////////////////////////////////////////////////////////////////////

    $scope.Selected = null;
    $scope.Detail = null;
    $scope.Model.Name = null;
    $scope.Model.FunctionName = null;

    $scope.Select = function (row) {
        $scope.Detail = null;
        $scope.Selected = row;
        $scope.Model.Name = CalcModelName(row);
        $scope.Model.FunctionName = CalcFunctionName(row);

        if (row != null) {
            StoredProcService.Detail(row)
                .success(function (data) {
                    $scope.Detail = MapTypes(data);
                    $rootScope.$broadcast("loaded");
                })
                .error(function (data) {

                });
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    var replace = {
        //Input params
        "smallint": "int", "int": "int", "varchar": "string", "tinyint": "int", "datetime": "DateTime", "bit": "bool",
        //Output params
        "System.Boolean": "bool", "System.Int32": "int", "System.Int16": "int", "System.Byte": "int", "System.String": "string", "System.DateTime": "DateTime", "System.Decimal": "decimal"
    };

    function MapTypes(data) {
        //MappedType
        if (data != null) {
            if (data.Input != null)
                _.each(data.Input, function (row) { row.MappedType = Map(row) });
            if (data.Output != null)
                _.each(data.Output, function (row) { row.MappedType = Map(row) });
        }

        return data;
    }

    function Map(row) {
        var type = replace[row.Type];

        if (type != "string" && row.Nullable)
            type += "?";

        return type;
    }

    function CalcModelName(name) {
        if (name != null && name.lastIndexOf(".") >= 0) {
            name = name.substring(name.lastIndexOf(".") + 1);
        }

        return name;
    }

    function CalcFunctionName(name) {
        if (name != null) {
            return name.replace(/[.]/g, '');
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // pagination

    $scope.rowsPerPage = 10;
    $scope.currentPage = 1;
    $scope.maxPages = 10;
    $scope.showFirstLast = true;


    $scope.setPage = function (pageNo) { $scope.currentPage = pageNo; };

    //event handler for page change
    $scope.PageChanged = function () {
        $scope.Selected = null;
    };
});