/**
 * Created with JetBrains WebStorm.
 * User: wwz07651
 * Date: 15-6-9
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */

//4.1
//function MyController($scope,$timeout){
//    var updateClock=function(){
//        $scope.clock=new Date();
//        $timeout(function(){
//            updateClock();
//        },1000);
//    };
//    updateClock();
//}

//4.2
function MyController($scope){
    $scope.clock={
        now:new Date()
    }
    var updateClock=function(){
        $scope.clock.now=new Date();
    };
    setInterval(function(){
        $scope.$apply(updateClock);
    },1000);
    updateClock();
}

//$rootScope的使用
angular.module('myApp',[])
    .run(function($rootScope){
        $rootScope.name="World";
    })

//$scope的使用，需创建controller
angular.module("myApp",[])
.controller("MyController1",
function($scope){
    $scope.name="Ari"
});

