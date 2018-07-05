'use strict';

  function printReceipt(inputs) {
  let countItems = cartItemsCount(inputs);
  let itemsAmountDiscount = amountAfterDiscount(countItems,loadPromotions);
  let detailItems = afterDetailArray(itemsAmountDiscount,loadAllItems);
  let total = countAll(detailItems);
  let discount = discountCash(detailItems);
  Print(detailItems,total,discount);

}

//format the barCode
  function formattedBarcodes(collection) {
      let arrayTemp = new Array();
      arrayTemp = collection.concat();
      console.info(arrayTemp);
      let cartItems = [];
      for(let cartItem of arrayTemp)
      {
          let count = {barCode:cartItem,count:1};
          if(cartItem.indexOf('-') === -1)
           {
               cartItems.push({barCode:cartItem,count:1});
           }
          else
           {
              cartItem = cartItem.split('-');
              cartItems.push({barCode:cartItem[0],count:parseFloat(cartItem[1])});
           }
      }
      return cartItems;
 }
 //count the number of Items
 function cartItemsCount(inputs){
         let formatCartItems = formattedBarcodes(inputs);
         console.info(JSON.stringify(formatCartItems));
         let cartItems = [];
         for(let formatCartItem of formatCartItems){
         let existCartItem = null;
         for(let cartItem of cartItems)
         {
              if(cartItem.barCode === formatCartItem.barCode)
              existCartItem = cartItem;
         }
         if(existCartItem != null)
              existCartItem.count += formatCartItem.count;
         else
              cartItems.push(formatCartItem);

         }
         console.info(JSON.stringify(cartItems));
         return cartItems;
 }
//count the real payment of the amount of the items
 function amountAfterDiscount(countArray,loadAllItems){
//  console.log(countArray+'\n');
  let allPromotions = loadPromotions();
  let barcode;
  let discountArray = [];
  for (let promotion of allPromotions)
  {
       if(promotion.type === 'BUY_TWO_GET_ONE_FREE')
       barcode = promotion.barcodes;
  }
 for(let one of countArray)
 {
        if(barcode.indexOf(one.barCode))
        discountArray.push({barcode:one.barCode,count:one.count,realPayCount:one.count - parseInt(one.count/3)});
        else
        discountArray.push({barcode:one.barCode,count:one.count,realPayCount:one.count});

 }
    console.info(JSON.stringify(discountArray));
    return discountArray;
 }
//detail information
function afterDetailArray(discountArray,loadAllItems){
    var allItems = loadAllItems();
    var detailArray = [];
    for(let one of discountArray){
       for(let item of allItems){
            if(one.barcode === item.barcode)
            {
                detailArray.push({
                name:item.name,
                price:item.price,
                amount:one.count,
                unit:item.unit,
                realSum:parseFloat(item.price)*parseFloat(one.realPayCount),
                subTotal:parseFloat(item.price)*parseFloat(one.count)
                })
            }
          }
    }
    console.info(JSON.stringify(detailArray));
    return detailArray;
}
//total
function countAll(detailArray){
      var total = 0;
     for(let detail of detailArray){
        total += detail.realSum;
     }
     return total;
}
//savings
function discountCash(detailArray){
    var total = 0;
    for(let detail of detailArray){
            total += (detail.subTotal-detail.realSum);
         }
              return total;
}

function Print(detailArray,total,discount){
  let receipt = '***<没钱赚商店>收据***';
  for(let detail of detailArray){

    receipt += `\n名称：${detail.name}，数量：${detail.amount}${detail.unit}，单价：${detail.price.toFixed(2)}(元)，小计：${detail.realSum.toFixed(2)}(元)`;
  }
  receipt+=`\n----------------------\n总计：${total.toFixed(2)}(元)\n节省：${discount.toFixed(2)}(元)\n**********************`;
  console.log(receipt);
  }
