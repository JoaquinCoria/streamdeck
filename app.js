const { exec } = require('child_process');
const { SerialPort } = require('serialport');
// const { SerialPort } = require('@serialport/stream');
const bindings  = require('@serialport/bindings-cpp');
SerialPort.bindings = bindings;

const fs = require('fs');
const { Parser } = require('json2csv');
const express = require('express')
const app = express()
app.use(express.static('views'));
app.use(express.static('img'));

const port = 3000

app.set('view engine', 'pug')
app.get('/', (req, res) => {
  res.render('index', { title: 'Streamdeck', message: 'Streamdeck' })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/resultado', (req, res) => {
  
  resultado = req.body;
  // console.log(resultado);
  function archivoExiste(filePath) {
    if (fs.existsSync(filePath)) {
      return true;
    } else {
      return false;
    }
  }
  const archivoCSV = "./streamdeck.csv";
  if(!archivoExiste(archivoCSV)){
    const datos = [
      ['boton', 'direccion'],
      [resultado['boton'], resultado['archivo']],
    ];
    const csvContentenido = 'boton,direccion\n'+resultado['boton']+","+resultado['archivo']+"\n";

    fs.writeFile('streamdeck.csv', csvContentenido, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('CSV file "output.csv" has been saved.');
      }
    });
  }else{
    const nuevosDatos = resultado['boton']+","+resultado['archivo']+'\n';
    fs.appendFile(archivoCSV, nuevosDatos, (err) => {
        if (err) {
            console.error('Error appending data to CSV:', err);
            return;
        }
        console.log('Data successfully appended to CSV.');
    });
  }

  const funcionesBotones = fs.readFile('streamdeck.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // Process the CSV data here
    const filas = data.split('\n');
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
  });
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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
    const keypressed = data.toString().trim(); // Convert buffer to string and remove whitespace
    // console.log('Key Pressed:', keypressed);
    switch(keypressed){
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
      case resultado['boton']:
        console.log(resultado['archivo']);
        exec('start ' + resultado['archivo'], (error, stdout, stderr) => {
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
    }
});

puerto.on('error', (err) => {
    console.error('Serial Port Error:', err.message);
});

// app.listen(port, () => {
//   console.log(`Escuchando en el puerto ${port}`)
// })
