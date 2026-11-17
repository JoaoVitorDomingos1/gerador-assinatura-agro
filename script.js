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

let botaoBaixar = document.getElementById("baixar");
let imagemPNG;

    formulario.addEventListener("submit", function(event) { 

        event.preventDefault();

        botaoBaixar.hidden = true;
        imagemPNG = undefined;

       let nome = document.getElementById("nome").value;
       let cargo = document.getElementById("cargo").value;
       let tel = document.getElementById("tel").value;
       let uf = document.getElementById("uf").value;
       let unid = document.getElementById("unid").value;
       let escolha = unidades[uf][unid].endereco;

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
