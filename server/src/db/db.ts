import mysql from 'mysql';

export class MySql {
    private connection!: mysql.Connection;
    
    connect(): void {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "portal"
        });
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL database: ' + err.stack);
                return;
            }
            //console.log('Connected to MySQL database with connection ID ' + this.connection.threadId);
        })        
    }
    query(sql: string, values: any[] = [], callback: mysql.queryCallback): void {
        this.connection.query(sql, values, callback);
    }

    close(): void {
        this.connection.end();
    }
}