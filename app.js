(function() {
	'use strict';

	angular.module('NarrowItDownApp', []).controller('NarrowItDownController',
			NarrowItDownController)
			.directive('foundItems', FoundItemsDirective).service(
					'MenuSearchService', MenuSearchService);

	NarrowItDownController.$inject = [ 'MenuSearchService' ];
	function NarrowItDownController(MenuSearchService) {
		var list = this;
		list.searchTerm = "";
		list.items = [];
		list.onRemove = function(index) {
			list.items.splice(index, 1);
		};
		list.getMatchedItems = function(searchTerm) {
			MenuSearchService.getMatchedMenuItems(searchTerm).then(function(response){
				 list.items  = response.data.menu_items;
				 if(searchTerm === undefined || searchTerm === '') return;
				 var found = [];
				for(var idx  in list.items){
					if(list.items[idx].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
						found.push(list.items[idx]);
					}
				}
				list.items = found;
			}).catch(function(error){
				console.log("something went wrong");
			});
		}

	}

	MenuSearchService.$inject = [ '$http' ];
	function MenuSearchService($http) {
		var service = this;
		service.getMatchedMenuItems = function(searchTerm) {
			var response = $http({
				url : 'https://davids-restaurant.herokuapp.com/menu_items.json',
				params:{param:searchTerm}
			})
			return response;
		}

	}
	
	FoundItemsDirective.$inject = [ 'MenuSearchService' ];
	function FoundItemsDirective(MenuSearchService) {
		var ddo = {
			scope : {
				items : '<',
				onRemove : '&'
			},
			templateUrl : 'listItem.html'
		};
		return ddo;
	}


})();
