const { Client } = require('pg');

// Datos de conexión con Supabase
const client = new Client({
    host: 'aws-0-us-east-1.pooler.supabase.com', 
    port: 5432,                                  
    user: 'postgres.jqhnvjffprivqlfatjej',        
    password: '1234SupabaseBD',                   
    database: 'postgres',                        
    ssl: {
        rejectUnauthorized: false                
    }
});

client.connect((error) => {
    if (error) {
        console.log('Error conectando con la base de datos:', error);
        return;
    } else {
        console.log('Conectado con la base de datos de Supabase');
    }
});

module.exports = client;



/*const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '1234',
    databse: 'ProyectoExpress'

});

connection.connect((error) => {

    if (error) {
        console.log('Error conectado con la base de datos', error)
        return
    } else {
        console.log('Conectado a la base de datos');
    }

});

module.exports = connection;*/