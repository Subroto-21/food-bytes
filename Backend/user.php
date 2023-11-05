<?php
require __DIR__.'/classes/Database.php';
include_once("core.php");

$db_connection = new Database();
$conn = $db_connection->dbConnection();
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
   case 'GET':   
    try 
    {
    $query = "select * from `user`";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $r = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();
        $json_array = array();
        foreach ($result as $row) 
        {
         $json_array[]=$row;
        }
       
    } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
    }
    echo json_encode($json_array);
    break;

    case 'DELETE':
        $sql = "DELETE FROM user WHERE user_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
    }