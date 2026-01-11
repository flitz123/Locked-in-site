paypal.Buttons({
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: { value: '15.00' }
      }]
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      window.location.href = `/success.html?order=${data.orderID}`;
    });
  }
}).render('#paypal-button-container');
