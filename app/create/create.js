angular.module("myApp.create", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $http) {
	  $routeProvider.when('/create', {
	    templateUrl: 'create/create.html',
	    controller: 'CreateCtrl'
	  });
	}])


	//http://jsfiddle.net/timriley/GVCP2/
	.controller('CreateCtrl',['$scope', '$http', 'questionAPI',function($scope,$http, questionAPI) {


			var begin =  function(){

					
				$scope.questions = [];	

				$scope.types = ["Multipla Escolha"];
				loadQuestion();
			}

			var loadQuestion = function() {
				questionAPI.getQuestions().success(function(data, status) {
					$scope.questions = data;

				});
			}


			$scope.addQuestion = function(question){

				$http.post("http://localhost:3412/questions", question).success(function(data) {

				delete $scope.question;
				loadQuestion();
				});


			}


			$scope.isQuestionSelected = function (questions){
					return questions.some(function (question){
						return question.selected;
				});
			}


			$scope.deleteQuestion = function(questions){

				$http.delete("http://localhost:3412/questions",questions[0]).success(function(data) {


					$scope.questions = questions.filter(function(question){
					if (!question.selected){
							 return question;
					}	 
					});	

					

				});

			}

			$scope.enableEditQuestion = function(question){

				$scope.questionBeEdit = question; 
				$scope.editEnable = true;


			}

			$scope.saveEditQuestion = function(question) {

				$scope.questions.forEach(function(quest) {
					if(quest.message == $scope.questionBeEdit.message){

						quest.message = question.msg;
						$scope.editEnable = false;


					}

				});

			}

			var removeLocalStorage = function(questions){

				var dado = localStorage.getItem("questions");
				var array = JSON.parse(dado);

				array = questions.filter(function(question){
					if(!question.selected) return question;
				});
				localStorage.setItem("questions", JSON.stringify(array));

			}

			begin();
			


	}])


