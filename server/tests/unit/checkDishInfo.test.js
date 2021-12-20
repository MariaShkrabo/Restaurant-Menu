const {checkName, checkDescription, checkQuantity, checkPrice} = require("../../validation/checkDishInfo");

function certainLengthString(len){
  let str = "";
  for (let i = 0; i < len; i++){
    str += "a";
  }
  return str;
}

describe(`checkName function`, function() {
  describe(`Checks dish name for correctness`, function() {
    it(`Should return true, when name length is 3 or 30`, ()=> {
      expect(checkName(certainLengthString(3))).toEqual(true);
      expect(checkName(certainLengthString(30))).toEqual(true);
    });
    it(`Should return false, when name length is 2 or 31`, ()=> {
      expect(checkName(certainLengthString(2))).toEqual(false);
      expect(checkName(certainLengthString(31))).toEqual(false);
    });
    it(`Should return false, when name isn't passed`, ()=> {
      expect(checkName()).toBe(false);
    });
    it(`Should return false, when name didn't consists Latin or Cyrillic letters`, ()=> {
      expect(checkName("123533636")).toEqual(false);
    });
  });
});

describe(`checkDescription function`, function() {
    describe(`Checks the description for correctness`, function() {
      it(`Should return true, when description length is 100`, ()=> {
        expect(checkDescription(certainLengthString(100))).toBe(true);
      });
      it(`Should return false, when description length is 101 (more than required length)`, ()=> {
        expect(checkDescription(certainLengthString(101))).toBe(false);
      });
      it(`Should return true, when description isn't passed`, ()=> {
        expect(checkDescription()).toBe(true);
      });
    });
  });

describe(`checkQuantity function`, function() {
  describe(`Checking the correct portion of the dish`, function() {
    it(`Should return true, when quantity is 10 or 10000`, ()=> {
      expect(checkQuantity(10)).toEqual(true);
      expect(checkQuantity(10000)).toEqual(true);
    });
    it(`Should return false, when quantity is 9 or 10001`, ()=> {
      expect(checkQuantity(9)).toEqual(false);
      expect(checkQuantity(10001)).toEqual(false);
    });
    it(`Should return false, when quantity isn't passed`, ()=> {
      expect(checkQuantity()).toBe(false);
    });
    it(`Should return false, when quantity isn't a number`, ()=> {
      expect(checkQuantity("ten grams")).toBe(false);
    });
  });
});

describe(`checkPrice function`, function() {
  //2. scenario
  describe(`Checks the price value for correctness`, function() {
    // 3. what is expected from the test
    it(`Should return true, when price is 0 or 10000`, ()=> {
      expect(checkPrice(0)).toBe(true);
      expect(checkPrice(10000)).toBe(true);
    });
    it(`Should return false, when price is -0.99 or 10000.01`, ()=> {
      expect(checkPrice(-0.99)).toBe(false);
      expect(checkPrice(10000.01)).toBe(false);
    });
    it(`Should return false, when price isn't passed`, ()=> {
      expect(checkPrice()).toBe(false);
    });
    it(`Should return false, when price isn't a number`, ()=> {
      expect(checkPrice("some price")).toBe(false);
    });
  });
});