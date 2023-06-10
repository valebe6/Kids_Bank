// let movimientos = [];

// // let historial = document.querySelector("#historial");
// // let movimiento = "";
// // movimientos.forEach((data) => {
// //   movimiento += `<tr>
// //   <td>${data.tipo}</td>
// //   <td>${data.cuenta}</td>
// //   <td>${data.saldo}</td>
// //   </tr>
// //   `;
// // });
// // historial.innerHTML = movimiento;

// // LOGIN
// let contadorVerificacion = 3;
// let cuentas = {
//   jaime: {
//     cuenta: "3246720301",
//     saldo: 0,
//     contraseña: "12345",
//   },
//   andres: {
//     cuenta: "3113567941",
//     saldo: 0,
//     contraseña: "12345",
//   },
//   stiven: {
//     cuenta: "3045580999",
//     saldo: 0,
//     contraseña: "12345",
//   },
//   kevin: {
//     cuenta: "3185471976",
//     saldo: 100000,
//     contraseña: "12345",
//   },
//   valentina: {
//     cuenta: "3016365181",
//     saldo: 0,
//     contraseña: "12345",
//   },
// };
// let usuario = document.querySelector("#user");
// let contraseña = document.querySelector("#password");

// function iniciarSesion() {
//   if (cuentas[usuario]) {
//     if (cuentas[usuario].contraseña === contraseña) {
//       location.href = "../";
//     } else {
//       contadorVerificacion--;
//       if (contadorVerificacion != 0) {
//         let error = document.querySelector("#error");
//         error.textContent = `Error iniciando sesion, le quedan ${contadorVerificacion} intentos`;
//         limpiarInputs();
//       }
//       if (contadorVerificacion == 0) {
//         let error = document.querySelector("#error");
//         error.textContent = `Intentó 3 inicios de sesión, su cuenta ha sido bloqueada, acerquese a una sucursal para desbloquearla`;
//         usuario.disabled == true;
//         contraseña.disabled == true;
//       }
//     }
//   } else {
//     console.log("jajaja");
//     // registrarNuevoUser(usuario.value, contraseña.value);
//   }
// }

// // function registrarNuevoUser(usuario, contraseña) {
// //   let saldo = 0;
// //   let cuenta = JSON.stringify(
// //     Math.floor(Math.random() * 9999999999) + 1000000000
// //   );
// //   let cuentaVerificada = false;
// //   while (!cuentaVerificada) {
// //     for (let data in cuentas) {
// //       if (cuentas[data].cuenta == cuenta) {
// //       }
// //     }

// //     console.log(cuenta);
// //     cuenta = JSON.stringify(
// //       Math.floor(Math.random() * 9999999999) + 1000000000
// //     );
// //   }
// //   let nuevoUser = {
// //     cuenta,
// //     saldo,
// //     contraseña,
// //   };
// //   cuentas[usuario] = nuevoUser;
// //   console.log(cuentas);
// // }

// function limpiarInputs() {
//   user.textContent = "";
//   password.textContent = "";
// }
// function cerrarSesion() {
//   alert("Sesion Cerrada");
//   return iniciarSesion();
// }


let monstruo = document.querySelector("#monstruo_login");
let user = document.querySelector("#user");
let password = document.querySelector("#password");
let anchoMitad = window.innerWidth / 2;
let altoMitad = window.innerHeight / 2;
const body = document.querySelector("body");
let seguirPuntero = true;

body.addEventListener("mousemove", (m) => {
  if (seguirPuntero) {
    if (m.clientX < anchoMitad && m.clientY < altoMitad) {
      monstruo.src = "../img/login/monstruo_login1.png";
    } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
      monstruo.src = "../img/login/monstruo_login2.png";
    } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
      monstruo.src = "../img/login/monstruo_login3.png";
    } else {
      monstruo.src = "../img/login/monstruo_login4.png";
    }
  }
});

user.addEventListener("keyup", () => {
  let usuario = user.value.length;
  if (usuario >= 0 && usuario <= 8) {
    monstruo.src = "assets/img/login/monstruo_login2.png";
  } else if (usuario >= 9 && usuario <= 15) {
    monstruo.src = "assets/img/login/monstruo_login5.png";
  } else {
    monstruo.src = "assets/img/login/monstruo_login4.png";
  }
});

user.addEventListener("focus", () => {
  seguirPuntero = false;
});

user.addEventListener("blur", () => {
  seguirPuntero = true;
});

password.addEventListener("focus", () => {
  seguirPuntero = false;
  monstruo.src = "assets/img/login/monstruo_password.png";
});

password.addEventListener("blur", () => {
  seguirPuntero = true;
});

