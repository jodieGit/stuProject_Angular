/**
 * Created with JetBrains WebStorm.
 * User: wwz07651
 * Date: 15-6-10
 * Time: 上午10:13
 * To change this template use File | Settings | File Templates.
 */

//1
//angular.module("myApp",[])
//.controller('MyController',
//function($scope,$parse){
//    $scope.$watch('expr',function(newVal,oldVal,scope){
//        if(newVal!==oldVal){
//        //用该表达式设置parseFun
//            var parseFun=$parse(newVal);
//        //获取经过解析后表达式的值
//            $scope.parsedValue=parseFun(scope);
//        }
//    })
//})

//2
//angular.module('myApp',[])
//    .controller('MyController',function($scope,$interpolate){
////        设置监听
//        $scope.$watch('emailBody',function(body){
//            if(body){
//                var template=$interpolate(body);
//                $scope.previewText=template({to:$scope.to});
//            }
//        });
//    })

//3
angular.module('emailParse',[])
    .config(['$interpolateProvider',function($interpolateProvider){
        $interpolateProvider.startSymbol("__");
        $interpolateProvider.endSymbol("__");
    }])
    .factory('EmailParser',['$interpolate',function($interpolate){
        return{
            parse:function(text,context){
                var template=$interpolate(text);
                return template(context);
            }
        }
    }])

angular.module('myApp',['emailParser'])
    .controller('MyController',['$scope','EmailParser',function(body){
    if(body){
        $scope.previewText=EmailParser.parse(body,{
            to:$scope.to
        });
    }
}])