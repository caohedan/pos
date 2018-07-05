'use strict';

function printReceipt(inputs) {
  let countArray = infoCount(inputs);
  let discountArray = countAfterDiscount(countArray,loadPromotions);
  let detailArray = afterDetailArray(discountArray,loadAllItems);
  let total = countAll(detailArray);
  let discount = discountCash(detailArray);
  Print(detailArray,total,discount);
//  console.log(inputs);

}

//count
function infoCount(collection) {
    let mark = new Set();
    let result = [];
    for(let i = 0; i < collection.length; i++){
          collection[i] = collection[i].split('-');
    }
//    console.log(collection);
//    console.log(collection.length+'\n');
    for(let i = 0; i < collection.length; i++)
    {
      var match = collection[i][0];
      if (mark.has(match)) continue;
      var num = 0;
      for (let j = 0; j < collection.length; j++) {
        if(match === collection[j][0])
       {
            if(collection[j][1])
            num += parseFloat(collection[j][1]);
            else
            num++;
       }

       }
       result.push({
                       barCode: match,
                       count: num
                  });
           mark.add(match);
    }

    return result;
 }
//discount
 function countAfterDiscount(countArray,loadAllItems){
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
// console.log("######优惠信息#####");
// console.log(discountArray);
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
                sum:parseFloat(item.price)*parseFloat(one.count)
                })
            }
          }
    }
    return detailArray;
//    console.log("###########详细信息###########");
//    console.log('\n');
//   console.log(detailArray);
}
//total
function countAll(detailArray){
      var total = 0;
     for(let detail of detailArray){
        total += detail.realSum;
     }
//     console.log("######总和"+total);
     return total;
}
//savings
function discountCash(detailArray){
    var total = 0;
    for(let detail of detailArray){
            total += (detail.sum-detail.realSum);
         }
//          console.log("######节约"+total);
              return total;
}

function Print(detailArray,total,discount){
  let receipt = '***<没钱赚商店>收据***\n';
  for(let detail of detailArray){

    receipt += '名称：' + detail.name + '，数量：' + detail.amount + detail.unit + '，单价：' + detail.price.toFixed(2) +
    '(元)，小计：' + detail.realSum.toFixed(2) + '(元)\n';
  }
  receipt+='----------------------\n总计：'+total.toFixed(2)+'(元)\n节省：'+discount.toFixed(2)+'(元)\n**********************';
  console.log(receipt);
  }
