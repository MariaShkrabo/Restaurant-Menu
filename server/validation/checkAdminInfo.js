function checkLogin(login){  
    //regular expression to check the presence of Latin letters and numbers
    if (login && login.length >= 5 && login.length <= 30 && (/(?=.*\d)(?=.*[a-z])/i.test(login))){
      return true;
    } else {
      return false;
    }
}

function checkPassword(password){
    if (password && password.length >= 8 && password.length <= 16){
        return true;
    } else {
        return false;
    }
}

module.exports = {checkPassword, checkLogin};