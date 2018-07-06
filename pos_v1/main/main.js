'use strict';

function printReceipt(inputs) {
  let countItems = countCartItems(inputs);
  let itemsAmountDiscount = amountAfterDiscount(countItems, loadPromotions);
  let detailItems = countDetailArray(itemsAmountDiscount, loadAllItems);
  let total = countAll(detailItems);
  let discount = discountCash(detailItems);
  Print(detailItems, total, discount);
}

//format the barCode
function formatBarcodes(collection) {
  let arrayTemp;
  arrayTemp = collection.concat();
  console.info(arrayTemp);
  let cartItems = [];
  for (let cartItem of arrayTemp) {
    let count = {barCode: cartItem, count: 1};
    if (cartItem.indexOf('-') === -1) {
      cartItems.push({barCode: cartItem, count: 1});
    }
    else {
      cartItem = cartItem.split('-');
      cartItems.push({barCode: cartItem[0], count: parseFloat(cartItem[1])});
    }

  }
  return cartItems;
}

//count the number of Items
function countCartItems(inputs) {
  let formatCartItems = formatBarcodes(inputs);
  console.info(JSON.stringify(formatCartItems));
  let cartItems = [];
  for (let formatCartItem of formatCartItems) {
    let existCartItem = null;
    for (let cartItem of cartItems) {
      if (cartItem.barCode === formatCartItem.barCode)
        existCartItem = cartItem;
    }
    if (existCartItem != null) {
      existCartItem.count += formatCartItem.count;
    }
    else {
      cartItems.push(formatCartItem);
    }


  }
  console.info(JSON.stringify(cartItems));
  return cartItems;
}

//count the real payment of the amount of the items
function amountAfterDiscount(countArray, loadPromotions) {
//  console.log(countArray+'\n');
  let allPromotions = loadPromotions();
  let barcode;
  let discountArray = [];
  for (let promotion of allPromotions) {
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE')
      barcode = promotion.barcodes;
  }
  for (let one of countArray) {
    if (barcode.indexOf(one.barCode))
      discountArray.push({barcode: one.barCode, count: one.count, realPayCount: one.count - parseInt(one.count / 3)});
    else
      discountArray.push({barcode: one.barCode, count: one.count, realPayCount: one.count});

  }
  console.info(JSON.stringify(discountArray));
  return discountArray;
}

//detail information
function countDetailArray(discountArray, loadAllItems) {
  let allItems = loadAllItems();
  let detailArray = [];
  for (let one of discountArray) {
    for (let item of allItems) {
      if (one.barcode === item.barcode) {
        detailArray.push({
          name: item.name,
          price: item.price.toFixed(2),
          amount: one.count,
          unit: item.unit,
          realSum: (parseFloat(item.price) * parseFloat(one.realPayCount)).toFixed(2),
          subTotal: (parseFloat(item.price) * parseFloat(one.count)).toFixed(2)

        })
      }
    }
  }
  console.info(JSON.stringify(detailArray));
  return detailArray;
}

//total
function countAll(detailArray) {
  let total = 0.00;
  for (let detail of detailArray) {


    total = parseFloat(total) + parseFloat(detail.realSum);
    total = total.toFixed(2);
  }
  return total;
}

//savings
function discountCash(detailArray) {
  let total = 0;
  for (let detail of detailArray) {
    total += parseFloat(detail.subTotal) - parseFloat(detail.realSum);
    console.info(total)
  }
  return total.toFixed(2);
}

function Print(detailArray, total, discount) {
  let receipt = '***<没钱赚商店>收据***';
  for (let detail of detailArray) {

    receipt += `\n名称：${detail.name}，数量：${detail.amount}${detail.unit}，单价：${detail.price}(元)，小计：${detail.realSum}(元)`;
  }
  receipt += `\n----------------------\n总计：${total}(元)\n节省：${discount}(元)\n**********************`;
  console.log(receipt);
}
