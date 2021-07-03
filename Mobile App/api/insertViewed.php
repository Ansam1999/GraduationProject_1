<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Email = $DecodedData['Email'];
$KinderEmail = $DecodedData['KinderEmail'];
$Name=$DecodedData['Name'];
$isViewed=$DecodedData['isViewed'];
$IQ =" Update forms set isViewed=$isViewed where KinderEmail='$KinderEmail'and Email='$Email' and Name='$Name'";

$R = mysqli_query($CN,$IQ);

if($R){
$Message = "Notification Viewed";

}
else{
$Message = "Error in Viewing";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>