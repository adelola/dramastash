angular.module('secondLead')
  .directive('dramasFilter', ['DramaModel', function (DramaModel) {
  	return {
  	  restrict: 'E',
  	  templateUrl:'filter-bar.html',
  	  scope: {
        items: "="
  	  },
	  link: function (scope, element, attrs) {
      scope.genreItems = [
        {name: "Action", value: "Action & Adventure", ticked: false},
        {name: "Comedy", value: "Comedy", ticked: false}, 
        {name: "Historical", value: "Historical", ticked: false}, 
        {name: "Idol", value: "Idol Drama", ticked: false}, 
        {name: "Melodrama", value: "Melodrama", ticked: false}, 
        {name: "Mystery", value: "Crime & Mystery", ticked: false}, 
        {name: "Supernatural", value: "SciFi & Fantasy", ticked: false}, 
        {name: "Thriller", value: "Action / Thriller", ticked: false} 
      ];

      scope.countryItem = [
        {name: "China", ticked: false}, 
        {name: "Hong Kong", ticked: false},
        {name: "Japan", ticked: false}, 
        {name: "Korea", ticked: false}, 
        {name: "Taiwan", ticked: false}
      ];

      scope.selectedGenres = [];
      scope.selectedCountry = [];

      scope.filter = function () {
        event.preventDefault();
        DramaModel.getSome(scope.selectedGenres, scope.selectedCountry)
          .then( function(result){
            scope.items = result.dramas; 
        });
        
      };
	  }
	}
}])