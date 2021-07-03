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

require __DIR__.'/classes/Database.php';
require __DIR__.'/classes/JwtHandler.php';

$db_connection = new Database();
$conn = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT EQUAL TO POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->KinderEmail)  
|| !isset($data->state)
|| !isset($data->Name)


|| empty(trim($data->KinderEmail))
|| empty(trim($data->state))
|| empty(trim($data->Name))
    
    ):

    $fields = ['fields' => ['KinderEmail','state','Name']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $kinderEmail = trim($data->KinderEmail);
    $state = trim($data->state);
    $Name = trim($data->Name);
 
   

   
    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    
        try{
            
            $fetch_user_by_email = "UPDATE `forms` SET `state`=:state WHERE `kinderEmail`=:kinderEmail and `Name`=:Name";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':kinderEmail', $kinderEmail,PDO::PARAM_STR);
            $query_stmt->bindValue(':state', $state,PDO::PARAM_STR);
            $query_stmt->bindValue(':Name', $Name,PDO::PARAM_STR);
         
            $query_stmt->execute();
            
            $returnData = msg(1,201,'Accept Updated');
            
        
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }


endif;

echo json_encode($returnData);