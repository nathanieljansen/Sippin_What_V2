// import c3 from "./c3.min.js"

$(document).ready(function () {
    console.log("Stat page is up!");
    $.ajax({
        method: "GET",
        url: "/api/allWines/age",
    }).then((response) => {
        const ageChart = c3.generate({
            bindto: ".ageChart",
           
            data: {

                xs: {
                    age: "age_x"
                },
                colors: {
                    age: "#8f8023"
                },
                columns: [
                   ["age", ...response.map(age => age.ageCount)], 
                   ["age_x", ...response.map(age => age.age)]

                ],
                type: "area"
            },
            axis: {
                x: {
                //    type: "category",
                //     label: "Age",
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: "Count"
                }
            }
        })
        
    })
    $.ajax({
        method: "GET",
        url: "/api/allWines/zip",
    }).then((response) => {
        const zipChart = c3.generate({
            bindto: ".zipChart",
            data: {
                xs: {
                    zip: "zip_x"
                },
                colors: {
                    zip: "#8f8023"
                },
                columns: [
                    ["zip", ...response.map(zip => zip.zipCount)],
                    ["zip_x", ...response.map(zip => zip.zip)]

                ],
                type: "bar"
            },
            axis: {
                x: {
                    type: 'category',
                    label: "Zip",
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: "Count"
                }
            }
        })
    })

   $.ajax({
       method: "GET",
       url: "/api/allWines/firstmatch",
   }).then((response) => {
       const wineChart = c3.generate({
           bindto: ".wineChart",
           data: {
               xs: {
                   first_match: "first_match_x"
               },
               colors: {
                   first_match: "#8f8023"
               },
               columns: [
                   ["first_match", ...response.map(first_match => first_match.first_matchCount)],
                   ["first_match_x", ...response.map(first_match => first_match.first_match)]

               ],
               type: "bar"
           },
           axis: {
               x: {
                   type: 'category',
                   label: "Wine",
                   tick: {
                       fit: false
                   }
               },
               y: {
                   label: "Count"
               }
           }
       })
   })

    $.ajax({
        method: "GET",
        url: "/api/allWines/food",
    }).then((response) => {
        const wineChart = c3.generate({
            bindto: ".foodChart",
            data: {
                xs: {
                    food: "food_x"
                },
                colors: {
                    food: "#8f8023"
                },
                columns: [
                    ["food", ...response.map(food => food.foodCount)],
                    ["food_x", ...response.map(food => food.food)]

                ],
                type: "area"
            },
            axis: {
                x: {
                    type: 'category',
                    label: "Food",
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: "Count"
                }
            }
        })
    })

    setTimeout(function () {
        chart.load({
            columns: [
                
            ]
        });
    }, 1500);
    
})


