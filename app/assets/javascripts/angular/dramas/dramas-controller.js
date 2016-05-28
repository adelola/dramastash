(function(){
'use strict';

angular
  .module('secondLead')

  .controller('DramasCtrl', [
    'results',
    'DramaModel',
    'Gridster',
    '$httpParamSerializer',
    'ListModel',
    '$location',
    'page',
    'Restangular',
    'UserModel',
    function (results, DramaModel, Gridster, $httpParamSerializer, ListModel, $location, page, Restangular, UserModel){
    var ctrl = this;
    ctrl.items = results.items;
    ctrl.user = '';
    ctrl.totalDramas = results.count;
    ctrl.selectedList = {};
    ctrl.pageSize = 2;
    ctrl.filterItems = '';
    ctrl.selectedGenres = [];
    ctrl.selectedCountry = [];
    var currentPage = page || 1;
    ctrl.pagination = {
      current: currentPage
    };

    var initialize = function () {
      if (UserModel.currentUser()) {
        ctrl.user = UserModel.currentUser();
        ctrl.userLists = ListModel.currentUserLists(ctrl.user.id);
      }
    };
    initialize();

    ctrl.pageChanged = function(newPage) {
      // var genreItems = $httpParamSerializer({ genre: ctrl.selectedGenres });
      // var countryItems = $httpParamSerializer({ country: ctrl.selectedCountry });
      console.log($location.url({page: newPage}));
      // $location.url('/dramas?&'+genreItems+'&'+countryItems+'&page=' + newPage);
      // $location.url({page: newPage});
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
