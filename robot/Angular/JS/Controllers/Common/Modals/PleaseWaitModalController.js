///////////////////////////////////////////////////////////////////////////////////////////////////
// please wait modal dialog box controller

app.controller('PleaseWaitModalController', function ($scope, $rootScope, $modalInstance, Title, Message) {
    $scope.Title = Title;
    $scope.Message = Message;

    //listen for 'closemodal' events and close the modal
    $rootScope.$on('closemodal', function () { $modalInstance.close("closemodal"); });
});