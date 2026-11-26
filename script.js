let campoUnidades = document.getElementById("unid");

let estado = document.getElementById("uf");
    estado.addEventListener("change", function(selecaoEstado){
     
       campoUnidades.innerHTML = '<option value="">Selecione sua Unidade</option>';
    
       let listaUnidades = unidades[estado.value];

       if (!listaUnidades) { 
           return ;     
       }

       let chaveUnidades = Object.keys(listaUnidades);

       for (let i = 0; i < chaveUnidades.length; i++) {
             campoUnidades.innerHTML += `<option value="${chaveUnidades[i]}">${listaUnidades[chaveUnidades[i]].nome}</option>`;
            }
    });

let formulario = document.getElementById("formulario");

let telId = document.getElementById("tel");

    telId.addEventListener("input", function(event){ 

        if (event.inputType === "deleteContentBackward") {
            return;
       }

        let numeros = telId.value.replace(/\D/g, "");

        if (numeros.length === 2) {

            let ddd = numeros.slice(0,2)

            telId.value = `(${ddd})`;

        } else if (numeros.length === 3) {

             let ddd = numeros.slice(0,2);
             let nove = numeros.slice(2,3);

             telId.value = `(${ddd}) ${nove}`;

        } else if (numeros[2] === "9" && numeros.length >= 4 && numeros.length <= 6) {

            let ddd = numeros.slice(0,2);
            let nove = numeros.slice(2,3);
            let antesIfem = numeros.slice(3,7);

            telId.value = `(${ddd}) ${nove} ${antesIfem}`;

        } else if (numeros[2] !== "9" && numeros.length >= 4 && numeros.length <= 6) {

            let ddd = numeros.slice(0,2);
            let antesIfem = numeros.slice(2,7);

            telId.value = `(${ddd}) ${antesIfem}`;

            } else if (numeros[2] !== "9" && numeros.length >= 7 && numeros.length <= 10) {

            let ddd = numeros.slice(0,2);
            let antesIfem = numeros.slice(2,6);
            let depoisIfem = numeros.slice(6)
            telId.value = `(${ddd}) ${antesIfem}-${depoisIfem}`;

        } else if (numeros[2] === "9" && numeros.length >= 7 && numeros.length <= 11) {

            let ddd = numeros.slice(0,2);
            let nove = numeros.slice(2,3);
            let antesIfem = numeros.slice(3,7);
            let depoisIfem = numeros.slice(7);

            telId.value = `(${ddd}) ${nove} ${antesIfem}-${depoisIfem}`;

        } else if (numeros[2] !== "9" && numeros.length === 11) {

            alert("Telefone Inválido");

        } else {

            return;
        }
    });

    telId.addEventListener("blur", function() {

        let telefone = telId.value;
        let numeros = telefone.replace(/\D/g, "");

        if (numeros.length === 10 && numeros[2] !== "9") {

            let ddd = numeros.slice(0,2);
            let antesIfem = numeros.slice(2,6);
            let depoisIfem = numeros.slice(6,10);

            telId.value = `(${ddd}) ${antesIfem}-${depoisIfem}`;

        } else if (numeros.length === 11 && numeros[2] === "9") {

            let ddd = numeros.slice(0,2);
            let nove = numeros.slice(2,3);
            let antesIfem = numeros.slice(3,7);
            let depoisIfem = numeros.slice(7,11);

            telId.value = `(${ddd}) ${nove} ${antesIfem}-${depoisIfem}`;

        } else {

             alert("Telefone Inválido!");
             return;
        } 
       });

let botaoBaixar = document.getElementById("baixar");
let imagemPNG;

    formulario.addEventListener("submit", function(event) { 

        event.preventDefault();

        botaoBaixar.hidden = true;
        imagemPNG = undefined;

       let nome = document.getElementById("nome").value;
       let cargo = document.getElementById("cargo").value;
       let tel = telId.value;
       let uf = document.getElementById("uf").value;
       let unid = document.getElementById("unid").value;
       let escolha = unidades[uf][unid].endereco;

       let numeros = tel.replace(/\D/g, "");
       if (numeros[2] === "9" && numeros.length !== 11) {

        alert("Telefone Inválido");
        return;

       } else if (numeros[2] !== "9" && numeros.length !== 10) {

        alert("Telefone Inválido");
        return;

       }

       let areaAssinatura = document.getElementById("assinatura");

       let canvas = document.createElement("canvas");

        let ctx = canvas.getContext("2d");
         
        let imagem = new Image();
            imagem.onload = function() {

              canvas.width = imagem.naturalWidth;
              canvas.height = imagem.naturalHeight;

              ctx.drawImage(imagem, 0, 0);
              ctx.fillStyle = "#15411a";
               
              ctx.font = "bold 90px Arial";
              ctx.fillText(nome, 196, 240);

              ctx.font = "72px Arial";
              ctx.fillText(cargo, 196, 340);

              ctx.font = "bold 80px Arial";
              ctx.fillText(tel, 196, 480);

              ctx.fillStyle = "#96ff71";
              ctx.font = "42px Arial";
              ctx.fillText(`${unidades[uf][unid].nome} / ${uf}`, 196, 620);

              ctx.font = "56px Arial";
              ctx.fillText(escolha, 196, 690);

              imagemPNG = canvas.toDataURL("image/png");
              botaoBaixar.hidden = false;
            };

            imagem.src = "Teste Agro.png";

        areaAssinatura.replaceChildren(canvas);
    });

    botaoBaixar.addEventListener("click", function() {
       let link = document.createElement("a");
           link.href = imagemPNG;
           link.download = "assinatura-agro.png";

       document.body.appendChild(link);

           link.click();
           link.remove();
}); 
