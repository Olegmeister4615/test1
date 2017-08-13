angular.module('app').controller('mainCtrl',function($scope,$rootScope,sessionFactory){
//загружает в scope сессию для дальнейших запросов
$rootScope.$on('session:loaded',function(){
    console.log('realy&!&!');
    $scope.sessionId=sessionFactory.getSession();
    console.log($scope.sessionId);
    //можно слать другие запросы к api
    $scope.$broadcast('session:geted');
})

})