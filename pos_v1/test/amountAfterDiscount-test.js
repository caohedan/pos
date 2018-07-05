'use strict';

describe('amount after discount ', () => {

  it('should print text', () => {

    const tags = [{"barCode":"ITEM000001","count":5},{"barCode":"ITEM000003","count":2.5},{"barCode":"ITEM000005","count":3}];

  let itemsAmountDiscount = JSON.stringify(amountAfterDiscount(tags,loadAllItems));
    const expectText = JSON.stringify([{"barcode":"ITEM000001","count":5,"realPayCount":4},{"barcode":"ITEM000003","count":2.5,"realPayCount":2.5},{"barcode":"ITEM000005","count":3,"realPayCount":2}]);
    expect(itemsAmountDiscount).toBe(expectText);
  });
});
