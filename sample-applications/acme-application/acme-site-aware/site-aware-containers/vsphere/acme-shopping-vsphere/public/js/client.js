
// Returns the full name for a user based on userid
function getUsername(userid, token, displayusername) {
  console.log('Requesting user details from backend');

  $.ajax({
    url: "/users/" + userid,
    type: 'GET',
    headers: {'Authorization': 'Bearer ' + token},
    success: function (data, textStatus, jqXHR) {
          
          json = JSON.parse(data);

          if (json.status == 200) {

              displayusername(json.data.firstname + " " + json.data.lastname)

          } else {
              
              console.error('Could not get user information: ');
              return displayusername(undefined);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Could not get user information: ' + userid + ', due to: ' + textStatus + ' | ' + errorThrown);
        }
   });

}

// Delete an item from the cart
function deleteItem(itemid, userid) {
    
    console.log('Deleting item from cart');

    vals = {
      "itemid" : itemid,
      "quantity": 0
    }

    var token = getCookie()

    $.ajax({

      url: "/cart/item/modify/" + userid,
      type: "POST",
      headers: {'Authorization' : 'Bearer ' + token},
      data: JSON.stringify(vals),
      success: function(data, textStatus, jqXHR) {

        console.log('Item deleted successfully ')
        location.reload();

      },
      error: function(jqXHR, textStatus, errorThrown) {
        
        console.log('Error while deleting item from cart ' + textStatus + ' | ' + errorThrown)
      }
    });

}

// Modify the item in a cart
function updateCart(itemid, quantity, userid) {

    console.log('Updating item from cart ' + itemid);

    vals = {
      "itemid" : itemid,
      "quantity": quantity
    }

    var token = getCookie()

    $.ajax({

      url: "/cart/item/modify/" + userid,
      type: "POST",
      headers: {'Authorization' : 'Bearer ' + token},
      data: JSON.stringify(vals),
      success: function(data, textStatus, jqXHR) {

        console.log('Modified cart item ' + textStatus);
        location.reload();

      },
      error: function(jqXHR, textStatus, errorThrown) {
        
        console.log('Error modifying item quantity from cart ' + textStatus + ' | ' + errorThrown)

      }
    });

}


// Get the total for cart
function getCartTotal(userid) {

  var cartTotal = 0
  var token = getCookie()
  $.ajax({

    url: "/cart/total/" + userid,
    type: "GET",
    headers: {'Authorization' : 'Bearer ' + token},
    async: false,
    success: function(body, textStatus, jqXHR) {
       
      body = JSON.parse(body);

      if (jqXHR.status == 200){

          cartTotal = body.carttotal;
      } 
      else {
        console.log('Could not get total ' + textStatus);
        cartTotal = 0;
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error Receiving Total ' + errorThrown);
    }

  });

return cartTotal;

}

// Returns user auth cookie
function getCookie() {

    // Check if the user is logged in
    if($.cookie('logged_in') != null){

        var token = $.cookie('logged_in')
    } 
    else { 
      // @todo - do we need this ?
      // Creates a user automatically if no user is logged in
            var token = "guest"
    }

    return token
}

// Returns user ID by parsing the JWT
function getUserID() {

  var token = getCookie()
  if (token == "guest") {
    return 'guest'
  }
  var decodedJWT = jwt_decode(token);
  return decodedJWT.sub
}

// Returns image url
function getImageUrl(productId, setUrl) {

  var imageurl = ''
  $.ajax({
    url: "/products/" + productId,
    type: 'GET',
    async: false,
    success: function (body, textStatus, jqXHR) {
          body = JSON.parse(body);
          console.log('Getting Product info ' + body)
          if (jqXHR.status == 200) {

              imageurl = body.data.imageUrl1;

          } else {
              
              console.error('Could not get product image: ' + textStatus);
              imageurl = undefined;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Could not get product information: ' + productId + ', due to: ' + textStatus + ' | ' + errorThrown);
        }
   });
  
return imageurl
}