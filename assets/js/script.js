let contadorVerificacion = 3;
const sectionPadre = document.querySelector(`#padre`);
let cuenta_iniciada = "";
loginDom();

let cuentas = {
  jaime: {
    cuenta: "3246720301",
    saldo: 1000,
    contraseña: "12345",
  },
  andres: {
    cuenta: "3113567941",
    saldo: 1000,
    contraseña: "12345",
  },
  stiven: {
    cuenta: "3045580999",
    saldo: 1000,
    contraseña: "12345",
  },
  kevin: {
    cuenta: "3185471976",
    saldo: 1000,
    contraseña: "12345",
  },
  valentina: {
    cuenta: "3016365181",
    saldo: 1000,
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
    cuenta_iniciada = usuario.value;
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
      bloquearInputs(usuario, contraseña);
    }
  }
}
function bloquearInputs(usuario, contraseña) {
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
  let valorConsignar = parseInt(
    document.querySelector(`#valorConsignar`).value
  );
  let numeroCuenta = document.querySelector(`#cuentaDestino`).value;

  let cuentaDestino = false;
  let mensaje = "";
  for (let cuenta in cuentas) {
    if (cuentas[cuenta].cuenta === numeroCuenta) {
      cuentaDestino = cuenta;
      break;
    }
  }

  if (cuentaDestino) {
    cuentas[cuentaDestino].saldo += valorConsignar;
    mensaje = "Se ha consignado " + valorConsignar;
  } else {
    mensaje = "El numero de cuenta no existe";
  }
  document.getElementById("mensaje").innerHTML = mensaje;
}

function retirarDinero() {
  let valorRetirar = document.querySelector(`#valorRetirar`).value;
  let mensaje = "";
  if (valorRetirar < cuentas[cuenta_iniciada].saldo) {
    cuentas[cuenta_iniciada].saldo -= valorRetirar;
    mensaje = "Se ha retirado " + valorRetirar;
  } else {
    mensaje = "No tiene saldo suficiente";
  }
  document.getElementById("mensaje").innerHTML = mensaje;
}

function transferirDinero() {
  let numeroCuenta = document.querySelector(`#cuentaDestino`).value;
  let cantidadTransferir = parseInt(
    document.querySelector(`#valorTransferir`).value
  );
  let cuentaDestino = false;
  for (let cuenta in cuentas) {
    if (cuentas[cuenta].cuenta === numeroCuenta) {
      cuentaDestino = cuenta;
      break;
    }
  }
  mensaje = "";
  if (cuentaDestino) {
    console.log(cantidadTransferir, cuentas[cuenta_iniciada].saldo);
    if (cantidadTransferir < cuentas[cuenta_iniciada].saldo) {
      cuentas[cuentaDestino].saldo += cantidadTransferir;
      cuentas[cuenta_iniciada].saldo -= cantidadTransferir;
      mensaje = "Se ha transferido " + cantidadTransferir;
    } else {
      mensaje = "No tienen saldo suficiente";
    }
  } else {
    mensaje = "La cuenta no exite";
  }
  document.getElementById("mensaje").innerHTML = mensaje;
  console.log(cuentas);
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
  <form class="formulario" style="background-color: rgb(62, 58, 255)">
      <label class="titulo">CONSULTAR</label>   
      <label class="sugerencia">Saldo</label>
      <label id="saldo"></label>
  </form>
</section>
</section>
    </section>
  `;
  sectionPadre.innerHTML = template;
  document.getElementById("saldo").innerHTML = cuentas[cuenta_iniciada].saldo;
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
  <img src="./assets/img/monsters/rosado.png" alt="monster" class="monster">
  <form class="formulario" style="background-color: pink">
      <label class="titulo">CONSIGNAR</label>
      <label class="sugerencia">Valor a consignar</label>
      <input type="number" id="valorConsignar" class="inputDiseño">      
      <label class="sugerencia">Cuenta destino</label>
      <input type="number" id="cuentaDestino" class="inputDiseño">
      <button onclick="consignarDinero()" type="button" class="botonConsignar botonAcciones">Consignar</button>
      <p id="mensaje"></p>
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
  <img src="./assets/img/monsters/verde.png" alt="monster" class="monster">
  <form class="formulario" style="background-color: lightgreen">
      <label class="titulo">TRANSFERIR</label>
      <label class="sugerencia">Valor a transferir</label>
      <input type="number" id="valorTransferir" class="inputDiseño">      
      <label class="sugerencia">Cuenta destino</label>
      <input type="number" id="cuentaDestino" class="inputDiseño">
      <button class="botonTransferir botonAcciones" onclick="transferirDinero()" type="button">Transferir</button>
      <p id="mensaje"></p>
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
      <input type="number" id="valorRetirar" class="inputDiseño">
      <button class="botonRetirar botonAcciones" onclick="retirarDinero()" type="button">Retirar</button>
      <p id="mensaje"></p>
  </form>
</section>
</section>
    </section>
  `;
  sectionPadre.innerHTML = template;
}
