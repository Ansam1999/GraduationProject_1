<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
//$Email = $DecodedData['Email'];
$OrgEmail = $DecodedData['OrgEmail'];
$Username=$DecodedData['Username'];
//$City=$DecodedData['City'];

$IQ =" Update `newparent` set `Username`='$Username' where `Email`='$OrgEmail'";

$R = mysqli_query($CN,$IQ);

if($R){
$Message = "تم تحديث معلوماتك الشخصية";

}
else{
$Message = "Error in Viewing";
}

$Response[] = array("Message"=>$Message);
echo json_encode($Response);

?>