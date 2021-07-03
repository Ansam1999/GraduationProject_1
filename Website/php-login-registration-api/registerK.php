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
elseif(!isset($data->KinderName) 
    || !isset($data->KinderEmail) 
    || !isset($data->Password)
    || !isset($data->City)
    || !isset($data->KinderPhone)
    || !isset($data->Address)
    || !isset($data->coverfile)
    
    || empty(trim($data->KinderName))
    || empty(trim($data->KinderEmail))
    || empty(trim($data->Password))
    || empty(trim($data->City))
    || empty(trim($data->KinderPhone))
    || empty(trim($data->Address))
    || empty(trim($data->coverfile))
 

    ):

    $fields = ['fields' => ['KinderName','KinderEmail','Password','City','KinderPhone','Address','coverfile']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    
    $KinderName = trim($data->KinderName);
    $KinderEmail = trim($data->KinderEmail);
    $Password = trim($data->Password);
    $City = trim($data->City);
    $KinderPhone = trim($data->KinderPhone);
    $Address = trim($data->Address);
    $coverfile = trim($data->coverfile);

    if(!filter_var($KinderEmail, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Invalid Email Address!');
    
    

    elseif(strlen($KinderName) < 3):
        $returnData = msg(0,422,'Your name must be at least 3 characters long!');

    else:
        try{

            $check_KinderName = "SELECT `KinderName` FROM `kinder` WHERE `KinderName`=:KinderName";
            $check_KinderName_stmt = $conn->prepare($check_KinderName);
            $check_KinderName_stmt->bindValue(':KinderName', $KinderName,PDO::PARAM_STR);
            $check_KinderName_stmt->execute();

            if($check_KinderName_stmt->rowCount()):
                $returnData = msg(0,422, 'This KinderName already in use!');
            
            else:
                $insert_query = "INSERT INTO `kinder`(`KinderName`,`KinderEmail`,`Password`,`City`,`KinderPhone`,`Address`,`coverfile`) VALUES(:KinderName,:KinderEmail,:Password,:City,:KinderPhone,:Address,:coverfile)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':KinderName', htmlspecialchars(strip_tags($KinderName)),PDO::PARAM_STR);
                $insert_stmt->bindValue(':KinderEmail', $KinderEmail,PDO::PARAM_STR);
                $insert_stmt->bindValue(':Password', password_hash($Password, PASSWORD_DEFAULT),PDO::PARAM_STR);
                $insert_stmt->bindValue(':City', $City,PDO::PARAM_STR);
                $insert_stmt->bindValue(':KinderPhone', $KinderPhone,PDO::PARAM_STR);
                $insert_stmt->bindValue(':Address', $Address,PDO::PARAM_STR);
                $insert_stmt->bindValue(':coverfile', $coverfile,PDO::PARAM_STR);
               
                $insert_stmt->execute();

                $returnData = msg(1,201,'You have successfully registered.');

            endif;

        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    endif;
    
endif;

echo json_encode($returnData);