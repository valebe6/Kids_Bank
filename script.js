let contadorVerificacion = 3;
const sectionPadre = document.querySelector(`#padre`);

loginDom();

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

function loginDom() {
  const template = `
  <section id="login">
        <img
        style="margin-top:15px"
          id="monstruo_login"
          src="./assets/img/login/monstruo_login.png"
          alt="monstruo login"
        />
        <form class="formulario_login">
          <p id="error"></p>
          <label>Usuario - User</label>
          <input type="text" id="user" />
          <label>Contraseña - Password</label>
          <input type="password" id="password" />
          <input
            onclick="iniciarSesion()"
            type="button"
            value="Iniciar sesion - Login"
            id="boton"
          />
        </form>
      </section>
  `;
  sectionPadre.innerHTML = template;

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
        monstruo.src = "assets/img/login/monstruo_login1.png";
      } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
        monstruo.src = "assets/img/login/monstruo_login2.png";
      } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
        monstruo.src = "assets/img/login/monstruo_login3.png";
      } else {
        monstruo.src = "assets/img/login/monstruo_login4.png";
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
}

function iniciarSesion() {
  let usuario = document.querySelector("#user");
  let contraseña = document.querySelector("#password");

  if (
    cuentas[usuario.value] &&
    cuentas[usuario.value].contraseña === contraseña.value
  ) {
    menuDom();
  } else {
    contadorVerificacion--;
    if (contadorVerificacion != 0) {
      let error = document.querySelector("#error");
      error.textContent = `Error iniciando sesion, le quedan ${contadorVerificacion} intentos`;
    }
    if (contadorVerificacion == 0) {
      let error = document.querySelector("#error");
      error.textContent = `Intentó 3 inicios de sesión, su cuenta ha sido bloqueada, acerquese a una sucursal para desbloquearla`;
      bloquearInputs();
    }
  }
}

function bloquearInputs() {
  let boton = document.querySelector("#boton");
  usuario.disabled = true;
  contraseña.disabled = true;
  boton.disabled = true;
}

function consultarSaldo() {
  let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
  let cuentaUsando = "3185471976"; //docuemnt.querySelector(`#user`);
  for (let key in cuentas) {
    if (cuentas[key].cuenta === cuentaUsando) {
      cuentaInvalida.textContent = `Consignación Exitosa\nSualdo actual\n${cuentas[key].saldo}`;
      //inclir movimientos
    }
  }
}

function consignarDinero() {
  let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
  let cuentaUsando = "3185471976"; //docuemnt.querySelector(`#user`);
  let valorConsignar = document.querySelector(`#valorConsignar`).value;
  for (let key in cuentas) {
    if (cuentas[key].cuenta === cuentaUsando) {
      cuentas[key].saldo += valorConsignar;
      cuentaInvalida.textContent = `Consignación Exitosa\nSualdo actual\n${cuentas[key].saldo}`;
      limpiarPantalla();
    } else {
      cuentaInvalida.textContent = `Cuenta Invalida`;
      limpiarPantalla();
    }
  }
}

function retirarDinero() {
  let parrafo = document.querySelector(`#parrafo`);
  let cuentaUsando = "3185471976"; //docuemnt.querySelector(`#user`);
  let valorRetirar = document.querySelector(`#valorRetirar`).value;
  for (let key in cuentas) {
    if (cuentas[key].cuenta === cuentaUsando) {
      if (valorRetirar <= cuentas[key].saldo) {
        cuentas[key].saldo -= valorRetirar;
        parrafo.textContent = `Retiro Exitoso\nSualdo actual\n${cuentas[key].saldo}`;
      } else {
        parrafo.textContent = `No tiene saldo suficiente`;
      }
    } else {
      parrafo.textContent = `Cuenta Invalida`;
    }
  }
}

function transferirDinero() {
  let numeroCuenta = document.querySelector(`#numeroCuenta`).value;
  let cantidadTransferir = parseFloat(
    document.querySelector(`#dineroTranferir`).value
  );
  let cuentaInvalida = document.querySelector(`#cuentaInvalida`);
  let cuentaUsando = "3185471976"; //docuemnt.querySelector(`#user`);

  for (let key in cuentas) {
    if (cuentas[key].cuenta === numeroCuenta) {
      console.log(`cuenta valida`);
      for (let kay in cuentas) {
        if (cuentas[kay].cuenta === cuentaUsando) {
          if (cuentas[kay].saldo > cantidadTransferir) {
            cuentas[key].saldo += cantidadTransferir;
            cuentaInvalida.textContent = `Transferencia Exitosa`;
            cuentas[kay].saldo -= cantidadTransferir;
          } else {
            cuentaInvalida.textContent = `No tiene saldo suficiente`;
            limpiarPantalla();
          }
        }
      }

      return cuentas;
    } else {
      cuentaInvalida.textContent = `Cuenta Invalida`;
      limpiarPantalla();
    }
    limpiarPantalla();
  }

  return false;
}

