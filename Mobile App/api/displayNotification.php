<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData,true);
$Email= $DecodedData['Email'];
$SQ="select * from forms where Email='$Email' ";
$table=mysqli_query($CN,$SQ);


if(mysqli_num_rows($table)>0)
{
    while(null !==($Row=mysqli_fetch_assoc($table))){

   if ($Row["state"] == null){$Response="no notification";}
  else{
    $KinderEmail=$Row["KinderEmail"];
$KinderName=$Row["KinderName"];
    $state=$Row["state"];

    $isViewed=$Row["isViewed"];
    $coverfile=$Row["coverfile"];
    $Response[]=array("KinderEmail"=>$KinderEmail,"state"=>$state,"isViewed"=>$isViewed,"coverfile"=>$coverfile,"KinderName"=>$KinderName);
echo "\n";
   }
   echo json_encode($Response);}

}
else{
 $KinderEmail="";
    $state="";
    $isViewed="";
}

?>