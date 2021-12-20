const ApiError = require('../../error/ApiError');

describe(`ApiError class`, function() {
  describe(`Checks errors`, function() {
    it(`Should return 404 error`, ()=> {
      expect(ApiError.badRequest("error")).toEqual(ApiError.badRequest("error"));
    });
    it(`Should return 500 error`, ()=> {
        expect(ApiError.internal("error")).toEqual(ApiError.internal("error"));
    });
    it(`Should return 403 error`, ()=> {
        expect(ApiError.forbidden("error")).toEqual(ApiError.forbidden("error"));
    });
  });
});