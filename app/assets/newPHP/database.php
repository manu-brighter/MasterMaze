<?php

class Database{
    public string $host;
    public string $user;
    public string $pass;
    public string $db;
    public $mysqli;
  
    public function __construct($host, $user, $pass, $db) {

        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->db = $db;

      $this->dbConnect();
    }
  
    private function dbConnect(){
      $this->mysqli = new mysqli($this->host, $this->user, $this->pass, $this->db);
      return $this->mysqli;
    }
  
    public function dbNum($sql){
          $result = $this->mysqli->query($sql);
          return $result->num_rows;
    }
}

    private $stmt;

    public function setStmt($stmt){
        $this->stmt = $stmt;
    }

    public function getStmt(){
        return $this->stmt;
    }

$sql = new SQL();
$db = new Database();

$db->dbNum($sql->getStmt());
