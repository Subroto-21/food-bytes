<?php
     header('Access-Control-Allow-Origin: *');
     header("Access-Control-Allow-Headers: *");
     require __DIR__.'/classes/Database.php';
     include_once("core.php");
     
     $db_connection = new Database();
     $conn = $db_connection->dbConnection();
     $method = $_SERVER['REQUEST_METHOD'];
     switch($method) {
        case 'POST':
            
            $cart = json_decode(file_get_contents('php://input'));
            
            if(isset($cart->food_item) ||isset( $cart->price) || isset($cart->f_id) || isset($cart->m_id))
            {
            echo json_encode($cart);
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $sql = "INSERT INTO cart(f_id, food_item,price,menu_id,user_id) values(:f_id,:food_item,:price,:menu_id,:user_id) on duplicate key update qty=qty+1";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':food_item', $cart->food_item);
            $stmt->bindParam(':price', $cart->price);
            $stmt->bindParam(':f_id', $cart->f_id);
            $stmt->bindParam(':menu_id', $cart->menu_id);
            $stmt->bindParam(':user_id', $path[4]);
            
            if($stmt->execute()) {
                $data = ['status' => 1, 'message' => "Record successfully created"];
            } else {
                $data = ['status' => 0, 'message' => "Failed to create record."];
            }
            echo json_encode($data);
            break;
            }
            
        case "GET":
            try{  
            $path = explode('/', $_SERVER['REQUEST_URI']);
            $query = "SELECT * from `cart` where `user_id`=:user_id";
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
                $sql = "DELETE FROM cart WHERE  user_id = :user_id and f_id = :f_id";
                $path = explode('/', $_SERVER['REQUEST_URI']);
        
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':user_id', $path[4]);
                $stmt->bindParam(':f_id', $path[5]);
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
                break;
        
}
?>