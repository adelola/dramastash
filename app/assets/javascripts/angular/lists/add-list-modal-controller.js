angular
  .module('secondLead')
  .controller('AddListModalCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance){

    $scope.name = null;
    $scope.description =null;

    $scope.close = function () {
      console.log('closing');
      $uibModalInstance.close({name:$scope.name , description: $scope.description});
    };

    $scope.cancel = function () {
      console.log('canceling');
      $uibModalInstance.dismiss('cancel');
    };
  }]);
