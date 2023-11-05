<?php
     require __DIR__.'/classes/Database.php';
     include_once("core.php");
     
     $db_connection = new Database();
     $conn = $db_connection->dbConnection();
     $method = $_SERVER['REQUEST_METHOD'];
     switch($method) {
        case 'POST':        
        
            try{
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "INSERT INTO `order` (order_id,total_amount,user_id,payment_mode,order_placed_on) values(null,:total_amount,:user_id,:pmode,:order_placed_on)";
            $stmt = $conn->prepare($sql);
            $date = date('Y-m-d');
            $stmt->bindParam(':order_placed_on', $date);
            $stmt->bindParam(':total_amount', $path[5]);
            $stmt->bindParam(':user_id', $path[4]);
            $stmt->bindParam(':pmode', $path[6]);
        
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

            case "GET":
                try{  
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $query = "SELECT * from `order` where `user_id`=:user_id";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':user_id', $path[4]);
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
            
                case "DELETE": 
                    $sql = "DELETE FROM cart WHERE  user_id = :user_id";
                    $path = explode('/', $_SERVER['REQUEST_URI']);
            
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':user_id', $path[4]);
                    if($stmt->execute()) {
                        $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                    }
                    echo json_encode($response);
                    break;
        }       
?>