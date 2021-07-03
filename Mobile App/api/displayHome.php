<?php
$CN =mysqli_connect("localhost","root","");
$DB=mysqli_select_db($CN,"gradpro1");
  $CN->query("SET NAMES utf8 COLLATE utf8_general_ci");


$SQ="select * from kinder ";
$table=mysqli_query($CN,$SQ);


if(mysqli_num_rows($table)>0)
{
    while(null !==($Row=mysqli_fetch_assoc($table))){
    $KinderName=$Row["KinderName"];
    $City=$Row["City"];
    $Address=$Row["Address"];
    $KinderEmail=$Row["KinderEmail"];
    $KinderPhone=$Row["KinderPhone"];
    $coverfile=$Row["coverfile"];
    $gender=$Row["gender"];
    $k1=$Row["k1"];
    $k2=$Row["k2"];    
    $bus=$Row["bus"];
    $food=$Row["food"];
    $place1=$Row["place1"];
    $place2=$Row["place2"];
    $KinderID=$Row["KinderID"];
$Rate=$Row["Rate"];
    $Response[]=array("KinderName"=>$KinderName,"City"=>$City,"Address"=>$Address,"KinderEmail"=>$KinderEmail,"KinderPhone"=>$KinderPhone,"coverfile"=>$coverfile,"gender"=>$gender,"k1"=>$k1,"k2"=>$k2,"bus"=>$bus,"food"=>$food,"place1"=>$place1,"place2"=>$place2,"KinderID"=>$KinderID,"Rate"=>$Rate);
echo "\n";
   }
   echo json_encode($Response);

}
else{
 $Username="";
    $City="";
    $Address="";
}
//$Response[]=array("Username"=>"Ansam","City"=>"NAblus","Address"=>"Nablus2","Email"=>'ansam@mail.com');
//echo json_encode($Response);
?>