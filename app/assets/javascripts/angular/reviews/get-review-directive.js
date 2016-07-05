angular.module('secondLead')
  .directive('getReview', [ 'ReviewModel', 'store',function (ReviewModel, store){

    return {
	  restrict : 'E',
	  templateUrl : 'get-review.html',
	  scope : {
	    drama : '=',
      userId : '@'
	  },
	  link : function (scope, elem, attrs){
		var dramaId = scope.drama.id;
	  	var initialize = function () {
	  	  ReviewModel.find(dramaId, scope.userId).then(function (result){
          if (result.errors) {
	  	  	  scope.review = "";
	  	  	} else {
		  	scope.review= result.review.body;
		  	scope.reviewId = result.review.id;
		  	}
		  })
	  	};
	  	initialize();

	  }

	};

  }]);
