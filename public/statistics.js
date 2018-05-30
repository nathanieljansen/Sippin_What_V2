$(document).ready(function () {
    console.log("Stat page is up!");
    $.ajax({
        method: "GET",
        url: "/api/zip",
    }).then(function (dataFromDb) {
        console.log('you get all the wines finally', dataFromDb)
        var allZipCodes = dataFromDb.map(foodpairings => foodpairings.zip);
        console.log('Zip Code:', allZipCodes)
        var chart = c3.generate({
            bindto: '#chartZip',
            data: {
                columns: [
                    ["Count", count],
                    ["Zip", allZipCodes],
                ],
                type: 'bar',
                //type: 'donut',
                // title: 'Zip Code',
    
                onmouseover: function (d, i) {
                    console.log("onmouseover", d, i, this);
                },
                onmouseout: function (d, i) {
                    console.log("onmouseout", d, i, this);
                },
                onclick: function (d, i) {
                    console.log("onclick", d, i, this);
                },
            },
            axis: {
                x: {
                    label: 'Zip Code'
                },
                y: {
                    label: 'Count'
                }
            }
    
        });
        // setTimeout(function () {
        //     chart.load({
        //         columns: [
        //             ["wine", 130],
        //         ]
        //     });
        // }, 1000);
    
        // setTimeout(function () {
        //     chart.unload({
        //         ids: 'Merlot'
        //     });
        // }, 2000);    
    });
});


//     newFunction();

// function newFunction() {
//     $.ajax({
//         method: "GET",
//         url: "/api/zipCodes",
//     }).then(function (dataFromDb) {
//         console.log('you get all the Zips finally', dataFromDb);
//         var zip = dataFromDb.map(pair => pair.zip);
//         console.log('Zip', zip);
//     });
// }
    