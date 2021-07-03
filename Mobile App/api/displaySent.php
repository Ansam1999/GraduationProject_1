<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Email = $DecodedData['Email'];

$SQ="select * from forms where Email='$Email'";
$table=mysqli_query($CN,$SQ);


if(mysqli_num_rows($table)>0)
{
    while(null !==($Row=mysqli_fetch_assoc($table))){
    $Name=$Row["Name"];
    $city=$Row["city"];
    $address=$Row["address"];
    $KinderEmail=$Row["KinderEmail"];
    $parentPhone=$Row["parentPhone"];
    $stage=$Row["coverfile"];
    $gender=$Row["gender"];  
    $bus=$Row["bus"];
    $food=$Row["food"];
 $state=$Row["state"];
$cost=$Row["cost"];
$coverfile=$Row["coverfile"];
$Email=$Row["Email"];
$KinderName=$Row["KinderName"];
    $Response[]=array("Name"=>$Name,"city"=>$city,"address"=>$address,"KinderEmail"=>$KinderEmail,"parentPhone"=>$parentPhone,"coverfile"=>$coverfile,"gender"=>$gender,"stage"=>$stage,"bus"=>$bus,"food"=>$food,"cost"=>$cost,"state"=>$state,"Email"=>$Email,"KinderName"=>$KinderName);
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