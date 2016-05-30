angular.module('secondLead')
  .directive('addDrama', ['DramaModel', '$mdToast', function (DramaModel, $mdToast) {
  	return {
  	  restrict: 'E',
  	  templateUrl:'add-drama.html',
  	  scope: {
  	  	drama: "=",
  	  	userLists: "=",
  	  	user: "@",
  	  	selectedList:"@"
  	  },
	  link: function (scope, element, attrs) {      
	  	scope.addToList = function (list, drama) {
	  	  DramaModel.add(scope.user, list, drama).then(function(response){
          $mdToast.show($mdToast.simple().textContent(response.message).position('right').hideDelay(2000));
        });
	  	  scope.selectedList = "";
	  	};
	  }
	}
}])
