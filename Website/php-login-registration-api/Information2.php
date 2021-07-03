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
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->k1)
    ||  !isset($data->k2)
    ||  !isset($data->place1)
    ||  !isset($data->place2)
    || !isset($data->KinderEmail)
  
    ||  empty(trim($data->k1))
    ||  empty(trim($data->k2))
    ||  empty(trim($data->place1))
    ||  empty(trim($data->place2))
    || empty(trim($data->KinderEmail))



 


    ):

    $fields = ['fields' => ['k1','k2','place1','place2','KinderEmail']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    
    $k1 = trim($data->k1);
    $k2 = trim($data->k2);
 $place1 = trim($data->place1);
 $place2 = trim($data->place2);
    $bus = trim($data->bus);
    $food = trim($data->food);
    $KinderEmail = trim($data->KinderEmail);

   
        try{
         
                $insert_query ="UPDATE `kinder` SET k1=:k1, k2=:k2,place1=:place1,place2=:place2,bus=:bus,food=:food WHERE `KinderEmail`=:KinderEmail" ;
                $insert_stmt = $conn->prepare($insert_query);
                $insert_stmt->bindValue(':k1', $k1,PDO::PARAM_INT);
                $insert_stmt->bindValue(':k2', $k2,PDO::PARAM_INT);
                $insert_stmt->bindValue(':place1', $place1,PDO::PARAM_INT);
                $insert_stmt->bindValue(':place2', $place2,PDO::PARAM_INT);
                $insert_stmt->bindValue(':bus', $bus,PDO::PARAM_INT);
                $insert_stmt->bindValue(':food', $food,PDO::PARAM_INT);
                $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);

           

                $insert_stmt->execute();

                $returnData = msg(1,201,'information Updated.');

      

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
  
    
endif;

echo json_encode($returnData);