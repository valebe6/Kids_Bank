// LOGIN
let contadorVerificacion = 3;
let cuentas = {
  jaime: {
    cuenta: "3246720301",
    saldo: 0,
    contraseña: "12345",
  },
  andres: {
    cuenta: "3113567941",
    saldo: 0,
    contraseña: "12345",
  },
  stiven: {
    cuenta: "3045580999",
    saldo: 0,
    contraseña: "12345",
  },
  kevin: {
    cuenta: "3185471976",
    saldo: 100000,
    contraseña: "12345",
  },
  valentina: {
    cuenta: "3016365181",
    saldo: 0,
    contraseña: "12345",
  },
};
let usuario = document.querySelector("#user");
let contraseña = document.querySelector("#password");

function iniciarSesion() {
  if (cuentas[usuario]) {
    if (cuentas[usuario].contraseña === contraseña) {
      location.href = "../";
    } else {
      contadorVerificacion--;
      if (contadorVerificacion != 0) {
        let error = document.querySelector("#error");
        error.textContent = `Error iniciando sesion, le quedan ${contadorVerificacion} intentos`;
        limpiarInputs();
      }
      if (contadorVerificacion == 0) {
        let error = document.querySelector("#error");
        error.textContent = `Intentó 3 inicios de sesión, su cuenta ha sido bloqueada, acerquese a una sucursal para desbloquearla`;
        usuario.disabled == true;
        contraseña.disabled == true;
      }
    }
  } else {
    console.log("jajaja");

  }
}



function limpiarInputs() {
  user.textContent = "";
  password.textContent = "";
}
function cerrarSesion() {
  return iniciarSesion();
}

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
    monstruo.src = ".../img/login/monstruo_login2.png";
  } else if (usuario >= 9 && usuario <= 15) {
    monstruo.src = ".../img/login/monstruo_login5.png";
  } else {
    monstruo.src = ".../img/login/monstruo_login4.png";
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
  monstruo.src = ".../img/login/monstruo_password.png";
});

password.addEventListener("blur", () => {
  seguirPuntero = true;
});

function limpiarPantalla() {
  numeroCuenta.value = "";
  cantidadTransferir.value = "";
}

