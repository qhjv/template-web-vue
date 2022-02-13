const phoneSchema =
  // eslint-disable-next-line no-useless-escape
  /^((01[2689]|08|09|03|07|05|04|02[0123456789]|06)|(([\+]{0,1}84)(1[2689]|8|9|3|7|5|4|2[0123456789]|6)))[0-9]{8}$/;

self.isProductValueValid = function (products) {
  let totalMoney = 0;
  let totalWeight = 0;
  for (let i = 0; i < products.length; i++) {
    const money = products[i].money || "";
    const moneyNumber = Number.parseInt(products[i].money);
    if (isNaN(moneyNumber) || moneyNumber <= 0 || money.length < 3) {
      return false;
    }
    totalMoney += self.vndToNumber(products[i].money);
    totalWeight += parseFloat(products[i].weight);
  }

  // TODO: Bỏ tạm kịch ban don lon hon 10k.
  // if (totalMoney <= 10000 || totalMoney > 20000000) return false;
  if (totalMoney < 0 || totalMoney > 20000000) return false;
  if (totalWeight < 0 || totalWeight > 50) return false;

  return true;
};

self.vndToNumber = function (x) {
  if (!x) {
    return 0;
  }
  x = x.toString();
  x = x.replace(/\D/g, "");
  x = parseInt(x);
  return x;
};

self.addEventListener("message", ({ data: dataReceive }) => {
  const { data = [], type = "" } = dataReceive;
  if (type === "orderExcel") {
    const listError = [];
    const numberOfOrder = data.length;
    for (let orderIndex = 0; orderIndex < numberOfOrder; orderIndex++) {
      const order = data[orderIndex];
      const numberProduct = order.products ? order.products.length : 0;
      if (!(order.deliver_option || order.pick_time?.value)) {
        listError[orderIndex] = true;
      } else if (
        !(
          order.name &&
          order.phone &&
          order.phone.length > 9 &&
          order.address &&
          order.addressObj &&
          order.addressObj.customer_province_id &&
          order.addressObj.customer_district_id &&
          (order.addressObj.customer_ward_id ||
            order.addressObj.customer_street_id) &&
          (order.addressObj.customer_specific_id ||
            order.addressObj.customer_hamlet_id ||
            order.addressObj.customer_corner_id) &&
          order.warehouse &&
          order.warehouse.value &&
          order.transport_service &&
          numberProduct > 0 &&
          order.products[0].product_name &&
          order.products[numberProduct - 1].product_name &&
          self.isProductValueValid(order.products)
        )
      ) {
        listError[orderIndex] = true;
      } else {
        const isValidPhone = phoneSchema.test(order.phone);
        if (isValidPhone) {
          let isValidProduct = true;
          for (
            let productIndex = 0;
            productIndex < numberProduct;
            productIndex++
          ) {
            const product = order.products[productIndex];
            if (
              !(
                product.product_name &&
                product.quantity >= 1 &&
                product.weight >= 0.01 &&
                product.weight <= 50 &&
                (product.money >= 0 || product.money) &&
                self.vndToNumber(order.pick_money) <= 20000000
              )
            ) {
              isValidProduct = false;
              break;
            }
          }
          if (isValidProduct) {
            // Do Something.
          } else {
            listError[orderIndex] = true;
          }
        } else {
          listError[orderIndex] = true;
        }
      }
    }

    self.postMessage({ listError });
  }
});
