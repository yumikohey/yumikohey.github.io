$(function(){

    var pieGenerator = function(data, variable_id){
        var options = {
            animation: true
        };
        //Get the context of the canvas element we want to select
        var c = $(variable_id);
        var ct = c.get(0).getContext('2d');
        var ctx = document.getElementById("pieChart").getContext("2d");
        /*************************************************************************/
        myNewChart = new Chart(ct).Pie(data, options);
    }

    var first_pie_data = [{
        label: 'Minimum OS Memory',
        value: 30,
        color: "#68BE68"
    }, {
        label: 'Posix Share Memory',
        value: 50,
        color: "#539853"
    }];

    var first_pie_chart_id = '#pieChart';
    pieGenerator(first_pie_data, first_pie_chart_id);


    var second_pie_data = [{
        label: 'Max Volume',
        value: 50,
        color: "#68BE68"
    }, {
        label: 'Min Volume',
        value: 20,
        color: "#539853"
    }];

    var second_pie_chart_id = '#pieChart_volume';
    pieGenerator(second_pie_data, second_pie_chart_id);
})

