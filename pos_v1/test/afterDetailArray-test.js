'use strict';

describe('amount after detailing ', () => {

  it('should print text', () => {

    const tags = [{"barcode": "ITEM000001", "count": 5, "realPayCount": 4},
      {"barcode": "ITEM000003", "count": 2.5, "realPayCount": 2.5},
      {"barcode": "ITEM000005", "count": 3, "realPayCount": 2}];

    let detailTest = JSON.stringify(countDetailArray(tags, loadAllItems));

    const expectText = `[{"name":"雪碧","price":"3.00","amount":5,"unit":"瓶","realSum":"12.00","subTotal":"15.00"},{"name":"荔枝","price":"15.00","amount":2.5,"unit":"斤","realSum":"37.50","subTotal":"37.50"},{"name":"方便面","price":"4.50","amount":3,"unit":"袋","realSum":"9.00","subTotal":"13.50"}]`;
    expect(detailTest).toBe(expectText);
  });
});
