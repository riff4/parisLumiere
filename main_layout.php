<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="css_layout.css">
</head>

<body>
  

      
  <div class="column" style="width:40%;display:inline-block" >
    <div id="vis">
       <?php include("histogram2.php"); ?>
      </div>
    <div id="vis">
       <?php include("histogram2.php"); ?></div>      
    <div id="vis">
       <?php include("histogram2.php"); ?></div>  
    <div>
        <br /><br />

        <form action="" method="get" class="formulaire">
            <label> Durée : </label>
  <input type="checkbox" name="vehicle1" value="Bike"> Court métrage
  <input type="checkbox" name="vehicle2" value="Car" checked="checked"> Long métrage
    <input type="checkbox" name="vehicle1" value="Bike"> Série
        </form><br>
        
        <form action="" method="get" class="formulaire">
            <label>Type de film :</label>
  <input type="checkbox" name="vehicle1" value="Comedie"> Comédie
  <input type="checkbox" name="vehicle2" value="Drame" checked="checked"> Drame
  <input type="checkbox" name="vehicle3" value="Romance"> Romance
  <input type="checkbox" name="vehicle4" value="Action" checked="checked"> Action
  <input type="checkbox" name="vehicle5" value="Thriller" checked="checked"> Thriller
        </form><br>
      </div>
</div>
  
  <div class="column1" style="width:55%;height:600px;display:inline-block">
    <?php include("map.php"); ?>
  </div>  
    

    
    
</body>
