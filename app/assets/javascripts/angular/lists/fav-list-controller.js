(function(){
'use strict';

angular
  .module('secondLead')

  .controller('FavListCtrl', [
    'fav_dramas',
    'fav_list',
    'Gridster',
    'ListModel',  
    'user',
    'UserModel',
    function (fav_dramas, fav_list, Gridster, ListModel, user, UserModel){
    var ctrl = this;
    ctrl.dramas = fav_dramas;
    ctrl.id = fav_list.id;
    ctrl.name = "Top 5";
    ctrl.description = "Greatest of All Time";
    ctrl.userID = user.user.id;
    ctrl.selectedList = {};

    var initialize = function () {
        ctrl.userLists = ListModel.currentUserLists(ctrl.userID);
    };
    initialize();

    var currentUser = UserModel.currentUser().id;
    ctrl.authorized = function () {
      if ( ctrl.userID === currentUser) {
        return true
      }
    };

    ctrl.removeItem = function (item){
      ctrl.items.splice(ctrl.items.indexOf(item),1)
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
