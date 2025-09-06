const express = require('express')
const { exec } = require('child_process');
const keypress = require('keypress');
const app = express()
const port = 3000
const { SerialPort } = require('serialport');

const puerto = new SerialPort({ 
  path: 'COM4', // Replace with your serial port path (e.g., COM3 on Windows)
  baudRate: 115200
});

puerto.on('open', () => {
    console.log('Serial Port Open');
});

puerto.on('data', (data) => {
    const keypressed = data.toString().trim(); // Convert buffer to string and remove whitespace
    // console.log('Key Pressed:', keypressed);
    switch(keypressed){
      case "1":
        exec('start https://www.youtube.com', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Salida de error: ${stderr}`);
            return;
          }
          console.log(`Salida del comando: ${stdout}`);
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
          console.log(`Salida del comando: ${stdout}`);
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
          console.log(`Salida del comando: ${stdout}`);
          });
        break;
      case "4":
        exec('start https://www.instagram.com', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Salida de error: ${stderr}`);
            return;
          }
          console.log(`Salida del comando: ${stdout}`);
          });
        break;
      case "5":
        exec('github', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Salida de error: ${stderr}`);
            return;
          }
          console.log(`Salida del comando: ${stdout}`);
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
          console.log(`Salida del comando: ${stdout}`);
          });
        break;
      case "7":
          exec('start C:/xampp/xampp-control.exe', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Salida de error: ${stderr}`);
            return;
          }
          console.log(`Salida del comando: ${stdout}`);
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
          console.log(`Salida del comando: ${stdout}`);
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
          console.log(`Salida del comando: ${stdout}`);
          });
        break;
      case "*":
          exec('calc', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el comando: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Salida de error: ${stderr}`);
            return;
          }
          console.log(`Salida del comando: ${stdout}`);
          });
        break;
    }
});

puerto.on('error', (err) => {
    console.error('Serial Port Error:', err.message);
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})

