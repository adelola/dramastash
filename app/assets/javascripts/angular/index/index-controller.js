(function(){
'use strict';

angular
  .module('secondLead')

  .controller('IndexCtrl', [
    'ActivityModel',
    '$http',
    'ListModel',
    'UserModel',
    function (ActivityModel, $http, ListModel, UserModel) {
    var ctrl = this;

    ctrl.user = '';
    
    var initialize = function () {
      if (UserModel.currentUser()) {
        ctrl.user = UserModel.currentUser();
        ctrl.userLists = ListModel.currentUserLists(ctrl.user.id);
      } 
    };
    initialize();

    ctrl.test = function() {
    	ActivityModel.getAll(ctrl.user.id).then(function(result){
        console.log(result);
      })
      
    };

  }])

})();
