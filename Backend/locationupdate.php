<?php
require __DIR__.'/classes/Database.php';
include_once("core.php");

$db_connection = new Database();
$conn = $db_connection->dbConnection();



$method = $_SERVER['REQUEST_METHOD'];
    switch($method) {

    case "PUT": 
            
            $sql = "UPDATE user SET location =:location WHERE user_id = :user_id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            
            $stmt->bindParam(':user_id', $path[5]);
            $stmt->bindParam(':location', $path[4]);
          

            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
            break;
            
            
    case "GET":
                try{  
                $query = "SELECT * from `restaurant` where `location`=:location";
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':location', $path[4]);
                // EXECUTING THE QUERY
                $stmt->execute();
    
                $r = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                // FETCHING DATA FROM DATABASE
                $result = $stmt->fetchAll();
                // OUTPUT DATA OF EACH ROW
                $json_array = array();
                foreach ($result as $row) 
                {
                    $json_array[]=$row;
                }
                }  catch(PDOException $e) {
                    echo "Error: " . $e->getMessage();
                }
                echo json_encode($json_array);
                break;
        }
?>