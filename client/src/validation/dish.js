function dishValidation(name, file, description, quantity, price, categoryId){
  if(!checkName(name)){
    return alert('Название блюда должно содержать от 3 до 30 латинских или русских символов');
  }
  if(!checkDescription(description)){
      return alert('Описание не может быть длиннее 100 символов');
  }
  if(!checkQuantity(quantity)){
      return alert('Количество должно быть числом в диапазоне от 10 до 10000 грамм');
  }
  if(!checkPrice(price)){
      return alert('Цена должна быть числом в диапазоне от 0 до 10000 б.р.');
  }
  if(!categoryId){
      return alert('Категория не выбрана!');
  }
  if(!file){
      return alert('Фото не выбрано!');
  }
}

function checkName(name){  
  if (name && name.length >= 3 && name.length <= 30 && (/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name))){
    return true;
  } else {
    return false;
  }
}

function checkDescription(description){
    if (description.length <= 100){
        return true;
    } else {
        return false;
    }
}

function checkQuantity(quantity){
  try{
    let quantityNumber = Number(quantity);
    if (quantityNumber >= 10 && quantityNumber <= 10000){
      return true;
    }
    else {
      return false;
    }
  }
  catch(e){
    return false;
  }
}

function checkPrice(price){
  try{
    let priceNumber = Number(price);
    if (priceNumber >= 0 && priceNumber <= 10000){
      return true;
    }
    else {
      return false;
    }
  }
  catch(e){
    return false;
  }
}
  
  
  module.exports = {dishValidation};