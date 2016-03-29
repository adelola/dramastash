(function(){
  'use strict';

  angular
    .module('secondLead')

    .controller('ListsCtrl', [
      'Gridster',
      'ListModel',
      'lists',
      'fav_list',
      'fav_dramas',
      '$scope',
      '$stateParams',
      '$uibModal',
      'UserModel',
      function (Gridster, ListModel, lists, fav_list, fav_dramas, $scope, $stateParams, $uibModal, UserModel){
      var ctrl        = this;
      ctrl.items      = lists;
      ctrl.fav_list   = fav_list;
      ctrl.fav_dramas = fav_dramas;
      ctrl.userID     = $stateParams.userID;

      var currentUser = UserModel.currentUser().id.toString();

      ctrl.authorized = function () {
        if ( ctrl.userID === currentUser) {
          return true
        }
      };

      var createList = function (listParams){
        ListModel.create(listParams).then(function(result){
        ctrl.items.push(result.list);
        });
      };

      ctrl.showModal = function () {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'add-list.html',
          controller: 'AddListModalCtrl',
          size: 'lg'
        });

        modalInstance.result.then(function (result){
          createList(result);
        });
      };

      ctrl.removeItem = function (item){
        ctrl.items.splice(ctrl.items.indexOf(item),1);
      };

      ctrl.removeDrama = function (drama){
        ctrl.fav_dramas.splice(ctrl.fav_dramas.indexOf(drama),1)
      }

      ctrl.gridsterOpts = Gridster.getOptions();
      ctrl.gridsterFavListOpts = {
        columns: 5,
        width: 'auto',
        colWidth: 'auto',
        rowHeight: 'match',
        margins: [5, 5],
        outerMargin: true,
        isMobile: false,
        mobileBreakPoint: 750,
        mobileModeEnabled: true,
        minColumns: 5,
        minRows: 1,
        maxRows: 1,
        defaultSizeX: 1,
        defaultSizeY: 1,
        minSizeX: 1,
        maxSizeX: 1,
        minSizeY: 1,
        maxSizeY: 1,
        swapping: true,
        resizable: {
           enabled: false
        },
        draggable: {
           enabled: false
        }
      };
    }])
})();
