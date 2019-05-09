import SQLite from 'react-native-sqlite-storage'

const database_name = "cave.db";
const database_version = "1.0";
const database_displayname = "SQLite Database for Cave";
const database_size = 200000;
let db;

createTable = () => {
    db.transaction(
        function(tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Wines( ' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'country VARCHAR(32),' +
                'region VARCHAR(32),' +
                'appelation VARCHAR(32),' +
                'vintage INTEGER,' +
                'cru VARCHAR(32),' +
                'producer VARCHAR(32),' +
                'type VARCHAR(32),' +
                'cuvee VARCHAR(32),' +
                'size VARCHAR(32),' +
                'quantity INTEGER,' +
                'comments VARCHAR,' +
                'photo VARCHAR);',
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

openCB = () => {
    console.log("DB opened")

    this.createTable()
}

successCB = () => {
    console.log("SQL Executed...")
}

errorCB = (err) => {
    console.error("DB error: ", err)
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

    this.createTable()
}

export function addWineToDB(
    country,
    region,
    appelation,
    vintage,
    cru,
    producer,
    type,
    cuvee,
    size,
    quantity,
    comments,
    photo
) {
    db.transaction(
        function(tx) {
            tx.executeSql(
                'INSERT INTO Wines(' +
                'country, region, appelation, vintage, cru, producer, '+
                'type, cuvee, size, quantity, comments, photo) '+
                'VALUES (?,?,?,?,?,?,?,?,?,?,?, ?);',
                [country, region, appelation, vintage, cru, producer,
                type, cuvee, size, quantity, comments, photo],
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

export function select(cb) {
    db.transaction(
        function(tx) {
            tx.executeSql(
                'SELECT * FROM Wines',
                [],
                function(tx, results) {
                    var len = results.rows.length
                    var res = []
                    console.log("There are ", len, "rows")
                    for (let i = 0; i < len; i++) {
                        res.push(results.rows.item(i))
                    }
                    if (cb) {
                        cb(res)
                    }
                    else {
                        console.log(res)
                    }
                },
                this.errorCB
            )
        },
        this.errorCB,
        () => {
            console.log('Select Done')
        }
    )
}
