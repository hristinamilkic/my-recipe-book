package config

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDatabase() {
    var err error
    DB, err = sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/recipe-book")
    if err != nil {
        log.Fatal("Failed to connect to database: ", err)
    }

   
    if err = DB.Ping(); err != nil {
        log.Fatal("Failed to ping database: ", err)
    }

    log.Println("Successfully connected to the database!")
}
