angular.module("myApp",[])
	.controller("firstCtrl", function($scope, $http){
		//Создаем временную переменную
		//$scope.tempInput = "тестовое";
		//создаем хранилище для всех заданий
		var myApp = angular.module('myApp', []);
		myApp.controller('firstCtrl', function ($scope, $http){
			$http.get('file.json').success(function(data) {
				$scope.tasksArr = data;
			});
		});
});

/*
		//Создаем функцию, которая переносит из временного хранилища в общие задания
		$scope.addNew = function(){
			if($scope.tempInput){
				$scope.tasksArr.push($scope.tempInput);
				$scope.tempInput = "";
			} else {
				alert("Нет задания!");
			}
		}

		$scope.deleteItem = function(item){
			var index = $scope.tasksArr.indexOf(item);
			$scope.tasksArr.splice(index, 1);
		}



});*/