(function () {
'use strict';

angular.module("LunchCheck",[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
	  
function LunchCheckController($scope) {
	
	$scope.lunchMenu = "";
	$scope.message = "";
	
	$scope.checkLunch = function() {
		if($scope.message == "") {
			$scope.message = "Please enter data first";
		} else {
			var arrayOfStrings = $scope.lunchMenu.split(',');
			if(arrayOfStrings.length <= 3) {
				$scope.message = "Enjoy!";
			} else {
				$scope.message = "Too much!";
			}
		}
	}
		  
}

	
})();
