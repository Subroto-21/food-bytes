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
    $query = "select * from `restaurant`";

    $path = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($path[4]) && is_numeric($path[4])) {
    
        $query .="where restaurant_id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $path[4]);
        $stmt->execute();
        $r = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();
        $json_array = array();
        foreach ($result as $row) 
        {
         $json_array=$row;
        }
    }
    else
    {
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $r = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $result = $stmt->fetchAll();
        $json_array = array();
        foreach ($result as $row) 
        {
         $json_array[]=$row;
        }
    }
       
    } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
    }

    echo json_encode($json_array);
    break;

    case 'POST':        
        
        try{
        $restaurants = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO `restaurant`(restaurant_id,rating,name,location,m_id,image) values(null,null,:name,:address,:menu,:image)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $restaurants->name);
        $stmt->bindParam(':address', $restaurants->address);
        $stmt->bindParam(':menu', $restaurants->menu);
        $stmt->bindParam(':image', $restaurants->image);

        if($stmt->execute()) {
            $data = ['status' => 1, 'message' => "Record successfully created"];
        } else {
            $data = ['status' => 0, 'message' => "Failed to create record."];
        }
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        echo json_encode($data);
        break;

    case 'PUT':

        try{
            $restaurants = json_decode(file_get_contents('php://input'));
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "UPDATE `restaurant` SET name= :name, location= :location, image= :image WHERE restaurant_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->bindParam(':name', $restaurants->name);
            $stmt->bindParam(':location', $restaurants->location);
            $stmt->bindParam(':image', $restaurants->image);

            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }  
        }catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        echo json_encode($response);
        break;

    case 'DELETE':
        $sql = "DELETE FROM restaurant WHERE restaurant_id = :id";
        $sql2 = "DELETE FROM menu WHERE menu_id = :m_id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt2 = $conn->prepare($sql2);
        $stmt->bindParam(':id', $path[4]);
        $stmt2->bindParam(':m_id', $path[5]);
        if($stmt->execute() && $stmt2->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
?>