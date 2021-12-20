function checkName(name){  
  if (name && name.length >= 3 && name.length <= 20 && (/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name))){
    return true;
  } else {
    return false;
  }
}

module.exports = {checkName};