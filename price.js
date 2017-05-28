// var auto= $('#prices'), refreshed_content; 
//     refreshed_content = setInterval(function()
//     {
//     auto.fadeOut('slow').load("https://api.zebpay.com/api/v1/ticker?currencyCode=INR").fadeIn("slow");
//     }, 
//     3000);
(function poll() {
  setTimeout(function() {
    $.ajax({
      url: "https://api.zebpay.com/api/v1/ticker?currencyCode=INR",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: "GET",
      success: function(data) {

        // check if null return (no results from API)
        if (data == null) {
          console.log('no data!');
        } else {
          $.each(data, function(index, element) {
            console.log(data);
            var curPrice = data.sell;
            var buyPrice = data.buy;
            var myMoneyVal = curPrice*localStorage.getItem("mybtc");
            var prePrice = parseInt($("#pricebtcs").text());
            if (prePrice > curPrice) {
              $('body').css('background-color', 'red');
            } else {
              $('body').css('background-color', 'green');
            }
           // $("#pricebtc").text();
            $("#pricebtcb").fadeOut(function() {
              $(this).text(buyPrice).fadeIn();
            });
               $("#pricebtcs").fadeOut(function() {
              $(this).text(curPrice).fadeIn();
            });
               $("#pricebtcm").fadeOut(function() {
              $(this).text(myMoneyVal).fadeIn();
            });
          })
        }

      },
      dataType: "json",
      complete: poll,
      timeout: 2000
    })
  }, 3000);
})();

$( "#mybtc" )
  .focusout(function() {
    if($( "#mybtc" ).text.length>0)
    localStorage.setItem("mybtc",parseFloat($( "#mybtc" ).val()))
  })