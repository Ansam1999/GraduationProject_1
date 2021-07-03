<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$KinderEmail = $DecodedData['KinderEmail'];

$SQ="select * from kinder where KinderEmail='$KinderEmail'";
$table=mysqli_query($CN,$SQ);

$check = mysqli_fetch_array($table, MYSQLI_ASSOC);

    $KinderName=$check["KinderName"];
    $City=$check["City"];
    $Address=$check["Address"];
    $KinderEmail=$check["KinderEmail"];
    $KinderPhone=$check["KinderPhone"];
    $coverfile=$check["coverfile"];
    $gender=$check["gender"];
    $k1=$check["k1"];
     $k2=$check["k2"];    
    $bus=$check["bus"];
    $food=$check["food"];
 $place1=$check["place1"];
$place2=$check["place2"];
$KinderID=$check["KinderID"];
$Rate=$check["Rate"];
$NumRate=$check["NumRate"];
$RateSum=$check["RateSum"];
    $Response=array("KinderName"=>$KinderName,"City"=>$City,"Address"=>$Address,"KinderEmail"=>$KinderEmail,"KinderPhone"=>$KinderPhone,"coverfile"=>$coverfile,"gender"=>$gender,"k1"=>$k1,"k2"=>$k2,"bus"=>$bus,"food"=>$food,"place1"=>$place1,"place2"=>$place2,"KinderID"=>$KinderID,"NumRate"=>$NumRate,"Rate"=>$Rate,"RateSum"=>$RateSum);
echo "\n";
   
   echo json_encode($Response);


//$Response[]=array("Username"=>"Ansam","City"=>"NAblus","Address"=>"Nablus2","Email"=>'ansam@mail.com');
//echo json_encode($Response);
?>