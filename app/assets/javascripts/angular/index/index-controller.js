(function(){
'use strict';

angular
  .module('secondLead')

  .controller('IndexCtrl', [
    'ActivityModel',
    '$http',
    function (ActivityModel, $http) {
    var ctrl = this;

    ctrl.name = "Lola";
    ctrl.test = function() {
    	ctrl.name = ActivityModel.getAll;
    	console.log(ctrl.name);
    };

  }])

})();
