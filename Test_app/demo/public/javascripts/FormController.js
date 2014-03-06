app.controller('FormController', function ($scope, $rootScope, ngProgress, $http, $upload, $timeout, usSpinnerService) {
    if (!$scope.images)
        $scope.images = [];
    $scope.alertAppear = false;
    $scope.tog = 1;
    $scope.formHide = false;
    $scope.state = null;
    $rootScope.$on('$viewContentLoading', function () {
        ngProgress.stop();
        ngProgress.set(0);
        ngProgress.start();
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.state = toState;
    });
    $rootScope.$on('$viewContentLoaded', function () {
        ngProgress.complete();

    });
    $scope.onFileSelect = function ($files) {
        ngProgress.start();
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/post',
                file: file
            }).progress(function (evt) {
                    ngProgress.set(parseInt(100.0 * evt.loaded / evt.total));
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    // file is uploaded successfully
                    ngProgress.complete();
                    console.log(data);
                    if (data.result == 'ok') {
                        $scope.images.push(data.path);
                        console.log($scope.images);
                    }
                }).error(function () {
                    ngProgress.reset();
                    alert("Error! File not upload!");

                });
        }
    };
    $scope.customLoad = function () {
        $scope.formHide = true;
        usSpinnerService.spin('spinner-1');

        $timeout(function () {
            usSpinnerService.stop('spinner-1');
            $scope.alertAppear = true;
        }, 1500);
    }
    $scope.customReset = function () {
        $scope.formHide = false;
        $scope.alertAppear = false;
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";
        $scope.location = "";
    }

});
