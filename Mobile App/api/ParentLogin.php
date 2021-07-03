<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");

  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Email = $DecodedData['Email'];
$Password = $DecodedData['Password'];

//$Email= $_POST['Email'];
//$Password = $_POST['Password'];
$SQ = "SELECT * FROM newparent WHERE Email = '$Email'";
$R = mysqli_query($CN,$SQ);
$check = mysqli_fetch_array($R, MYSQLI_ASSOC);
$City=$check['City'];
//$Email=$check['Email'];
$Username=$check['Username'];

if(isset($check)){
 if(password_verify($Password,$check['Password'])) {
   
    $Message = "Data Matched";
   $SuccessLoginMsg[] = array("Message"=>$Message,
                            //"Email"=>$Email,
                            "Username"=>$Username,
                             "ID"=>$check['ID'],
                             "City"=>$City);
 
 // Converting the message into JSON format.
$SuccessLoginJson = json_encode($Message);
 
// Echo the message.
// echo $SuccessLoginJson ; 
} 
 
 else{
 
 // If the record inserted successfully then show the message.
$Message= 'Invalid  Password Please Try Again' ;
 echo $Message;
// Converting the message into JSON format.

 
// Echo the message.

 
 }}
else{
// If the record inserted successfully then show the message.
$Message= 'Invalid  Username Please Try Again' ;
 echo $Message;
// Converting the message into JSON format.

 
// Echo the message.

}
$Response[] = array("Message"=>$Message);
echo json_encode($Message);

 mysqli_close($CN);

?>