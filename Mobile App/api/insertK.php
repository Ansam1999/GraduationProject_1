<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1cove");

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Username = $DecodedData['Username'];
$Email = $DecodedData['Email'];
$City = $DecodedData['City'];
$Password = $DecodedData['Password'];
$PhoneNum = $DecodedData['PhoneNum'];
$Address = $DecodedData['Address'];
$coverfile = $DecodedData['coverfile'];
//$clothefile = $DecodedData['clothefile'];

//$Username = $_POST['Username'];
//$Email = $_POST['Email'];
//$City = $_POST['City'];
//$Password = $_POST['Password'];
//$PhoneNum = $_POST['PhoneNum'];
//$Address = $_POST['Address'];
//$coverfile = $_POST['coverfile'];
//$clothefile = $_POST['clothefile'];
$hash = password_hash($Password, PASSWORD_DEFAULT);
$IQ = "insert into kindergarteninfo(Username,Email,City,Password,PhoneNum,Address,coverfile) values('$Username','$Email','$City','$hash','$PhoneNum','$Address','$coverfile)";
$R = mysqli_query($CN,$IQ);

if($R){
$Message = "Kindergarten has been registered successfully";

}
else{
$Message = "Error in registered";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>