import SQLite from 'react-native-sqlite-storage'

const database_name = "cave.db";
const database_version = "1.0";
const database_displayname = "SQLite Database for Cave";
const database_size = 200000;
let db;

openCB = () => {
    console.log("DB opened")

    db.transaction(
        function(tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Wines( ' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'region VARCHAR(32),' +
                'vintage INTEGER);',
                [],
                this.successCB,
                this.errorCB
            )
        },
        this.errorCB,
        () => {
            console.log('Creating Table Done')
        }
    )
}

successCB = () => {
    console.log("SQL Executed...")
}

errorCB = (err) => {
    console.warning("DB error: ", err)
    return false
}

export function openDB() {
    db = SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
        this.openCB,
        this.errorCB
    );
}

export function dropTable() {
    db.transaction(
        function(tx) {
            tx.executeSql('DROP TABLE Wines')
        }
    )
}

export function addWine(region, vintage) {
    db.transaction(
        function(tx) {
            tx.executeSql(
                'INSERT INTO Wines(region, vintage) VALUES (?,?);',
                [region, vintage],
                this.successCB,
                this.errorCB
            )
        },
        this.errorCB,
        () => {
            console.log('Adding Wine Done')
        }
    )
}

querySuccess = (tx, results) => {
    var len = results.rows.length
    console.log("There are ", len, "rows")
    for (let i = 0; i < len; i++) {
        let row = results.rows.item(i)
        console.log(row)
    }
}

selectDB = (tx) => {
    tx.executeSql('SELECT * FROM Wines', [], this.querySuccess, this.errorCB)
}

export function select() {
    db.transaction(
        this.selectDB,
        this.errorCB,
        () => {
            console.log('Select Done')
        }
    )
}
