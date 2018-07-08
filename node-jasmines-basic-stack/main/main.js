const {loadPromotions, loadAllItems} = require('./fixtures');

'use strict';

function buildFormattedBarcodes(tags){
    let formattedBarcodes = [];
    for (let tag of tags) {
        let barcodeObject = {
            barcode: tag,
            count: 1
        }
        if (tag.indexOf("-") !== -1) {
            let tempArray = tag.split("-");
            barcodeObject = {
                barcode: tempArray[0],
                count: parseFloat(tempArray[1])
            }
        }
        formattedBarcodes.push(barcodeObject);
    }
   
    console.info(formattedBarcodes);
    return formattedBarcodes;
}

function buildCartItems(formattedBarcodes){
    let cartItems = [];

    for (let formattedBarcode of formattedBarcodes) {
        let existCartItem = null;
        for (let cartItem of cartItems) {
            if (cartItem.barcode === formattedBarcode.barcode) {
                existCartItem = cartItem;
            }
        }
        if (existCartItem != null) {
            existCartItem.count += formattedBarcode.count;
        } else {
            cartItems.push({ ...formattedBarcode });
        }
    }
    console.info("buildCartItems");
    console.info(cartItems);
    return cartItems;
}
function buildGifts(allItems, promotions, cartItems){
    let gifts = [];
    for (let cartItem of cartItems) {
        for (let promotion of promotions) {
            if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
                for (let promotBarcode of promotion.barcodes) {
                    if (promotBarcode === cartItem.barcode) {
                        let count = Math.floor(cartItem.count / 3);
                        let gift = {
                            barcode: cartItem.barcode,
                            count: count
                        }
                        gifts.push(gift);
                        break;
                    }
                }

            }

        }
    }

    for (let gift of gifts) {
        for (let product of allItems) {
            if (gift.barcode === product.barcode) {
                gift.price = product.price;
            }
        }
    }
    console.info("gifts");
    console.info(gifts);
    return gifts;
}

function buildReceiptItems(allItems, cartItems){
    let receiptItems = [];
    for (let cartItem of cartItems) {
        for (let product of allItems) {
            if (product.barcode === cartItem.barcode) {
                const { name, unit, price } = product;
                receiptItems.push({
                    barcode: cartItem.barcode,
                    name,
                    count: cartItem.count,
                    unit,
                    price
                });
            }
        }
    }
    console.info(JSON.stringify(receiptItems));
    return receiptItems;
}

function calculatePriceOfReceiptItems(receiptItems, gifts){
    for (let receiptItem of receiptItems) {
        let count = receiptItem.count;
        for (let element of gifts) {
            if (element.barcode === receiptItem.barcode) {
                count = (receiptItem.count - element.count);
            }
        }
        receiptItem.subTotal = count * receiptItem.price;
    }

    console.info(receiptItems);
}

function printReceipt(tags){
    console.info(tags);
    const allItems = loadAllItems();
    const promotions = loadPromotions();

    const formattedBarcodes = buildFormattedBarcodes(tags);
    const cartItems = buildCartItems(formattedBarcodes);
    const gifts = buildGifts(allItems, promotions, cartItems);

    const receiptItems = buildReceiptItems(allItems, cartItems);
    calculatePriceOfReceiptItems(receiptItems, gifts);

    let saved = 0;
    for(let gift of gifts){
        saved += (gift.count * gift.price);
    }
    console.info(saved);

    let total = 0;
    for (let receiptItem of receiptItems) {
        total += receiptItem.subTotal;
    }
    console.info(total);

    const viewModel = {
        receiptItems,
        total: total.toFixed(2),
        saved: saved.toFixed(2)
    }
    console.info(viewModel);
    
    let receiptItemString = "";
    for(const receiptItem of receiptItems){
        receiptItemString += "\n";
        receiptItemString += `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
    }
    
    /*

名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
    */
    const result = `***<没钱赚商店>收据***${receiptItemString}
----------------------
总计：${viewModel.total}(元)
节省：${viewModel.saved}(元)
**********************`

    console.log(result);
}


module.exports = {printReceipt,buildFormattedBarcodes,buildGifts,buildCartItems};