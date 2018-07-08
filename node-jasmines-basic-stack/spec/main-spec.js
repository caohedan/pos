const main = require('../main/main');
const {loadPromotions,loadAllItems,buildCartItems} = require('../main/fixtures');
'use strict';
describe('pos integration test', () => {

  it('should print right text', () => {

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

    spyOn(console, 'log');

    main.printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

describe('pos unit test', () => {


  it('should tags be transformed to {barcode, count(all)} format by function buildCartItems', () => {
    //given
    const tags = 
    [ { barcode: 'ITEM000001', count: 1 },
    { barcode: 'ITEM000001', count: 1 },
    { barcode: 'ITEM000001', count: 1 },
    { barcode: 'ITEM000001', count: 1 },
    { barcode: 'ITEM000001', count: 1 },
    { barcode: 'ITEM000003', count: 2.5 },
    { barcode: 'ITEM000005', count: 1 },
    { barcode: 'ITEM000005', count: 2 } ]


    //when
    const formattedBarcodes = main.buildCartItems(tags);

    //then
    const index_of_barcode_with_dash = 0;
    expect(formattedBarcodes[index_of_barcode_with_dash].count).toBe(5);
  });
});
describe('pos unit test', () => {


  it('should tags be transformed to {barcode, count} format by function buildFormattedBarcodes', () => {
    //given
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


    //when
    const formattedBarcodes = main.buildFormattedBarcodes(tags);

    //then
    const index_of_barcode_with_dash = 5;
    expect(formattedBarcodes[index_of_barcode_with_dash].count).toBe(2.5);
  });
});
describe('pos unit test', () => {

//given
  const tags = [ { barcode: 'ITEM000001', count: 5 },
  { barcode: 'ITEM000003', count: 2.5 },
  { barcode: 'ITEM000005', count: 3 } ];

  it('should count all discount Items information by function buildGifts', () => {
   
    //when
    const gifts = main.buildGifts(loadAllItems(), loadPromotions(), tags);

    //then
    const index_of_gifts = 1;
    expect(gifts[index_of_gifts].price).toBe(4.5);
  });
});
