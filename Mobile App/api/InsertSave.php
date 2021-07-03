<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Email = $DecodedData['Email'];
$KinderEmail = $DecodedData['KinderEmail'];
$KinderPhone = $DecodedData['KinderPhone'];
$KinderName = $DecodedData['KinderName'];
$gender = $DecodedData['gender'];
$City = $DecodedData['City'];
$k1 = $DecodedData['k1'];
$k2= $DecodedData['k2'];
$place1= $DecodedData['place1'];
$place2= $DecodedData['place2'];
$bus= $DecodedData['bus'];
$food = $DecodedData['food'];
$coverfile = $DecodedData['coverfile'];
$Address= $DecodedData['Address'];

$IQ = "insert into saved(Email,KinderEmail,KinderPhone,KinderName,gender,City,k1,k2,bus,food,coverfile,Address,place2,place1) values('$Email','$KinderEmail','$KinderPhone','$KinderName','$gender','$City','$k1','$k2','$bus','$food','$coverfile','$Address','$place2','$place1')";
 
$R = mysqli_query($CN,$IQ);

if($R){
$Message = "تم حفظ الروضة في العناصر المحفوظة";

}
else{
$Message = "Error in Saving";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>