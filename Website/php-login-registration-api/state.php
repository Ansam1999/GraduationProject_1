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

    
    $KinderName = trim($data->KinderName);
    $state= trim($data->state);
    $Name=trim($data->Name);

  
        try{
         
                $insert_query = "UPDATE `forms` SET state=:state WHERE `KinderEmail`=:KinderEmail and `Name`=:Name" ;
                $insert_stmt = $conn->prepare($insert_query);
                 $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
                $insert_stmt->bindValue(':state', $state,PDO::PARAM_STR);
                $insert_stmt->bindValue(':Name', $Name,PDO::PARAM_STR);

         
                $insert_stmt->execute();

                $returnData = msg(1,201,'information Updated.');

      

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    
endif;

echo json_encode($returnData);