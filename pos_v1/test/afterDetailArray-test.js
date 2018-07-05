'use strict';

describe('amount after detailing ', () => {

  it('should print text', () => {

    const tags = [{"barcode":"ITEM000001","count":5,"realPayCount":4},
    {"barcode":"ITEM000003","count":2.5,"realPayCount":2.5},
    {"barcode":"ITEM000005","count":3,"realPayCount":2}];

    let detailTest = JSON.stringify(afterDetailArray(tags,loadAllItems));

    const expectText = JSON.stringify([{"name":"雪碧","price":3,"amount":5,"unit":"瓶","realSum":12,"subTotal":15},
                                          {"name":"荔枝","price":15,"amount":2.5,"unit":"斤","realSum":37.5,"subTotal":37.5},{"name":"方便面","price":4.5,
                                          "amount":3,"unit":"袋","realSum":9,"subTotal":13.5}]);
    expect(detailTest).toBe(expectText);
  });
});
