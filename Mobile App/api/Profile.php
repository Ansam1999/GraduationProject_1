<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
  $EncodedData = file_get_contents('php://input');
  $DecodedData = json_decode($EncodedData,true);
  $Email = $DecodedData['Email'];

$SQ="select * from newparent where Email='$Email'";
$table=mysqli_query($CN,$SQ);

    $Row=mysqli_fetch_assoc($table);
    $Username=$Row["Username"];
    $City=$Row["City"];
    $profilePic=$Row["profilePic"];
   
    //echo json_encode($Email,$City);

    $Response[]=array("City"=>$City,"Username"=>$Username,"profilePic"=>$profilePic);
       echo json_encode($Response);

   



//$Response[]=array("Username"=>"Ansam","City"=>"NAblus","Address"=>"Nablus2","Email"=>'ansam@mail.com');
//echo json_encode($Response);
?>