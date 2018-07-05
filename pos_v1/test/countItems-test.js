'use strict';

describe('count ', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

  let itemsCount =JSON.stringify(cartItemsCount(tags));

    const expectText = JSON.stringify([{"barCode":"ITEM000001","count":5},{"barCode":"ITEM000003","count":2.5},{"barCode":"ITEM000005","count":3}]);
    expect(itemsCount).toBe(expectText);
  });
});
