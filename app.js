(function() {
	'use strict';

	angular.module('NarrowItDownApp', []).controller('NarrowItDownController',
			NarrowItDownController)
			.directive('foundItems', FoundItemsDirective).service(
					'MenuSearchService', MenuSearchService);

	NarrowItDownController.$inject = [ 'MenuSearchService','$scope' ];
	function NarrowItDownController(MenuSearchService, $scope) {
		var list = this;
		list.searchTerm = "";
		list.items = [];
		list.onRemove = function(index) {
			list.items.splice(index, 1);
		};
		list.getMatchedItems = function() {
			MenuSearchService.getMatchedMenuItems(list.searchTerm ).then(function(response){				 
				 if(list.searchTerm  === undefined || list.searchTerm  === '') {
					 list.items=[];
					 return;
				 }
				 list.items  = response.data.menu_items;
				 var found = [];
				for(var idx  in list.items){
					if(list.items[idx].description.toLowerCase().indexOf(list.searchTerm.toLowerCase()) !== -1){
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
			templateUrl : 'listItem.html',
			controller:FoundItemsDirectiveController,
			bindToController:true,
			controllerAs:'list',
			link: FoundItemsDirectiveLink

		};
		return ddo;
	}
	
	function FoundItemsDirectiveController(){	
	}
	
	function FoundItemsDirectiveLink(scope,element, attrs, controller){
		scope.$watch('list.items',function(oldVal, newVal){
			if(newVal !== oldVal){
				if(controller.items.length == 0){
					element.find('div.error').css('display','block');
				}else{
					element.find('div.error').css('display','none');
				}
			}
		});
	}
	
})();
