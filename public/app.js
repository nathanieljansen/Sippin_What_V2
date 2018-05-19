window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
var zip = "";

var map, infoWindow;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.7392,
      lng: -104.9903
    },
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&sensor=true",
        type: "GET",
      }).then( (resultsBack) => {
        console.log(resultsBack);
        // console.log('did it work ???', resultsBack.results[5].address_components[0].long_name);
        // zip = resultsBack.results[5].address_components[0].long_name;
        zip = resultsBack.results.find( (result) => {
          return result.address_components.find(({
            types
          }) => types.includes('postal_code'))
        })

        if (!zip) {
          zip = 'DEFAULT';
        } else {
          zip = zip.address_components.find(({
            types
          }) => types.includes('postal_code')).long_name;
        }

        console.log(zip);
      })

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: 2000,
        type: ['liquor_store']
      }, callback);
      map.setCenter(pos);
    }, () => {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}


function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click',  () => {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);

}

function createList(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  var newDiv = $("<p>");
  newDiv.html(place.name + "<br>" + place.vicinity);

  $("#name").append(newDiv);
  // console.log(place);
};

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      createList(results[i]);

    }
  }
}
$(document).ready(function () {
      $(".wineSwipe").hide();

$( () => {

  $('.parallax').parallax();
  $(".autocomplete1").keyup( (event) => {
    if (event.keyCode === 13) {
      $(".searchButton").click();
    }
  });

  $(".searchButton").click( () => {

    event.preventDefault();
    $("#words").empty();
    $("#image").empty();
    $("#otherWineImage1").empty();
    $("#otherWineImage2").empty();
    $("#otherWineImage3 ").empty();
    var textInput = $(".autocomplete1").val().trim().toLowerCase();
    var wineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=" + textInput + "&maxPrice=50";
    var wineAPI = {
      "async": true,
      "crossDomain": true,
      "url": wineQueryURL,
      "method": "GET",
      "headers": {
        "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
        "Cache-Control": "no-cache",
      }

    }
    $.ajax(wineAPI).then((response) => {
      console.log(response)



      if (response.status === "failure") {
        console.log(response.message)
        $(".notValid").text("Sorry! " + response.message + ". We are always trying to improve. Thanks for you help!");
        database.ref().push(badPairing);
      } else if (response.pairingText === "") {
        $(".notValid").text("Thanks for making us better! We didn't find a pairing for " + textInput + " but we are always trying to improve our app");
        database.ref().push(badPairing);
      } else {
        $(".whatWhat").hide();
        $(".wineSwipe").show();
        $(".notValid").empty();
        $("html, body").animate({
          scrollTop: $('.wineSwipe').offset().top - 200
        }, 1000);
        var pickedWine = response.productMatches[0].title
        console.log(pickedWine);
        var otherWines = response.pairedWines[0];

        var p = $("<p>");
        p.text(response.pairingText);
        $("#words").append(p);

        var img = $("<img>");
        img.attr("src", response.productMatches[0].imageUrl);
        $("#image").append(img);

        var description = $("<p>");
        description.text(response.productMatches[0].description);
        $("#words").append(description);



        var title = $("<p>");
        title.text(response.productMatches[0].title)
        $("#image").append(title);
        $(".wineSwipe").show();

        var newPairing = {
          foodInput: textInput,
          wineSelection: pickedWine
        }

        var comparableWineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/recommendation?maxPrice=50&minRating=0.7&number=3&wine=" + otherWines;
        var comparableAPI = {
          "async": true,
          "crossDomain": true,
          "url": comparableWineQueryURL,
          "method": "GET",
          "headers": {
            "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
            "Cache-Control": "no-cache",
          }
        }
        $.ajax(comparableAPI).then( (response) => {
          console.log(response.recommendedWines)
          var img = $("<img>");
          img.attr("src", response.recommendedWines[0].imageUrl);
          $("#otherWineImage1").html(img);
          var img = $("<img>");
          img.attr("src", response.recommendedWines[1].imageUrl);
          $("#otherWineImage2").html(img);
          var img = $("<img>");
          img.attr("src", response.recommendedWines[2].imageUrl);
          $("#otherWineImage3").html(img);
          var title = $("<p>");
          title.text(response.recommendedWines[0].title)
          $("#otherWineImage1").append(title);
          var title = $("<p>");
          title.text(response.recommendedWines[1].title)
          $("#otherWineImage2").append(title);
          var title = $("<p>");
          title.text(response.recommendedWines[2].title)
          $("#otherWineImage3").append(title);
          var otherwineprice = $("<p>")
          otherwineprice.text(response.recommendedWines[0].price)
          $("#otherWineImage1").append(otherwineprice);
          var otherwineprice = $("<p>")
          otherwineprice.text(response.recommendedWines[1].price)
          $("#otherWineImage2").append(otherwineprice);
          var otherwineprice = $("<p>")
          otherwineprice.text(response.recommendedWines[2].price)
          $("#otherWineImage3").append(otherwineprice);
        })

        // database.ref("/" + zip).push(newPairing);
      }

    });
    $(".autocomplete1").val("");
  });




  // var messagesRef = firebase.database().ref("messages");


  //listen for form submiyt
  // document.getElementById("contact-form").addEventListener("submit", submitForm);


  // //submit the form
  // function submitForm(e) {
  //   e.preventDefault();



  //   //getvalues
  //   var firstName = getInputVal("first_name");
  //   var lastName = getInputVal("last_name");
  //   var email = getInputVal("email");
  //   var message = getInputVal("textarea1");

  //   console.log(name);

  //   //save message
  //   saveMessage(firstName, lastName, email, message);

  //   //clear form
  //   document.getElementById("contact-form").reset();
  // }


  //function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;

  }



  // //save messages to firebase
  // function saveMessage(firstName, lastName, email, message) {
  //   var newMessageRef = messagesRef.push();
  //   newMessageRef.set({
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     message: message,
  //   })
  // };




  // $(".autocomplete").keyup(function (event) {
  //   var letterinput = $(".autocomplete").val();
  //   var autocompleteURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=" + letterinput;
  //   var autocompleteAPI = {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": autocompleteURL,
  //     "method": "GET",
  //     "headers": {
  //       "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
  //       "Cache-Control": "no-cache",
  //     }
  //   }
  //   $.ajax(autocompleteAPI).then(function (response) {
  //     console.log(response)
  //   })
  // })

  // database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  //   console.log(childSnapshot.val());
  // });
});
})