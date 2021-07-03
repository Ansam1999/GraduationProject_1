<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$KinderEmail = $DecodedData['KinderEmail'];

$SQ="select * from forms where KinderEmail='$KinderEmail'";
$table=mysqli_query($CN,$SQ);


if(mysqli_num_rows($table)>0)
{
    while(null !==($Row=mysqli_fetch_assoc($table))){
    $Name=$Row["Name"];
    $city=$Row["city"];
    $address=$Row["address"];
    $KinderEmail=$Row["KinderEmail"];
    $parentPhone=$Row["parentPhone"];
    $stage=$Row["stage"];
    $gender=$Row["gender"];   
    $bus=$Row["bus"];
    $food=$Row["food"];

    $Response[]=array("Name"=>$Name,"city"=>$city,"address"=>$address,"KinderEmail"=>$KinderEmail,"parentPhone"=>$parentPhone,"stage"=>$stage,"gender"=>$gender,"bus"=>$bus,"food"=>$food);
echo "\n";
   }
   echo json_encode($Response);

}
else{
   echo json_encode("لا يوجد أي طلبات في الوقت الحالي");
}
//$Response[]=array("Username"=>"Ansam","City"=>"NAblus","Address"=>"Nablus2","Email"=>'ansam@mail.com');
//echo json_encode($Response);
?>