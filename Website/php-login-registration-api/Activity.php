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
|| !isset($data->Place)
|| !isset($data->Name)
|| !isset($data->Time)
|| !isset($data->Date)
|| !isset($data->Duration)

|| empty(trim($data->KinderEmail))
|| empty(trim($data->Place))
|| empty(trim($data->Name))
|| empty(trim($data->Time))
|| empty(trim($data->Date))
|| empty(trim($data->Duration))



    
    ):

    $fields = ['fields' => ['KinderEmail','Place','Name','Time','Date','Duration']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $KinderEmail = trim($data->KinderEmail);
    $Place = trim($data->Place);
    $Name = trim($data->Name);
    $Time = trim($data->Time); 
     $Date = trim($data->Date);
    $Duration = trim($data->Duration);
   $Note = trim($data->Note);

   
    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    
        try{
            
            $fetch_user_by_email = "INSERT INTO `activity`(`KinderEmail`,`Name`,`Place`,`Time`,`Date`,`Duration`,`Note`) VALUES(:KinderEmail,:Name,:Place,:Time,:Date,:Duration,:Note)";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
            $query_stmt->bindValue(':Place', $Place,PDO::PARAM_STR);
            $query_stmt->bindValue(':Name', $Name,PDO::PARAM_STR);
$query_stmt->bindValue(':Note', $Note,PDO::PARAM_STR);
$query_stmt->bindValue(':Time', $Time,PDO::PARAM_STR);
$query_stmt->bindValue(':Date', $Date,PDO::PARAM_STR);
$query_stmt->bindValue(':Duration', $Duration,PDO::PARAM_STR);
         
            $query_stmt->execute();
            
            $returnData = msg(1,201,'Activity inserted');
            
        
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }


endif;

echo json_encode($returnData);