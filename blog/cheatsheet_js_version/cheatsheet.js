$title = $('.yellow-title');
$propertyName = $('#propertyName');
$red = $('.red');
$blue = $('.blue');
$dep = $('#dep');
$totalCategory = 0;
$totalType = 0;

function display(){    
    $.getJSON('https://api.myjson.com/bins/2grsf', function(data) {
        $totalCategory = data.info.length;
        $totalType = data.info[0].details.length;
        console.log($totalCategory);
        console.log($totalType);
        $titleText = data.info[0].category;
        console.log($titleText);
        $title.text($titleText);
        $info = data.info[0].details[0][0];
        $propertyText = $info.type;
        $propertyName.text($propertyText);
        $redText = $info.syntax[0];
        $blueText = $info.syntax[1];
        $red.text($redText);
        $blue.text($blueText);
        $depText = $info.description;
        $dep.text($depText);
    });
}

display();