// function limpiarPantalla() {
//   numeroCuenta.value = "";
//   cantidadTransferir.value = "";
// }

// // CONSIGNAR DINERO
// function consignarDinero() {
//   let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
//   let cuentaUsando = "3185471976"; //docuemnt.querySelector(`#user`);
//   let valorConsignar = document.querySelector(`#valorConsignar`).value;
//   for (let key in cuentas) {
//     if (cuentas[key].cuenta === cuentaUsando) {
//       cuentas[key].saldo += valorConsignar;
//       cuentaInvalida.textContent = `Consignación Exitosa\nSualdo actual\n${cuentas[key].saldo}`;
//       limpiarPantalla();
//     } else {
//       cuentaInvalida.textContent = `Cuenta Invalida`;
//       limpiarPantalla();
//     }
//   }
// }

// // CONSULTAR SALDO
// function consultarSaldo() {
//   let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
//   let cuentaUsando = docuemnt.querySelector("#cuenta").value;
//   for (let key in cuentas) {
//     if (cuentas[key].cuenta === cuentaUsando) {
//       cuentaInvalida.textContent = `Consignación Exitosa\nSualdo actual\n${cuentas[key].saldo}`;
//       //inclir movimientos
//     }
//   }
// }

// // RETIRAR SALDO
// function retirarDinero() {
//   let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
//   let cuentaUsando = docuemnt.querySelector(`#user`).value;
//   let valorRetirar = document.querySelector(`#valorRetirar`).value;
//   for (let key in cuentas) {
//     if (cuentas[key].cuenta === cuentaUsando) {
//       if (valorRetirar <= cuentas[key].saldo) {
//         cuentas[key].saldo -= valorRetirar;
//         cuentaInvalida.textContent = `Retiro Exitoso\nSualdo actual\n${cuentas[key].saldo}`;
//         limpiarPantalla();
//         let movimiento_retirar = {
//           tipo: `Transferencia`,
//           cuenta: cuentas[key].cuenta,
//           saldo: valorRetirar,
//         };
//         movimientos.push(movimiento_retirar);
//       } else {
//         cuentaInvalida.textContent = `No tiene saldo suficiente`;
//         limpiarPantalla();
//       }
//     } else {
//       cuentaInvalida.textContent = `Cuenta Invalida`;
//       limpiarPantalla();
//     }
//   }
// }

// // TRANSFERIR DINERO
// function transferirDinero() {
//   let numeroCuenta = document.querySelector(`#numeroCuenta`).value;
//   let cantidadTransferir = parseFloat(
//     document.querySelector(`#dineroTranferir`).value
//   );
//   let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
//   let cuentaUsando = "3185471976"; //docuemnt.querySelector(`#user`);
//   for (let key in cuentas) {
//     if (cuentas[key].cuenta === numeroCuenta) {
//       for (let kay in cuentas) {
//         if (cuentas[kay].cuenta === cuentaUsando) {
//           if (cuentas[kay].saldo > cantidadTransferir) {
//             cuentas[key].saldo += cantidadTransferir;
//             console.log(cuentas[key].saldo);
//             cuentaInvalida.textContent = `Transferencia Exitosa`;
//             cuentas[kay].saldo -= cantidadTransferir;
//             console.log(cuentas[kay].saldo);
//             let movimiento_transferir = {
//               tipo: `Transferencia`,
//               cuenta: cuentas[key].cuenta,
//               saldo: cantidadTransferir,
//             };
//             movimientos.push(movimiento_transferir);
//           } else {
//             cuentaInvalida.textContent = `No tiene saldo suficiente`;
//             limpiarPantalla();
//           }
//         }
//       }

//       return cuentas;
//     } else {
//       cuentaInvalida.textContent = `Cuenta Invalida`;
//       limpiarPantalla();
//     }
//     limpiarPantalla();
//   }
//   return false;
// }

// console.table(movimientos);
// // // MOVIMIENTOS

// // // CERRAR SESION


// let comprobantes=[{
//   titulo:'TRANSFERENCIA EXITOSA',
//   tipo: 'transferencia',
//   cuenta:12312312,
//   saldo:5000
// }]
// let comprobante = document.querySelector("#comprobante");
// let movimiento = "";
// comprobantes.forEach((data) => {
//   movimiento += `
//   <th>${data.titulo}</th>
//   <th>Tipo de transaccion</th>
//   <tr>${data.tipo}</tr>
//   <th>Cuenta destino</th>
//   <tr>${data.cuenta}</tr>
//   <th>Cantidad</th>
//   <tr>${data.saldo}</tr>
//   `;
// });
// comprobante.innerHTML = movimiento;



