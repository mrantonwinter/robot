///////////////////////////////////////////////////////////////////////////////////////////////////
// Modal service, used for all modal dialog boxes

app.factory('ModalService', ['$rootScope', '$modal', function ($rootScope, $modal) {

    var service = {

        ///////////////////////////////////////////////////////////////////////////////////////////

        Confirmation: function (title, message) {
            return service.Show(title, message, 'ConfirmationModalView.html', 'ConfirmationModalController');
        },

        ///////////////////////////////////////////////////////////////////////////////////////////

        Message: function (title, message) {
            return service.Show(title, message, 'MessageModalView.html', 'MessageModalController');
        },


        ///////////////////////////////////////////////////////////////////////////////////////////

        PleaseWait: function (message) {
            return service.Show('Please wait', message, 'PleaseWaitModalView.html', 'PleaseWaitModalController');
        },

        ///////////////////////////////////////////////////////////////////////////////////////////
        // helper functions

        //used to show a modal dialog box based on a html view and a controller for the view
        Show: function (title, message, view, controller) {
            service.CloseAll();

            var modalInstance = $modal.open({
                templateUrl: view,
                controller: controller,
                resolve: {
                    Title: function () { return title; },
                    Message: function () { return message; }
                }
            });

            return modalInstance.result;
        },

        CloseAll: function () {
            $rootScope.$broadcast('closemodal');//close all open modals
        }


    }

    return service;
}]);



