<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Email = $DecodedData['Email'];

$SQ="select * from saved where Email='$Email'";
$table=mysqli_query($CN,$SQ);


if(mysqli_num_rows($table)>0)
{
    while(null !==($Row=mysqli_fetch_assoc($table))){
    $KinderName=$Row["KinderName"];
    $City=$Row["City"];
    $Address=$Row["Address"];
    $KinderEmail=$Row["KinderEmail"];
    $KinderPhone=$Row["KinderPhone"];
    $coverfile=$Row["coverfile"];
    $gender=$Row["gender"];
    $k1=$Row["k1"];
     $k2=$Row["k2"];    
    $bus=$Row["bus"];
    $food=$Row["food"];
 $place1=$Row["place1"];
$place2=$Row["place2"];

    $Response[]=array("KinderName"=>$KinderName,"City"=>$City,"Address"=>$Address,"KinderEmail"=>$KinderEmail,"KinderPhone"=>$KinderPhone,"coverfile"=>$coverfile,"gender"=>$gender,"k1"=>$k1,"k2"=>$k2,"bus"=>$bus,"food"=>$food,"place1"=>$place1,"place2"=>$place2);
echo "\n";
   }
   echo json_encode($Response);

}
else{
  $Response="لا يوجد عناصر محفوظة";
  echo json_encode($Response);


}
//$Response[]=array("Username"=>"Ansam","City"=>"NAblus","Address"=>"Nablus2","Email"=>'ansam@mail.com');
//echo json_encode($Response);
?>