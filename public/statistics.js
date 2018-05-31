// import c3 from "./c3.min.js"

$(document).ready(function () {
    console.log("Stat page is up!");
    $.ajax({
        method: "GET",
        url: "/api/allWines/age",
    }).then((response) => {
        const chartObject = {
                data: {
                    xs: {
                        age: "age_x"
                    },
                    columns: [
                        ["age", ...response.map(age => age.ageCount)],
                        ["age_x", ...response.map(age => age.age)]
                        
                    ],
                    type: "scatter"
                },
                axis: {
                    x: {
                        label: "Age",
                        tick: {
                            fit: false
                        }
                    },
                    y: {
                        label: "Count"
                    }
                }
            }

        

        const ageChart = c3.generate({ ...chartObject})

        $("#chart").append(ageChart)
    })
    
})




