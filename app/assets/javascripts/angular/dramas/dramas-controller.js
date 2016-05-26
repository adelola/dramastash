(function(){
'use strict';

angular
  .module('secondLead')

  .controller('DramasCtrl', [
    'dramas',
    'DramaModel',
    'Gridster',
    'ListModel',
    '$location',
    'page',
    'Restangular',
    'UserModel',
    function (dramas, DramaModel, Gridster, ListModel, $location, page, Restangular, UserModel){
    var ctrl = this;
    ctrl.items = dramas.items;
    ctrl.user = '';
    ctrl.totalDramas = dramas.count;
    ctrl.selectedList = {};
    ctrl.pageSize = 24;
    ctrl.pagination = {
      current: page
    };

    var initialize = function () {
      if (UserModel.currentUser()) {
        ctrl.user = UserModel.currentUser();
        ctrl.userLists = ListModel.currentUserLists(ctrl.user.id);
      }
    };
    initialize();

    ctrl.pageChanged = function(newPage) {
      $location.url('/dramas?page=' + newPage);
    };

    ctrl.gridsterOpts = {
      columns: 4,
      width: 'auto',
      colWidth: 'auto',
      rowHeight: 'match',
      margins: [5, 5],
      outerMargin: true,
      isMobile: true,
      mobileBreakPoint: 750,
      mobileModeEnabled: true,
      minColumns: 1,
      minRows: 2,
      maxRows: 100,
      defaultSizeX: 1,
      defaultSizeY: 1,
      minSizeX: 1,
      maxSizeX: null,
      minSizeY: 1,
      maxSizeY: null,
      resizable: {
         enabled: false
      },
      draggable: {
         enabled: false
      }
    };

  }])

})();
