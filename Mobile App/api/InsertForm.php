<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Name = $DecodedData['Name'];
$KinderEmail = $DecodedData['KinderEmail'];
$city = $DecodedData['city'];
$parentPhone= $DecodedData['parentPhone'];
$gender = $DecodedData['gender'];
$address = $DecodedData['address'];
$bus = $DecodedData['bus'];
$food= $DecodedData['food'];
$stage= $DecodedData['stage'];
$cost= $DecodedData['cost'];
$coverfile= $DecodedData['coverfile'];
$KinderName= $DecodedData['KinderName'];
$Email= $DecodedData['Email'];
$IQ = "insert into forms(KinderEmail,Name,city,parentPhone,gender,address,bus,food,stage,cost,coverfile,KinderName,Email) values('$KinderEmail','$Name','$city','$parentPhone','$gender','$address','$bus','$food','$stage','$cost','$coverfile','$KinderName','$Email')";
 
$R = mysqli_query($CN,$IQ);

if($R){
$Message = "تم ارسال طلبك بنجاح";

}
else{
$Message = "Error in form";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>