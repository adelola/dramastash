(function(){
'use strict';

angular
  .module('secondLead')

  .controller('IndexCtrl', [
    'ActivityModel',
    '$http',
    'ListModel',
    'lists',
    'UserModel',
    function (ActivityModel, $http, ListModel, lists, UserModel) {
    var ctrl = this;
    ctrl.user = '';
    ctrl.activities ='';
    ctrl.featured = lists;

    var initialize = function () {
      if (UserModel.currentUser()) {
        ctrl.user = UserModel.currentUser();
        ctrl.userLists = ListModel.currentUserLists(ctrl.user.id);
        getActivities();
      }
    };
    initialize();


    function getActivities () {
    	ActivityModel.getAll(ctrl.user.id).then(function(result){
        ctrl.activities = result.activities;
      })
    };

  }])

})();
