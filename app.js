const { exec } = require('child_process');
const { SerialPort, SlipDecoder } = require('serialport');
// const { SerialPort } = require('@serialport/stream');
const bindings  = require('@serialport/bindings-cpp');
SerialPort.bindings = bindings;

const fs = require('fs');
const express = require('express')
const session = require("express-session");
const bcrypt = require("bcryptjs");
const pool = require("./db");
const app = express()
app.use(express.static('views'));
app.use(express.static('img'));

const port = 3000;
// if (session.user) {
  
app.set('view engine', 'pug')

app.get('/login', (req, res) => {
  res.render('login', { title: 'Ingresar', message: 'Ingresar Cuenta', link: './register', msgBoton: 'Crear cuenta', linkForm: './login'})
})

app.get('/register', (req, res) => {
  res.render('login', { title: 'Registrar', message: 'Crear Cuenta', link: './login', msgBoton: 'Iniciar sesion', linkForm: './register'})
})



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// FUNCIONES
function csvAarray(csv){
  const filas = csv.split(';');
  const encabezados = filas[0].split(',');
  const arrayDatos = [];

  for (let i = 1; i < filas.length; i++) {
    const valores = filas[i].split(',');
    const entry = {};
    for (let j = 0; j < encabezados.length; j++) {
      entry[encabezados[j]] = valores[j];
    }
    arrayDatos.push(entry);
  }
  return arrayDatos;
}
function arrayAcsv(array){
  csv = "boton,direccion;";
  array.forEach(itemsArray => {
    if(itemsArray['boton'] != ''){
      csv += itemsArray['boton'] + "," + itemsArray['direccion'] + ";";
    }
  });
  return csv;
}
function archivoExiste(direccion) {
    if (fs.existsSync(direccion)) {
      return true;
    } else {
      return false;
    }
  }


  // SESSION
app.use(
  session({
    secret: "clave-secreta-super-segura",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 30 }
  })
);

function authRequired(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: "No autorizado" });
  next();
}

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  await pool.query("INSERT INTO usuario(nombre, password) VALUES (?,?) ", [
    username, password
  ]);
  res.json({ message: "Register exitoso" });
});
// PÁGINAS
app.get('/', (req, res) => {
  if(archivoExiste("./streamdeck.csv")){
    const contenidoCsv = fs.readFileSync("./streamdeck.csv", 'utf-8');
    arrayFunciones = csvAarray(contenidoCsv);
  }else{
    arrayFunciones = false;
  }
  res.render('index', { title: 'Streamdeck', message: 'Streamdeck', funcionesBotones: arrayFunciones})
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM usuario WHERE nombre = ?", [
    username
  ]);

  if (rows.length === 0)
    return res.status(400).json({ error: "Usuario no encontrado" });

  const user = rows[0];
  if(password == user.password)ok = true;
  if (!ok) return res.status(400).json({ error: "Credenciales inválidas" });

  req.session.user = { id: user.id, username: user.username };

  res.redirect('/');
});

app.get("/perfil", authRequired, (req, res) => {
  res.json({ user: req.session.user });
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Error cerrando sesión" });
    res.json({ message: "Sesión finalizada" });
  });
});

app.post('/resultado', (req, res) => {
  resultado = req.body;
  const archivoCSV = "./streamdeck.csv";
  if(!archivoExiste(archivoCSV)){
    const datos = [
      ['boton', 'direccion'],
      [resultado['boton'], resultado['archivo']],
    ];
    const csvContentenido = 'boton,direccion;'+resultado['boton']+","+resultado['archivo']+";";

    fs.writeFile('streamdeck.csv', csvContentenido, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('CSV file "output.csv" has been saved.');
      }
    });
  }else{
    let nuevosDatos = resultado['boton']+","+resultado['archivo']+';';
    const contenidoCsv = fs.readFileSync(archivoCSV, 'utf-8');
    arrayDatos = csvAarray(contenidoCsv);
    let botonRepetido = false;
    arrayDatos.forEach(itemArray => {
      if(itemArray['boton'] == resultado['boton']){
        itemArray['direccion'] = resultado['archivo'];
        botonRepetido = true;
      }
    });
    if(botonRepetido){
      nuevosDatos = arrayAcsv(arrayDatos);
      fs.writeFile('streamdeck.csv', nuevosDatos, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('CSV file "output.csv" has been saved.');
        }
      });
    }else{
      fs.appendFile(archivoCSV, nuevosDatos, (err) => {
          if (err) {
              console.error('Error appending data to CSV:', err);
              return;
          }
          console.log('Data successfully appended to CSV.');
      });
    }
  }
  // const funcionesBotones = csvAarray(fs.readFileSync(archivoCSV, 'utf-8'));
  res.redirect('/');
})


const puerto = new SerialPort({
  path: 'COM8',
  baudRate: 115200
});

puerto.on('open', () => {
    console.log('Serial Port Open');
});
let resultado = null;
puerto.on('data', (data) => {
  const contenidoCsv = fs.readFileSync(archivoCSV, 'utf-8');
  const botonesFunciones = csvAarray(contenidoCsv);
  const keypressed = data.toString().trim(); // Convert buffer to string and remove whitespace
  // console.log('Key Pressed:', keypressed);
  botonesFunciones.forEach(itemArray => {
    if(keypressed = itemArray['boton']){
      exec('start' + itemArray['direccion'], (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Salida de error: ${stderr}`);
          return;
        }
        // console.log(`Salida del comando: ${stdout}`);
        });
    }
  });
  // switch(keypressed){
    // case "6":
    //   exec('start https://www.youtube.com', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case resultado['boton']:
    //   console.log(resultado['archivo']);
    //   exec('start ' + resultado['archivo'], (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "A":
    //   exec('start code', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "9":
    //   exec('start https://www.instagram.com', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "5":
    //   exec('github', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       // console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "B":
    //   exec('start ms-settings:home', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "0":
    //     exec('start C:/xampp/xampp-control.exe', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "8":
    //     exec('taskmgr', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    // case "C":
    //     exec('calc', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    // case "D":
    //     exec(resultado, (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       console.error(`Error al ejecutar el comando: ${error.message}`);
    //       return;
    //     }
    //     if (stderr) {
    //       console.error(`Salida de error: ${stderr}`);
    //       return;
    //     }
    //     // console.log(`Salida del comando: ${stdout}`);
    //     });
    //   break;
//     }
});

puerto.on('error', (err) => {
    console.error('Error en el puerto serial:', err.message);
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})