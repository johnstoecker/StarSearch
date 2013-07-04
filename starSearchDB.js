



//startup!
if(window.openDatabase){
    importStars();
    addListeners();
}


function importStars(){
    db = openDatabase('stars', '1.0', 'stars', 3 * 1024 * 1024, function() {
        addStars();
        //        console.log('loading your stars');
        //        $.get('./resources/stars.SQL', function(response) {
        //            //making star database of size 3MB
        //            doSQL(db, 0, response.split(';\n'), 'stars'); 
        //        });
        });
    addStars();
}

function addListeners(){
    $(document).ready(function(){
        console.log('loaded');
        $("#search").click(function(){
            var c=document.getElementById("theSky");
            var ctx=c.getContext("2d");
            ctx.font="15px Arial";
            var width = c.width;
            var height = c.height;
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0,0,width,height);
            ctx.fillStyle="#000000";
            var declinationBottom = $("#declinationBottom").val();
            var declinationTop = $("#declinationTop").val();
            var leftHours = (parseInt($("#lowAscensionHours").val()) ? parseInt($("#lowAscensionHours").val()) : -24);
            var leftMinutes = parseInt($("#lowAscensionMinutes").val()) ? parseInt($("#lowAscensionMinutes").val()): 0;
            var leftSeconds = parseInt($("#lowAscensionSeconds").val()) ? parseInt($("#lowAscensionSeconds").val()): 0;
            var rightHours = parseInt($("#highAscensionHours").val()) ? parseInt($("#highAscensionHours").val()): 24;
            var rightMinutes = parseInt($("#highAscensionMinutes").val()) ? parseInt($("#highAscensionMinutes").val()): 0;
            var rightSeconds = parseInt($("#highAscensionSeconds").val()) ? parseInt($("#highAscensionSeconds").val()): 0;
            console.log(leftHours);
            //decimal form of hours/min/secs
            var leftTotalHours = (leftHours + (leftMinutes/60) + (leftSeconds/60/60));
            var rightTotalHours = (rightHours + rightMinutes/60 + rightSeconds/60/60);
            var leftRadians = (leftHours/12 + (leftMinutes/720) + (leftSeconds/43200)) * Math.PI;
            var rightRadians = (rightHours/12 + (rightMinutes/720) + (rightSeconds/43200)) * Math.PI;
//            console.log(leftRadians+' '+rightRadians);
            var numStars = $("#numStars").val();
            if(!numStars){
                numStars = 300;
            }
            //projecting polar coordinates onto x/y
            var scaledWidth = width/(rightTotalHours - leftTotalHours);
            var scaledHeight = height/(declinationTop - declinationBottom);
            
            db.readTransaction(function (t) {
                t.executeSql('SELECT * FROM stars WHERE dec > ? AND dec < ? AND ra > ? AND ra < ? ORDER BY mag ASC LIMIT ?;', [declinationBottom, declinationTop, leftTotalHours, rightTotalHours, numStars], function (t, results) {
                    var string =  '<table id="resultsTable" border="1"><tr style ="font-weight: bold"><td>Name</td>\n\
                            <td>Declination</td><td>Ascension</td><td>Magnitude</td><td>Bayer/Flamsteed</td>Results</tr>';
                    for (var i = 0; i < results.rows.length; i++){
                        string += '<tr><td>'+results.rows.item(i).proper_name+'</td><td>'+
                            results.rows.item(i).dec+'</td><td>'+results.rows.item(i).ra+'</td><td>'+
                            results.rows.item(i).mag+'</td><td>'+results.rows.item(i).bayer_flamsteed+'</td></tr>';
                            ctx.beginPath();
                            var x = width - (results.rows.item(i).ra - leftTotalHours)*scaledWidth;
                            var y = height - (results.rows.item(i).dec - declinationBottom)*scaledHeight;
                            ctx.arc(x, y, 12/Math.abs(results.rows.item(i).mag)+3,0,2*Math.PI);
                            ctx.stroke();
                            ctx.fillText(results.rows.item(i).proper_name,x,y);
                    }
                    string+='</table>';
                    $("#results").html(string);
                }, function (t, e) {
                    // couldn't read database
                    $("#results").html(e.message);
                });
            });

        });
        $("#btn1").click(function(){
            alert("eyyyyy");
        });
    });
}

function addStars() {
    $.get('./resources/hyg.csv', function(response) {
        //making star database of size 3MB
        var starRows = response.split('\n');

            var createTableCall = 'CREATE TABLE IF NOT EXISTS "stars" (\n\
                      "star_id" int(8) DEFAULT NULL,\n\
                      "hip" int(8) DEFAULT NULL,\n\
                      "hd" int(8) DEFAULT NULL,\n\
                      "hr" int(8) DEFAULT NULL,\n\
                      "gliese" varchar(50) DEFAULT NULL,\n\
                      "bayer_flamsteed" varchar(50) DEFAULT NULL,\n\
                      "proper_name" varchar(50) DEFAULT NULL,\n\
                      "ra" double DEFAULT NULL,\n\
                      "dec" double DEFAULT NULL,\n\
                      "distance" double DEFAULT NULL,\n\
                      "mag" double DEFAULT NULL,\n\
                      "abs_mag" double DEFAULT NULL,\n\
                      "spectrum" varchar(50) DEFAULT NULL,\n\
                      "color_index" double DEFAULT NULL\n\
                    ) ;'
            tx.executeSql(createTableCall, function(){
                console.log('success!')
                }, function(txx, error) {
                console.log(error)
                });

            for(var i=0; i<starRows.length; i++){
                var currentStar = starRows[i].split(',');
                tx.executeSql("INSERT INTO stars (star_id, hip, hd, hr, gliese, bayer_flamsteed, proper_name, ra,\n\
                                dec, distance, mag, abs_mag, spectrum, color_index) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?,?)",
                    currentStar, function(){
                        }, function(txx, error) {
                        console.log(error.message)
                        }
                    );
            }
        });
     });
}
