var app = angular.module("myApp",[]);
	app.controller("firstCtrl", function($scope, $location){
		//Писать массив в localStorage
		$scope.tasksArr = JSON.parse(localStorage.getItem('tasksArr')) || []
		//Выбрать все
		$scope.checkAllTask = function (allCheck){
			$scope.tasksArr.forEach(function(task){
				task.done = allCheck;
			})
		}
		//Перенести из временного хранилища в общие задания
		$scope.addTask = function(){
			$scope.tasksArr.unshift({ text: $scope.tempInput, done: false });
			$scope.tempInput = "";
		}
		//Удалить пункт
		$scope.deleteTask = function(){
			$scope.tasksArr = $scope.tasksArr.filter(function(item){
				return !item.done
			})
		}
		//Filter
		$scope.statusFilter = {};
		if ($location.path() == ''){ $location.path('/')}
			$scope.location = $location;
			$scope.$watch('location.path()', function (path){
				$scope.statusFilter = 
				(path == '/active') ? {done: false} : 
				(path == '/done') ? {done : true} : 
				null;
			});
		//Изменить пункт
		$scope.toggle = false;
		//Изменение данных
		$scope.$watch('tasksArr',function(newVal,oldVal){
			if(newVal!=oldVal){
				localStorage.setItem('tasksArr',JSON.stringify(newVal))
			}
			},true)
		//Счетчик остатка
		$scope.remain = function () {
				var count = $scope.tasksArr.length;
				angular.forEach($scope.tasksArr, function(item) {
					var sObj = JSON.stringify($scope.tasksArr);
					localStorage.setItem("tasksArr", sObj);
					count -= item.done;
				});
				return count;
		};
});


app.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(task){
			if(task.text.toLowerCase().indexOf(searchString) !== -1){
				result.push(task);
			}
		});
		return result;
	};
});