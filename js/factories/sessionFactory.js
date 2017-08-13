angular.module('app').factory('sessionFactory', function($http){

    var service={};
    var sessionId;
    //получение сессии с api
    service.newSession = function($rootScope){
        $http.post('http://frontendtest.xrm.ru/api/Sessions')
            .success(function(result){
                console.log('session gets', result);
                sessionId=result;
                //сессия получена
                $rootScope.$emit('session:loaded');
                return result;
            })
            .error(function(err){
                console.log('session not get',err);
                return null;
            })
    }
    //возвращает код сессии
    service.getSession= function(){
        console.log(sessionId);
        return sessionId;
        
    }
    return service;
})