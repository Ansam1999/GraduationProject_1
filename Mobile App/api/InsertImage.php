<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);

$Email = $DecodedData['Email'];
$profilePic = $DecodedData['profilePic'];



$IQ =" Update `newparent` set `profilePic`='$profilePic' where `Email`='$Email'";
$R = mysqli_query($CN,$IQ);

if($R){
$Message = "Image Saved successfully";

}
else{
$Message = "Error in Saving";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>