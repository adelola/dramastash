angular
  .module('secondLead')
  .controller('WarningModalCtrl',[ '$scope', '$uibModalInstance', function ($scope, $uibModalInstance){

    $scope.ok = function () {
      $uibModalInstance.close({confirmation: true});
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
