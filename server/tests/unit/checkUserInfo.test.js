const {checkName, checkPhone} = require("../../validation/checkUserInfo");

function certainLengthString(len){
  let str = "";
  for (let i = 0; i < len; i++){
    str += "a";
  }
  return str;
}

describe(`checkName function`, function() {
  describe(`Checks user name for correctness`, function() {
    it(`Should return true, when name length is 2 or 100`, ()=> {
      expect(checkName(certainLengthString(2))).toEqual(true);
      expect(checkName(certainLengthString(100))).toEqual(true);
    });
    it(`Should return false, when name length is 1 or 101`, ()=> {
      expect(checkName(certainLengthString(1))).toEqual(false);
      expect(checkName(certainLengthString(101))).toEqual(false);
    });
    it(`Should return false, when name isn't passed`, ()=> {
      expect(checkName()).toBe(false);
    });
    it(`Should return false, when name didn't consists Latin or Cyrillic letters`, ()=> {
      expect(checkName("123533636")).toEqual(false);
    });
  });
});

describe(`checkPhone function`, function() {
    describe(`Checks the phone value for correctness`, function() {
      it(`Should return true, when password length is 9 and phone consists only numbers`, ()=> {
        expect(checkPhone("336629830")).toBe(true);
      });
      it(`Should return false, when phone length is 8 (less required length)`, ()=> {
        expect(checkPhone("33662983")).toBe(false);
      });
      it(`Should return false, when phone length is 10 (more than required length)`, ()=> {
        expect(checkPhone("3366298309")).toBe(false);
      });
      it(`Should return false, when phone isn't passed`, ()=> {
        expect(checkPhone()).toBe(false);
      });
      it(`Should return false, when phone consists not only numbers`, ()=> {
        expect(checkPhone("30212348a")).toBe(false);
      });
    });
  });