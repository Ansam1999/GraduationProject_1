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
    $profilePic=$Row["profilePic"];
   
    $Response[]=array("profilePic"=>$profilePic);
       echo json_encode($profilePic);

   



//$Response[]=array("Username"=>"Ansam","City"=>"NAblus","Address"=>"Nablus2","Email"=>'ansam@mail.com');
//echo json_encode($Response);
?>