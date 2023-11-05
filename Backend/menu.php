<?php
require __DIR__.'/classes/Database.php';
include_once("core.php");

$db_connection = new Database();
$conn = $db_connection->dbConnection();
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
   case 'GET':  
            try{
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[5]) && is_numeric($path[5])) {
                $query = "SELECT * from `menu` where `f_id`=:f_id";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':f_id', $path[5]);
                $stmt->execute();
                $r = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $result = $stmt->fetchAll();
                $json_array = array();
                foreach ($result as $row) 
                {
                    $json_array=$row;
                }
            }
            else{
                $query = "SELECT * from `menu` where `menu_id`=:menu_id";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':menu_id', $path[4]);
                $stmt->execute();
                $r = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $result = $stmt->fetchAll();
                $json_array = array();
                foreach ($result as $row) 
                {
                    $json_array[]=$row;
                }
            }
          
            }  catch(PDOException $e) {
                echo "Error: " . $e->getMessage();
            }
            echo json_encode($json_array);
            break;

    case 'POST':        
                try{
                $m = json_decode(file_get_contents('php://input'));
                $sql = "INSERT INTO `menu`(f_id,food_item,price,menu_id) values(null,:food_item,:price,:menu)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':food_item', $m->food_item);
                $stmt->bindParam(':price', $m->price);
                $stmt->bindParam(':menu', $m->menu);
    
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
                        $menu = json_decode(file_get_contents('php://input'));
                        $path = explode('/', $_SERVER['REQUEST_URI']);
                        $sql = "UPDATE `menu` SET food_item= :food_item, price= :price WHERE f_id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $path[4]);
                        $stmt->bindParam(':food_item', $menu->food_item);
                        $stmt->bindParam(':price', $menu->price);
    
            
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
                        $path = explode('/', $_SERVER['REQUEST_URI']);
                        $sql = "DELETE FROM menu WHERE f_id = :id";
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
            
?>