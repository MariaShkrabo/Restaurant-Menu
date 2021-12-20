function checkName(name){  
  if (name && name.length >= 3 && name.length <= 30 && (/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name))){
    return true;
  } else {
    return false;
  }
}

function checkDescription(description){
    if (!description || description.length <= 100){
        return true;
    } else {
        return false;
    }
}

function checkQuantity(quantity){
    if (quantity && quantity >= 10 && quantity <= 10000){
      return true;
    }
    else {
      return false;
    }
}

function checkPrice(price){
  if (price >= 0 && price <= 10000){
    return true;
  }
  else {
    return false;
  }
}


module.exports = {checkQuantity, checkName,  checkDescription, checkPrice};