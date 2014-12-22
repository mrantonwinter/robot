///////////////////////////////////////////////////////////////////////////////////////////////////
// Error controller, handles broadcast error messages to show to the user

app.controller('ErrorController', function ($scope, $rootScope, ModalService) {
    $scope.ShowError = true;

    $scope.Errors = [
    ];

    //remove our error 
    $scope.RemoveError = function (error) {
        $scope.Errors = _.without($scope.Errors, error);
    }

    // handle pub-sub broadcast event for error
    $rootScope.$on("error", function (scope,errorCode, errorMessage, errorDetail) {
        $scope.Errors.push({ ErrorCode: errorCode, ErrorMessage: errorMessage, ErrorDetail: errorDetail });
        $scope.ShowError = true;
    });

    //handle pub-sub broadcast for popup errors
    $rootScope.$on("errorpopup", function (scope, title, message) {
        ModalService.Message(title, message);
    });

    

});

