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
            if(localStorage.getItem("lastprice")==null)
              localStorage.setItem("lastprice",curPrice);
             if(localStorage.getItem("compprice")==null)
              localStorage.setItem("compprice",curPrice)
            var myMoneyVal = curPrice*localStorage.getItem("mybtc");
            var myMoneyValb = buyPrice*localStorage.getItem("mybtc");
            var prePrice =parseInt(localStorage.getItem("lastprice"));// parseInt($("#pricebtcs").text());
            var title ;
            if(curPrice<localStorage.getItem("compprice"))
              alert("buy Now price have dropped");
            if (prePrice > curPrice) {
              $('body').css('background-color', 'red');
              title =  " \\/";
            } else  if (prePrice ==curPrice){
              $('body').css('background-color', 'blue');
              title =  "--";
            }
            else {
              $('body').css('background-color', 'green');
               title =  '/\\';
            }
           // $("#pricebtc").text();
           diff = curPrice -prePrice;
           var diffb= myMoneyValb - myMoneyVal;
           title = title +" "+ diff +" |Bitcoin Price Live | India |INR"
           $(document).prop('title', title);
            $("#pricebtcb").fadeOut(function() {
              $(this).text(buyPrice).fadeIn();
            });
               $("#pricebtcs").fadeOut(function() {
              $(this).text(curPrice).fadeIn();
            });
               $("#pricebtcms").fadeOut(function() {
              $(this).text(myMoneyVal).fadeIn();
            });
               $("#pricebtcmb").fadeOut(function() {
              $(this).text(myMoneyValb).fadeIn();
            });
               $("#pricediff").fadeOut(function() {
              $(this).text(diffb).fadeIn();
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
  $( "#clearLocal" )
  .click(function() {
    localStorage.clear();
  })
