const {checkName} = require("../../validation/checkCategoryInfo");

function certainLengthString(len){
  let str = "";
  for (let i = 0; i < len; i++){
    str += "a";
  }
  return str;
}

describe(`checkName function`, function() {
  describe(`Checks category name for correctness`, function() {
    it(`Should return true, when name length is 3 or 20`, ()=> {
      expect(checkName(certainLengthString(3))).toEqual(true);
      expect(checkName(certainLengthString(20))).toEqual(true);
    });
    it(`Should return false, when name length is 2 or 21`, ()=> {
      expect(checkName(certainLengthString(2))).toEqual(false);
      expect(checkName(certainLengthString(21))).toEqual(false);
    });
    it(`Should return false, when name isn't passed`, ()=> {
      expect(checkName()).toBe(false);
    });
    it(`Should return false, when name didn't consists Latin or Cyrillic letters`, ()=> {
      expect(checkName("123533636")).toEqual(false);
    });
  });
});

