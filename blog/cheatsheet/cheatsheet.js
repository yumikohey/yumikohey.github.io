$numberOfSyntax = 0;


function displayQuestion(){   
    $.getJSON('data.json', function(data) {
        $numberOfSyntax = data.info.length;        
    });
}