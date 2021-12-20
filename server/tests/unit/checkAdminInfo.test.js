const {checkLogin, checkPassword} = require("../../validation/checkAdminInfo");

describe(`checkLogin function`, function() {
  describe(`Checks the login value for correctness`, function() {
    it(`Should return true, when login length is 5 or 30`, ()=> {
      expect(checkLogin("msh12")).toEqual(true);
      expect(checkLogin("shkrabomaria123456789098765432")).toEqual(true);
    });
    it(`Should return false, when password length is 4 or 31`, ()=> {
      expect(checkLogin("msh1")).toEqual(false);
      expect(checkLogin("shkrabomaria1234567890987654321")).toEqual(false);
    });
    it(`Should return false, when login isn't passed`, ()=> {
      expect(checkLogin()).toBe(false);
    });
    it(`Should return false, when login isn't a string`, ()=> {
      expect(checkLogin(true)).toBe(false);
    });
    it(`Should return false, when login didn't consists Latin letters or numbers`, ()=> {
      expect(checkLogin("shkrabomaria")).toEqual(false);
      expect(checkLogin("123533636")).toEqual(false);
    });
  });
});

describe(`checkPassword function`, function() {
    describe(`Checks the password value for correctness`, function() {
      it(`Should return true, when password length is 8 or 16`, ()=> {
        expect(checkPassword("12345678")).toBe(true);
        expect(checkPassword("qwertyuiopasdfgh")).toBe(true);
      });
      it(`Should return false, when password length is 7 or 17`, ()=> {
        expect(checkPassword("1234567")).toBe(false);
        expect(checkPassword("qwertyuiopasdfghj")).toBe(false);
      });
      it(`Should return false, when password isn't passed`, ()=> {
        expect(checkPassword()).toBe(false);
      });
      it(`Should return false, when password isn't a string`, ()=> {
        expect(checkPassword(true)).toBe(false);
      });
    });
  });