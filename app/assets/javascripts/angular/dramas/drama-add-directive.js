angular.module('secondLead')
  .directive('addDrama', ['DramaModel', 'ngToast', function (DramaModel, ngToast) {
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
          ngToast.create(response.message);
        });
	  	  scope.selectedList = "";
	  	};
	  }
	}
}])
