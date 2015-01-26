
$section = $('section');
//https://api.myjson.com/bins/r9a7

function display(){    
<<<<<<< HEAD
    $.getJSON('https://api.myjson.com/bins/r9a7', function(data) {
=======
    $.getJSON('http://yumikohey.github.io/blog/cheatsheet_js_version/data.json', function(data) {
>>>>>>> origin/master
        $totalCategory = data.info.length;
        $totalType = data.info[0].details.length;
        
        for(var i = 0; i < $totalCategory; i++){
        	$row = $("<div class='right-row'></div>");
	        $section.append($row);
	        $yellowTitle = $("<div class='column yellow-title'></div>");
	        $titleText = data.info[i].category;
	        $yellowTitle.text($titleText);
	        $row.append($yellowTitle);

           for(var j=0; j < $totalType; j++){

            $column = $("<div class='column'></div>");
            $colFour = $("<div class='col-4'></div>");
            $propertyName = $("<p id='propertyName'></p>");
            $info = data.info[i].details[j][0];
            $propertyText = $info.type;
            $propertyName.text($propertyText);
            $colFour.append($propertyName);
            $column.append($colFour);
            $colEight = $("<div class='col-8'><p></p></div>");
            $red = $("<span class='red'></span>");
            $blue= $("<span class='blue'></span>");
            $redText = $info.syntax[0];
            $blueText = $info.syntax[1];
            $red.text($redText);
            $blue.text($blueText);
            $colEight.append($red);
            $colEight.append($blue);
            $dep = $("<p id='dep'></p>");
            $depText = $info.description;
            $dep.text($depText);
            $colEight.append($dep);
            $column.append($colEight);
            $row.append($column);
           }
        }
    });

// modify height to extend background color
    $('section').height(1200);
}

display();




