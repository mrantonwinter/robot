///////////////////////////////////////////////////////////////////////////////////////////////////
// confirmation modal dialog box controller

app.controller('ConfirmationModalController', function ($scope, $rootScope, $modalInstance, Title, Message) {

    $scope.Title = Title;
    $scope.Message = Message;

    $scope.Ok = function () {
        $modalInstance.close("ok");
    };

    $scope.Cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    //listen for 'closemodal' events and close the modal
    $rootScope.$on('closemodal', function () { $modalInstance.close("closemodal"); });
});