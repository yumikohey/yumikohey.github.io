$(function () {
    var data = [{
        label: 'Minimum OS Memory',
        value: 30,
        color: "#68BE68"
    }, {
        label: 'Posix Share Memory',
        value: 50,
        color: "#539853"
    }

    ]

    var options = {
        animation: true
    };

    //Get the context of the canvas element we want to select
    var c = $('#pieChart');
    var ct = c.get(0).getContext('2d');
    var ctx = document.getElementById("pieChart").getContext("2d");
    /*************************************************************************/
    myNewChart = new Chart(ct).Pie(data, options);
});

$(function () {
    var data = [{
        label: 'Max Volume',
        value: 50,
        color: "#68BE68"
    }, {
        label: 'Min Volume',
        value: 20,
        color: "#539853"
    }

    ]

    var options = {
        animation: true
    };

    //Get the context of the canvas element we want to select
    var c = $('#pieChart_volume');
    var ct = c.get(0).getContext('2d');
    var ctx = document.getElementById("pieChart").getContext("2d");
    /*************************************************************************/
    myNewChart = new Chart(ct).Pie(data, options);
});