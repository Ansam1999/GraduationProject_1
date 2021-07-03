<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"), true);
$returnData = [];


$t=0;
foreach($data as $row ){
    if($t == 2){
        $KinderEmail = $row;
    }
    if($t==3){
        $imageL=$row;
    }
    if($t==4){
        $classesL = $row;
    }
    else $t++;
    }



if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');


else:

        try{
            $insert_query = "DELETE FROM  `classes` WHERE `KinderEmail`=:KinderEmail";
            $insert_stmt = $conn->prepare($insert_query);
            $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
            $insert_stmt->execute();
            $total = 0;
            $j=0;
            $k=0;
            foreach($data as $row){
                if($total == 0 ){
                    while($j < $imageL){
                        $insert_query = "INSERT INTO `images`(`image`,`KinderEmail`) VALUES(:image,:KinderEmail)";
                        $insert_stmt = $conn->prepare($insert_query);
                        $insert_stmt->bindValue(':image', $row[$j],PDO::PARAM_STR);
                        $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
                        $insert_stmt->execute();
                        $j++;
                      //  $returnData = msg(1,201,'information registerd.');
                    } }
                elseif($total == 1){
                    while($k < $classesL){
                        $insert_query = "INSERT INTO `classes`(`name`,`KinderEmail`) VALUES(:name,:KinderEmail)";
                        $insert_stmt = $conn->prepare($insert_query);
                        $insert_stmt->bindValue(':name', $row[$k],PDO::PARAM_STR);
                        $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
                        $insert_stmt->execute();
                        $k++;
                      //  $returnData = msg(1,201,'information registerd.');
                    }

                }
                else {
                    $returnData = msg(1,201,'information registerd.');
                }
$total++;
                }

            }

        

        
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
   
    
endif;

echo json_encode($returnData);