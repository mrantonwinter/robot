app.controller("Angular", function ($scope, $rootScope, $http, $compile, StoredProcService, TemplateService) {

    $scope.Model = StoredProcService.Model;
    StoredProcService.Init();

    $scope.Title = "Angular";
    $scope.Project = "MyProject"
    $scope.Search = {
        StoredProc: ""
    };
    $scope.Data = { Project: "test" };

    $scope.Detail = "";
    $scope.DetailHTML = "";
    $scope.Templates = {
        Master: null,
        Detail: null
    }


    $scope.Templates = ["Angular/Views/Common/RawData.html", "Angular/Views/Angular/Layout.html", "Angular/Views/Angular/Master.html", "Angular/Views/Angular/Detail.html", "Angular/Views/Angular/Controller.html", "Angular/Views/Angular/Service.html"];

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
                    CalcDetailHTML();
                })
                .error(function (data) {

                });
        }
    }
    function CalcDetailHTML() {
        $http.get('/CodeTemplates/Angular/Detail.html')
        .success(function (data) {
            $scope.Templates.Detail = data;
            //            UpdateTemplates();
        })
        .error(function (data) {
            console.log(data);
        });
    }

    //$scope.$watch('Data.Project', function () {
    //    UpdateTemplates();
    //});

    //function UpdateTemplates() {
    //if ($scope.DetailTemplate != null)
    //    $('#detailpreview').html($compile($scope.DetailTemplate)($scope));

    //}

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