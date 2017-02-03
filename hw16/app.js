angular.module("myApp",[])
	.controller("firstCtrl", function($scope, $http){
		//Временная переменная
		//$scope.tempInput = "test";
		//Хранилище для всех заданий
		/*$scope.tasksArr = [
			{ 
				"text": "Chocolate",
				"done": "true"
			},
			{
				"text": "Potato",
				"done": false 
			},
			{ 
				"text": "Banana",
				"done": false 
			},
			{ 
				"text": "Water", 
				"done": true 
			}
		];*/
		//Писать массив в localStorage
		$scope.tasksArr = JSON.parse(localStorage.getItem('tasksArr')) || []

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

		//Изменить пункт
		$scope.toggleEditMode = function(){
       $(event.target).closest('li').toggleClass('editing');
    };
  	$scope.editOnEnter = function(item){
      if(event.keyCode == 13 && item.text){
          $scope.toggleEditMode();
      }
  	};

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


