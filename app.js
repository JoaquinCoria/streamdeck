const { exec } = require('child_process');
const { SerialPort } = require('serialport');
// const { SerialPort } = require('@serialport/stream');
const bindings  = require('@serialport/bindings-cpp');
SerialPort.bindings = bindings;

const express = require('express')
const app = express()
app.use(express.static('css/index.css'));
const port = 3000

app.set('view engine', 'pug')
app.get('/', (req, res) => {
  console.log(resultado);
  res.render('index', { title: 'Streamdeck', message: 'Streamdeck' })
})

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.post('/resultado', (req, res) => {
  resultado = req.body;
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const puerto = new SerialPort({
  path: 'COM4', // Replace with your serial port path (e.g., COM3 on Windows)
  baudRate: 115200
});

puerto.on('open', () => {
    console.log('Serial Port Open');
});
let resultado = null;
console.log(resultado);
puerto.on('data', (data) => {
    const keypressed = data.toString().trim(); // Convert buffer to string and remove whitespace
    // console.log('Key Pressed:', keypressed);
    switch(keypressed){
      case "6":
        exec('start https://www.youtube.com', (error, stdout, stderr) => {
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
        break;
      case "2":
        exec('start explorer', (error, stdout, stderr) => {
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
        break;
      case "A":
        exec('start code', (error, stdout, stderr) => {
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
        break;
      case "9":
        exec('start https://www.instagram.com', (error, stdout, stderr) => {
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
        break;
      case "5":
        exec('github', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
          }
          if (stderr) {
            // console.error(`Salida de error: ${stderr}`);
            return;
          }
          // console.log(`Salida del comando: ${stdout}`);
          });
        break;
      case "B":
        exec('start ms-settings:home', (error, stdout, stderr) => {
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
        break;
      case "0":
          exec('start C:/xampp/xampp-control.exe', (error, stdout, stderr) => {
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
        break;
      case "8":
          exec('taskmgr', (error, stdout, stderr) => {
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
        break;
      case "C":
          exec('calc', (error, stdout, stderr) => {
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
        break;
      case "D":
          exec(resultado, (error, stdout, stderr) => {
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
        break;
    }
});

puerto.on('error', (err) => {
    console.error('Serial Port Error:', err.message);
});

// app.listen(port, () => {
//   console.log(`Escuchando en el puerto ${port}`)
// })
