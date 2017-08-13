angular.module('app').factory('listFactory',function($http,$q){
    var service={};//возвращаемый объект из фабрики
    var contacts;//контакты
    var depsOut;//департаменты
    var baseUrl='http://frontendtest.xrm.ru/api/';//url api
    //получение контактов с api
    service.loadContacts= function($scope){
        var url = baseUrl+'Users/'+$scope.sessionId;
        $http.get(url)
            .success(function(data){
                if(data.totalCount=='0'){
                    service.loadContacts($scope);
                }
                else{
                contacts=data.items;
                //из полученных контактов получаем департаменты
                var depsArr=_.map(data.items,(item)=>{return item.departmentId})
                //уникальные департаменты
                deps=_.uniq(depsArr);
                //загружаем департаменты
                service.loadDeps($scope,deps);
                console.log(contacts);
                //можно загружать в контроллекр контакты
                $scope.$broadcast('contacts:loaded');
                }
            })
            .error(function(err){
                console.log('error',err)
            })
    }
    //возвращает в контроллер контакты
    service.getContacts= function(){
        console.log('contact geting');
        return contacts;
        
    }
    //получение информации о департаментах
    //делается несколько асинхронных запросов к api
    service.loadDeps=function($scope,deps){
        var url = baseUrl+ 'Departments/'+$scope.sessionId+'/';
        var promiseArr=[];
        _.each(deps, function(elem,key){
            var sendUrl=url +elem;
            console.log('loh',url);
            var promise = $http.get(sendUrl)
                        .success(function(data){
                            return data;
                        })
                        .error(function(err){
                            console.log('error',err)
                        })
            promiseArr.push(promise);
        })
        console.log('promiseArr:',promiseArr)
        //ждем пока все запросыы придут с ответом
        $q.all(promiseArr).then(function(values){
            console.log('loadedede',values);
            //массив департаментов
            var depsArr=[]
            _.each(values, function(elem,key){
                console.log('elem:',elem.data);
                depsArr.push(elem.data);
            })
            depsOut=depsArr;
            console.log('listFactory ->deps',depsOut);
            //запись названия департамента в объект контакта 
            _.each(depsOut,function(dep,key){

                _.each(contacts,function(contact){
                    
                    if(contact.departmentId==dep.id){
                        contact.departmentName=dep.title;
                    }
                })
            }); 
            console.log('new contacts',contacts);           
        }).then(()=>{
            //департаменты и контакты загружены
            $scope.$broadcast('deps:loaded');
            $scope.$broadcast('contacts:loaded');
        });

    }
    //возвращает массив департаментов
    service.getDeps=function(){
        console.log('deps geting');
        return depsOut;
    }
    //создание контакта
    service.addContact=function($scope,newCont){
        var deppp=JSON.parse(newCont.dep);
        var newContact={
            "firstName": newCont.firstName,
            "lastName": newCont.lastName,
            "middleName": newCont.middleName,
            "departmentId": deppp.id,
            "departmentName": deppp.title,
            "phones":[],
            "birthDate": "string",
            "jobTitle": "string",
            "photoUrl": "string",
            "photoBase64": "string",
            "email": "string"
        }
        contacts.push(newContact);
    };
    //добавление телефона
    service.addPhone = function(contact,newPhone){
        console.log(contact,newPhone);
        contact.phones.push({
            title:newPhone.title,
            phone:newPhone.phone
        })
        var i=_.indexOf(contacts,contact)
        contacts[i]=contact;
    };
    //удаление контактов
    service.removeContacts = function(arr){
        console.log('remove:',arr);
        _.each(arr,function(contId){
            _.remove(contacts,function(contact){
                    return contact.id==contId;
                });
                
        })
    };
    //удалениетелефонов
    service.removePhone= function(contact,remPhone){
        var i=_.indexOf(contacts,contact);
        _.remove(contact.phones,function(phone){
            return remPhone.phone==phone.phone;
        })
        contacts[i]=contact;
    }
    //изменение телефона
    service.uploadPhone = function(contact,phone,newPhone){
        var i=_.indexOf(contacts,contact);
        var j=_.indexOf(contact.phones,phone);
        contact.phones[j]=newPhone;
        contacts[i]=contact;
    }
    return service;
});