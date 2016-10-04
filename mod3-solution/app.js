(function () {
'use strict';

angular.module("NarrowItDownApp",[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems);

NarrowItDownController.$inject =['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	  var narrowCtrl = this;
	  narrowCtrl.narrow = function() {
		   MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm).then(function(foundList) {
			  narrowCtrl.found = foundList;
		  });
	  }; 
	  
	  narrowCtrl.removeItem = function(index) {
		  narrowCtrl.found.splice(index,1);
	  }
}


function FoundItems() {
	return {
		scope: {
			found: '<',
			onRemove: '&'
		},
		controller: ShoppingListDirectiveController,
		controllerAs: 'list',
		bindToController: true,
		templateUrl : "foundItems.html"
	};
}

function ShoppingListDirectiveController() {
  var list = this;
  list.empty = function() {
	  if(list.found.length == 0) {
		  return true;
	  }
	  
	  return false;
  } 
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;
	
	service.getMatchedMenuItems = function(searchTerm) {
		return $http({
			method : "GET",
			url : (" https://davids-restaurant.herokuapp.com/menu_items.json")
		}).then(function(result){
			var items = result.data.menu_items;
			var foundItems = [];
			for (var i =0; i<items.length;i++) {
				if(items[i].description.includes(searchTerm)) {
					foundItems.push(items[i]);
				}
			}
			return foundItems;
		});
	};
	
}
	
})();
