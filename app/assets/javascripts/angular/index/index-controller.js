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
    ctrl.activities ='';
    
    var initialize = function () {
      if (UserModel.currentUser()) {
        ctrl.user = UserModel.currentUser();
        ctrl.userLists = ListModel.currentUserLists(ctrl.user.id);
        getActivities();
      } 
    };
    initialize();

    ctrl.test = function () {
      console.log(ctrl.activities);
      
    }


    function getActivities () {
    	ActivityModel.getAll(ctrl.user.id).then(function(result){
        ctrl.activities = result.activities;
      })     
    };

  }])

})();
