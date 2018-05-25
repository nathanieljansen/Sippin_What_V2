

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
     $('.modal').modal();
 
}


 
$(document).ready(() => {



  $(".wineSwipe").hide();
  $("#map").hide();
  $(() => {
    
    $('.parallax').parallax();
    $("#foodInput").keyup((event) => {
      if (event.keyCode === 13) {
        $(".searchButton").click();
      }
    });

    $(".searchButton").click(() => {
      // var letters = /^[A-Za-z]+$/
      console.log(window.localStorage);

      event.preventDefault();
      
      $("#words").empty();
      $("#image").empty();
      $("#otherWineImage1").empty();
      $("#otherWineImage2").empty();
      $("#otherWineImage3 ").empty();
      let textInput = $("#foodInput").val().trim().toLowerCase();
      foodValidation()
      

      $("#foodInput").val("");
     function foodValidation() {
       var onlyText = /[a-zA-Z]+$/
       if (textInput == "" || !textInput.match(onlyText)) {
         $(".notValid").text("You Should Probably Eat with Your Wine!");
           
       }else {
         const wineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=" + textInput + "&maxPrice=50";
         const wineAPI = {
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
           
          console.log("response", response)

          var zip = localStorage.getItem("zip");
          var pairingRecord = {
            zip: zip,
            food: textInput,
            pairingInfo: response,
          };

          $.ajax({
            method: "POST",
            url: "/api/pairingRecord",
            data: pairingRecord
          }).then(function (responseFromBackEnd) {
            console.log('Quit it!!', responseFromBackEnd)
          });

          console.log(pairingRecord)

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
             const pickedWine = response.productMatches[0].title
             console.log(pickedWine);
             const otherWines = response.pairedWines[0];

             let p = $("<p>");
             p.text(response.pairingText);
             $("#words").append(p);

             let img = $("<img>");
             img.attr("src", response.productMatches[0].imageUrl);
             $("#image").append(img);

             let description = $("<p>");
             description.text(response.productMatches[0].description);
             $("#words").append(description);



             let title = $("<p>");
             title.text(response.productMatches[0].title)
             $("#image").append(title);
             $(".wineSwipe").show();

             let newPairing = {
               foodInput: textInput,
               wineSelection: pickedWine
             }

             const comparableWineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/recommendation?maxPrice=50&minRating=0.7&number=3&wine=" + otherWines;
             const comparableAPI = {
               "async": true,
               "crossDomain": true,
               "url": comparableWineQueryURL,
               "method": "GET",
               "headers": {
                 "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
                 "Cache-Control": "no-cache",
               }
             }
             $.ajax(comparableAPI).then((response) => {
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
           }

         });
       }
     }
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
    // function getInputVal(id) {
    //   return document.getElementById(id).value;
    // }

  



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