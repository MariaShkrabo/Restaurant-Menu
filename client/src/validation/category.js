function categoryValidation(name, file){
  if(!checkName(name)){
    return alert('Название категории должно содержать от 3 до 20 латинских или русских символов');
  }
  if(!file){
      return alert('Фото не выбрано!');
  }
}

function checkName(name){  
  if (name && name.length >= 3 && name.length <= 20 && (/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name))){
    return true;
  } else {
    return false;
  }
}
  
  module.exports = {categoryValidation};