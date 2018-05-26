const onlyText = /[a-zA-Z]+$/



window.onbeforeunload = () => {
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
      console.log(window.localStorage);
      event.preventDefault();

      $("#words").empty();
      $("#image").empty();
      $("#otherWineImage1").empty();
      $("#otherWineImage2").empty();
      $("#otherWineImage3 ").empty();
      let foodInput = $("#foodInput").val().trim().toLowerCase();
      foodValidation()
      $("#foodInput").val("");

      function foodValidation() {
        if (foodInput == "" || !foodInput.match(onlyText)) {
          $(".notValid").text("You Should Probably Eat with Your Wine! Try Typing in Some Food");
        } else {
          const wineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=" + foodInput + "&maxPrice=50";
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
              food: foodInput,
              pairingInfo: response
            };

            $.ajax({
              method: "POST",
              url: "/api/pairingRecord",
              data: pairingRecord
            }).then((responseFromBackEnd) => {
              console.log('Quit it!!', responseFromBackEnd)
            });

            console.log(pairingRecord)



            if (response.status === "failure") {
              console.log(response.message)
              $(".notValid").text("Sorry! " + response.message + ". We are always trying to improve. Thanks for you help!");
              database.ref().push(badPairing);
            } else if (response.pairingText === "") {
              $(".notValid").text("Thanks for making us better! We didn't find a pairing for " + foodInput + " but we are always trying to improve our app");
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
                foodInput: foodInput,
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



    $(".contactButton").click(() => {
      event.preventDefault();
      messageValidation();
      $("#name").val("")
      $("#email").val("")
      $("#message").val("")
      
    })

    function messageValidation() {
      name = $("#name").val().trim()
      email = $("#email").val().trim()
      message = $("#message").val()
      let newMessage = {
        name: name,
        email: email,
        message: message
      };
      if (name == "" || email == "" || message == "") {
       $(".submitContact").text("Oops! Looks like you've missed something!")
      } else {
        $(".submitContact").text("Thanks! We will be in touch soon!")
        $.post("/api/messages", newMessage)
          .done((data) => {
            console.log(data);

          });
        // $("#contact-form").text("HURRAY!!!")
      }
    }


  });




})