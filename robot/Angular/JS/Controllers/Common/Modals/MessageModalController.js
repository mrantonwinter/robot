///////////////////////////////////////////////////////////////////////////////////////////////////
// message modal dialog box controller

app.controller('MessageModalController', function ($scope, $rootScope, $modalInstance, Title, Message) {

    $scope.Title = Title;
    $scope.Message = Message;

    $scope.Ok = function () {
        $modalInstance.close("ok");
    };

    //listen for 'closemodal' events and close the modal
    $rootScope.$on('closemodal', function () { $modalInstance.close("closemodal"); });

});