$(document).ready(function () {
    console.log("Stat page is up!");
    // var values;
    $.ajax({
        method: "GET",
        url: "/api/allWines",
    }).then(function (dataFromDb) {
        console.log('you get all the wines finally', dataFromDb)
        var values = dataFromDb.map(pair => pair.zip);
        console.log('values', values)
        var chart = c3.generate({
            bindto: '#chartZip',
            data: {
                columns: [
                    ["Zip", values],
                    ["Count", count],
                ],
                type: 'bar',
                // type: 'donut',
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
                    label: 'Sepal.Width'
                },
                y: {
                    label: 'Petal.Width'
                }
            }
    
        });
        setTimeout(function () {
            chart.load({
                columns: [
                    ["wine", 130],
                ]
            });
        }, 1000);
    
        setTimeout(function () {
            chart.unload({
                ids: 'Merlot'
            });
        }, 2000);    
    });
});