var myApp = angular.module('myApp', []);
myApp.controller('FindBrokenLinkCtrl', ['$scope', '$http', function($scope, $http){
	$scope.getBrokenLinks =  function(){
		console.log($scope);
		$http.post('/getBrokenLinks',{'brokenLinkUrl': $scope.brokenLink})
		.then(function(response){
			$scope.urls = response.data;
		})
	}
}])