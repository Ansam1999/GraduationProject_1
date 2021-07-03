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
elseif(!isset($data->KinderID)  
    || !isset($data->KinderEmail)
    || empty(trim($data->KinderID))
    || empty(trim($data->KinderEmail))
    
    ):

    $fields = ['fields' => ['KinderID','KinderEmail']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    
    $KinderID = trim($data->KinderID);
    $KinderEmail = trim($data->KinderEmail);
  


  
        try{
         
                $insert_query = "UPDATE `kinder` SET KinderID=:KinderID WHERE `KinderEmail`=:KinderEmail" ;
                $insert_stmt = $conn->prepare($insert_query);
                $insert_stmt->bindValue(':KinderID', $KinderID,PDO::PARAM_STR);
                $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
              
                $insert_stmt->execute();

                $returnData = msg(1,201,'information Updated.');

      

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
 
    
endif;

echo json_encode($returnData);