function menuDom() {
  const template = `
  <section class="section_menu header_menu">
      <img src="./assets/img/logo.png" alt="logo" class="logo" />
      <button onclick="loginDom()" id="cerrar_sesion">Cerrar sesión</button>
    </section>
    <section class="section_menu" id="imagenes">
      <img
        class="img"
        id="azul"
        src="./assets/img/monsters/azul.png"
        alt="monster_consultar"
      />
      <img
        class="img"
        id="amarillo"
        src="./assets/img/monsters/amarillo.png"
        alt="monster_retirar"
      />
      <img
        class="img"
        id="verde"
        src="./assets/img/monsters/verde.png"
        alt="monster_transferir"
      />
      <img
      class="img"
      id="rosado"
      src="./assets/img/monsters/rosado.png"
      alt="monster_consignar"
    />
    </section>
    <section id="menu_principal button" class="section_menu body_menu_principal">
      <button name="azul" onclick="consultarDineroDom()" class="consultar event_button">
        Consultar Saldo
      </button>
      <button name="amarillo" onclick="retirarDineroDom()" class="retirar event_button">
        Retirar dinero
      </button>
      <button name="verde" onclick="transferirDineroDom()" class="transferir event_button">
        Transferir dinero
      </button>      
      <button name="rosado" onclick="consignarDineroDom()" class="consignar event_button">
        Consignar dinero
      </button>
    </section>
  `;
  sectionPadre.innerHTML = template;

  setTimeout(() => {
    images = document.querySelectorAll(".img");
    for (let image of images) {
      image.style.opacity = 0;
    }
  });

  buttons = document.querySelectorAll(".event_button");
  for (let button of buttons) {
    button.addEventListener("mouseover", () => {
      document.querySelector(`#${button.name}`).style.opacity = 1;
    });
    button.addEventListener("mouseout", () => {
      document.querySelector(`#${button.name}`).style.opacity = 0;
    });
  }
}

function consultarDineroDom() {
  const template = `
  <section id="consignar_dinero">
  <section class="header">
  <img src="./assets/img/logo.png" alt="logo" class="logo">
  <button onclick="loginDom()" id="cerrar_sesion" class="botonCerrarSesion botones">
      Cerrar sesión
  </button>
  <button id="volver_menu" onclick="menuDom()" class="botonVolver botones">Volver al menú</button>
</section>
<section class="img_formulario">
  <img src="./assets/img/monsters/azul.png" alt="monster" class="monster">
  <form class="formulario">
      <label class="titulo">CONSULTAR</label>   
      <label class="sugerencia">Saldo</label>
      <label id="saldo"></label>
  </form>
</section>
</section>
    </section>
  `;
  sectionPadre.innerHTML = template;
}

function consignarDineroDom() {
  const template = `
  <section id="consignar_dinero">
  <section class="header">
  <img src="./assets/img/logo.png" alt="logo" class="logo">
  <button onclick="loginDom()" id="cerrar_sesion" class="botonCerrarSesion botones">
      Cerrar sesión
  </button>
  <button id="volver_menu" onclick="menuDom()" class="botonVolver botones">Volver al menú</button>
</section>
<section class="img_formulario">
  <img src="./assets/img/monsters/amarillo.png" alt="monster" class="monster">
  <form class="formulario">
      <label class="titulo">CONSIGNAR</label>
      <label class="sugerencia">Valor a consignar</label>
      <input type="number" id="valorConsignar" class="inputconsignar">      
      <label class="sugerencia">Cuenta destino</label>
      <input type="number" id="cuentaDestino" class="inputconsignar">
      <button onclick="consignarDinero()" class="botonConsignar botones">Consignar</button>
  </form>
</section>
</section>
    </section>
  `;
  sectionPadre.innerHTML = template;
}

function transferirDineroDom() {
  const template = `
  <section id="retirar_dinero">
  <section class="header">
  <img src="./assets/img/logo.png" alt="logo" class="logo">
  <button onclick="loginDom()" id="cerrar_sesion" class="botonCerrarSesion botones">
      Cerrar sesión
  </button>
  <button id="volver_menu" onclick="menuDom()" class="botonVolver botones">Volver al menú</button>
</section>
<section class="img_formulario">
  <img src="./assets/img/monsters/amarillo.png" alt="monster" class="monster">
  <form class="formulario">
      <label class="titulo">TRANSFERIR</label>
      <label class="sugerencia">Valor a transferir</label>
      <input type="number" id="valorTransferir" class="inputTransferir">      
      <label class="sugerencia">Cuenta destino</label>
      <input type="number" id="cuentaDestino" class="inputTransferir">
      <button class="botonTransferir botones">Transferir</button>
  </form>
</section>
</section>
    </section>
  `;
  sectionPadre.innerHTML = template;
}

function retirarDineroDom() {
  const template = `
  <section id="retirar_dinero">
  <section class="header">
  <img src="./assets/img/logo.png" alt="logo" class="logo">
  <button onclick="loginDom()" id="cerrar_sesion" class="botonCerrarSesion botones">
      Cerrar sesión
  </button>
  <button id="volver_menu" onclick="menuDom()" class="botonVolver botones">Volver al menú</button>
</section>
<section class="img_formulario">
  <img src="./assets/img/monsters/amarillo.png" alt="monster" class="monster">
  <form class="formulario">
      <label class="titulo">RETIRAR</label>
      <label class="sugerencia">Valor a retirar</label>
      <input type="number" id="valorRetirar" class="inputRetirar">
      <button class="botonRetirar botones">Retirar</button>
  </form>
</section>
</section>
    </section>
  `;
  sectionPadre.innerHTML = template;
}
