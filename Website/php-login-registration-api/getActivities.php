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
    || empty(trim($data->KinderEmail))
    ):

    $fields = ['fields' => ['KinderEmail']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $KinderEmail = trim($data->KinderEmail);
   

   
    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    
        try{
            
            $fetch_user_by_email = "SELECT * FROM `activity` WHERE `KinderEmail`=:KinderEmail";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
            $query_stmt->execute();
            
            $i=0;
            

            // IF THE USER IS FOUNDED BY EMAIL
            if($query_stmt->rowCount()):
              while($row = $query_stmt->fetch(PDO::FETCH_ASSOC)){
                  $Name = $row['Name'];
                  $Place = $row['Place'];
                  $Time = $row['Time'];
                  $Duration = $row['Duration'];
                  $Date = $row['Date'];
                  $Note= $row['Note'];
                 
                  $r[$i] = array("Name"=>$Name,"Place"=>$Place,"Time"=>$Time,"Duration"=>$Duration,"Date"=>$Date,"Note"=>$Note);

                  $i++;

              }  
                    
                    $returnData = [
                        'success' => 1,
                        'message' => 'You have successfully fetch Activities',
                        'Activities' => $r
                    ];

            // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
            else:
                $returnData =msg(0,422,'Invalid KinderEmail');
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }


endif;

echo json_encode($returnData);