const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');

let useMySQL = false;
let mysqlConnection = null;

// Ensure database files directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read JSON file table
function readTable(tableName) {
    const filePath = path.join(DATA_DIR, `${tableName}.json`);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content || '[]');
    } catch (e) {
        console.error(`Error reading database table ${tableName}:`, e);
        return [];
    }
}

// Helper to write JSON file table
function writeTable(tableName, data) {
    const filePath = path.join(DATA_DIR, `${tableName}.json`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error(`Error writing database table ${tableName}:`, e);
    }
}

// Set up MySQL config from environment variables
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

// TiDB Cloud and secure databases require SSL/TLS
if (process.env.DB_SSL === 'true' || (dbConfig.host && dbConfig.host.includes('tidbcloud.com'))) {
    dbConfig.ssl = {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    };
    if (process.env.DB_CA_PATH && fs.existsSync(process.env.DB_CA_PATH)) {
        try {
            dbConfig.ssl.ca = fs.readFileSync(process.env.DB_CA_PATH);
        } catch (e) {
            console.error(`Error reading CA file from ${process.env.DB_CA_PATH}:`, e.message);
        }
    }
}

function connect(callback) {
    if (dbConfig.host) {
        try {
            console.log(`Attempting to connect to MySQL database at ${dbConfig.host}...`);
            mysqlConnection = mysql2.createConnection(dbConfig);
            
            mysqlConnection.connect((error) => {
                if (error) {
                    console.warn(`MySQL connection failed: ${error.message}`);
                    console.log("Falling back to local JSON database storage...");
                    useMySQL = false;
                    // Call callback with null so application startup is not blocked
                    callback(null);
                } else {
                    console.log("MySQL database is connected successfully.");
                    useMySQL = true;
                    callback(null);
                }
            });

            // Handle connection error events after initial connection
            mysqlConnection.on('error', (err) => {
                console.error("MySQL database error:", err.message);
                if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
                    console.log("Reverting to local JSON database storage due to lost connection");
                    useMySQL = false;
                }
            });
        } catch (e) {
            console.warn(`Failed to initialize MySQL connection: ${e.message}`);
            console.log("Falling back to local JSON database storage...");
            useMySQL = false;
            callback(null);
        }
    } else {
        console.log("No MySQL DB_HOST specified in environment variables.");
        console.log("Using local JSON database storage.");
        useMySQL = false;
        callback(null);
    }
}

function query(sql, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = [];
    }

    if (useMySQL && mysqlConnection) {
        return mysqlConnection.query(sql, params, callback);
    }

    // JSON fallback
    try {
        const sqlTrim = sql.trim();
        const sqlUpper = sqlTrim.toUpperCase();

        if (sqlUpper.startsWith('INSERT INTO')) {
            let tableName = '';
            if (sqlUpper.includes('CUSTOMER')) tableName = 'customer';
            else if (sqlUpper.includes('PLACED')) tableName = 'placed';
            else if (sqlUpper.includes('PAYMENT')) tableName = 'payment';

            if (!tableName) {
                throw new Error("Unsupported table in local JSON INSERT query: " + sql);
            }

            const data = readTable(tableName);
            const record = { id: data.length + 1 };

            if (tableName === 'customer') {
                // INSERT INTO customer(username, email, password) VALUES (?, ?, ?)
                record.username = params[0];
                record.email = params[1];
                record.password = params[2];
            } else if (tableName === 'placed') {
                // INSERT INTO placed(phone, address) VALUES (?, ?)
                record.phone = params[0];
                record.address = params[1];
            } else if (tableName === 'payment') {
                // INSERT INTO payment(full_name, email, payment_method, card_number, expiry_date, cvv, upi_id, bank, cod) VALUES (?,?,?,?,?,?,?,?,?)
                record.full_name = params[0];
                record.email = params[1];
                record.payment_method = params[2];
                record.card_number = params[3];
                record.expiry_date = params[4];
                record.cvv = params[5];
                record.upi_id = params[6];
                record.bank = params[7];
                record.cod = params[8];
            }

            data.push(record);
            writeTable(tableName, data);

            if (callback) {
                callback(null, { insertId: record.id, affectedRows: 1 });
            }
        } 
        else if (sqlUpper.startsWith('SELECT')) {
            let tableName = '';
            if (sqlUpper.includes('FROM CUSTOMER')) tableName = 'customer';
            else if (sqlUpper.includes('FROM PLACED')) tableName = 'placed';
            else if (sqlUpper.includes('FROM PAYMENT')) tableName = 'payment';

            if (!tableName) {
                throw new Error("Unsupported table in local JSON SELECT query: " + sql);
            }

            const data = readTable(tableName);
            let results = data;

            // Simple parser for: WHERE username = ?
            if (sqlUpper.includes('WHERE USERNAME = ?') || sqlUpper.includes('WHERE USERNAME =?')) {
                const searchUsername = params[0];
                results = data.filter(user => user.username && user.username.toLowerCase() === (searchUsername || '').toLowerCase());
            }

            if (callback) {
                callback(null, results);
            }
        }
        else {
            throw new Error("Unsupported query in local JSON database: " + sql);
        }
    } catch (err) {
        console.error("Local database error executing query:", err);
        if (callback) {
            callback(err);
        }
    }
}

module.exports = {
    connect,
    query
};
