function checkName(name){  
    if (name && name.length >= 2 && name.length <= 100 && (/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name))){
      return true;
    } else {
      return false;
    }
}

function checkPhone(phone){
    if(phone && phone.length === 9 && (/^\d+$/.test(phone))){
        return true;
    }else{
        return false;
    } 
}

module.exports = {checkName, checkPhone};