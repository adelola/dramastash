(function(){
'use strict';

angular
  .module('secondLead')

  .controller('DramasCtrl', [
    'DramaModel',
    'Gridster',
    'ListModel',
    'Restangular',
    'UserModel',
    function (DramaModel, Gridster, ListModel, Restangular, UserModel){
    var ctrl = this;
    ctrl.items = '';
    ctrl.user = '';
    ctrl.totalDramas = 0;
    ctrl.selectedList = {};
    // ctrl.currentPage = 1;
    ctrl.pageSize = 24;
    ctrl.pagination = {
      current: 1
    };
    var initialize = function () {
      DramaModel.getPage(1).then(function(result) {
        ctrl.items = result.data.items;
        ctrl.totalDramas = result.data.count
      });
      if (UserModel.currentUser()) {
        ctrl.user = UserModel.currentUser();
        ctrl.userLists = ListModel.currentUserLists(ctrl.user.id);
      }
    };
    initialize();

    ctrl.pageChanged = function(newPage) {
      console.log("Getting new dramas");
      DramaModel.getPage(newPage).then(function(result) {
        ctrl.items = result.data.items;
        ctrl.totalDramas = result.data.count;
        ctrl.currentPage = newPage;
      });
    };

    ctrl.gridsterOpts = {
        columns: 4,
        width: 'auto',
        colWidth: 'auto',
        rowHeight: 'match',
        margins: [5, 5],
        outerMargin: true,
        isMobile: false,
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
