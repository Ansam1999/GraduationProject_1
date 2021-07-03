<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);

$KinderEmail = $DecodedData['KinderEmail'];
$Rate = $DecodedData['Rate'];
$NumRate = $DecodedData['NumRate'];
$RateSum = $DecodedData['RateSum'];


$IQ =" Update `kinder` set `Rate`=$Rate,`NumRate`=$NumRate,`RateSum`=$RateSum where `KinderEmail`='$KinderEmail'";

 
$R = mysqli_query($CN,$IQ);

if($R){
$Message = "تم حفظ تقييمك";

}
else{
$Message = "Error in Saving";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>