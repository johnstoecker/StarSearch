<%-- 
    Document   : index
    Created on : Jun 15, 2013, 12:19:58 AM
    Author     : joman
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Finding stars</title>
    </head>
    <body>
        <h1>Find a bunch of stars!</h1>
        <!--<input type="string" id="starName" value="star name">-->
        Choose your declination, or y coordinates. First, your bottom declination (low y, -90 to 90):<br>
        <input type="number" id="declinationBottom" value="Declination Bottom"><br>
        And your top declination (high y, -90 to 90):<br>
        <input type="number" id="declinationTop" value="Declination Top"><br>
        Next, choose your ascension, or x coordinates. They will come in the form x hours, y minutes, z seconds. First, leftmost ascension (low x):<br>
        <input type="number" id="lowAscensionHours" value="Hours"><input type="number" id="lowAscensionMinutes" value="Minutes"><input type="number" id="lowAscensionSeconds" value="Seconds"><br>
        And your right-most ascension (high x):<br>
        <input type="number" id="highAscensionHours" value="Hours"><input type="number" id="highAscensionMinutes" value="Minutes"><input type="number" id="highAscensionSeconds" value="Seconds"><br>
        Now, choose how many stars you want:<br>
        <input type="number" id="numStars" value="Number of stars"><br>
        <button id="search">Search Me Some Starz!</button><br>
        <h3>Results</h3>
        <canvas id="theSky" width="700" height="500"></canvas>
        <p id="results"></p>
    </body>
    <script type="text/javascript" src="resources/jquery-min.js"></script>
    <script type="text/javascript" src="starSearchDB.js"></script>
</html>
