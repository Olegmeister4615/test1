angular.module('app').controller('phoneCtrl',function(listFactory){
    this.isEditing=false;
    this.editPhone;
//редактирование телефона в карточке
    this.editPhone=function(phone){
        console.log('edit');
        this.editPhone=angular.copy(phone);
        this.isEditing=true;
    }
//сохранение телефона
    this.savePhone=function(contact,phone){
        console.log('phone!!!');
        listFactory.uploadPhone(contact,phone,this.editPhone);
        this.isEditing=false;
    }
})