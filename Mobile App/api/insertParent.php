<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Username = $DecodedData['Username'];
$Email = $DecodedData['Email'];
$City = $DecodedData['City'];
$Password = $DecodedData['Password'];
$RePassword = $DecodedData['RePassword'];

if($Password != $RePassword){
$Message = "Passwords do not match";
}
else{

$hash = password_hash($Password, PASSWORD_DEFAULT);

$IQ = "insert into newparent(Username,Email,City,Password) values('$Username','$Email','$City','$hash')";
 
$R = mysqli_query($CN,$IQ);

if($R){
$Message = "تم إنشاء حسابك بنجاح";

}
else{
$Message = "Error in registration";
}
}
$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>