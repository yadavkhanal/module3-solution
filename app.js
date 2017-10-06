(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
			.controller('NarrowItDownController ', NarrowItDownController )
			.directive('foundItems', FoundItems)
			.service('MenuSearchService', MenuSearchService);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var vm = this;
		
	}
	
	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
		var service = this;
		var getMatchedMenuItems = function(searchTerm){
			return $http('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
			    // process result and only keep items that match
			    var foundItems = result.data;

			    // return processed items
			    return foundItems;
			});
		}
		
	}
	
	foundItems.$inject = ['MenuSearchService'];
	function FoundItems(MenuSearchService){
		return {
			templateUrl:'listItem.html'
			
		};
	}

})();
