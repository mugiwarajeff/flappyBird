this.movimentation = true;
this.contagemDePontos = 0;

function barreira(elementType, elementClass, barrerHeight){
    const elemento = document.createElement(elementType);
    const head = document.createElement(elementType);
    const body = document.createElement(elementType)

    elemento.classList.add(elementClass);
    head.classList.add("barreira-head")
    body.classList.add("barreira-body")

    // adicionando tamanho da barreira
    body.style.height = `${barrerHeight}px`

    elemento.appendChild(body);
    elemento.appendChild(head);
    return elemento;
}

function parBarreiras(elementType, elementClass, initialPosition){
    const randomHeight = Math.random() * 300 + 100;
    const gameContainerHeight = document.querySelector(".div-flappy-container").clientHeight;
    const barrersGapFixed = 250;
    const barreiraTop = new barreira("div", "barreira-top-container", randomHeight);
    const barreiraBottom = new barreira("div", "barreira-bottom-container", gameContainerHeight - randomHeight - barrersGapFixed);
    let currentPosition = initialPosition;

    const barreirasContainer = document.createElement(elementType);
    barreirasContainer.classList.add(elementClass);

    barreirasContainer.appendChild(barreiraTop);
    barreirasContainer.appendChild(barreiraBottom);

    //função para se retirar da DOM

    function moveParBarreira(){
        currentPosition -= 1;
        barreirasContainer.style.left = `${currentPosition}px`;
        barreirasContainer.style.display = `flex`;

       // funcionalidade para se retirar da DOM
        if (currentPosition < barreirasContainer.clientWi){
            barreirasContainer.parentNode.removeChild(barreirasContainer);
        }
    }

        let barrerMove = setInterval(() => {
            if(window.movimentation == true){
                moveParBarreira();
            }else{
                clearInterval(barrerMove);
            }
        }, 1);
    
        comportamentoColisao(barreiraBottom, barreiraTop);
    return barreirasContainer;
}


function comportamentoColisao(barreiraBottom, barreiraTop){
    setInterval(() => {
        const bird = document.querySelector(".bird-container img");
        const birdPositionRelative = parseFloat(bird.style.bottom);
        const birdLeft = bird.getBoundingClientRect().left;
        const barrerTopHeight = Math.round(barreiraTop.getBoundingClientRect().height);
        //const barrerTopHeight = Math.round(document.querySelector(".barreira-top-container").getBoundingClientRect().height);
        const barrerBottomHeight = Math.round(barreiraBottom.getBoundingClientRect().height);
        //const barrerBottomHeight = Math.round(document.querySelector(".barreira-bottom-container").getBoundingClientRect().height);
        const barrerTopWidth = Math.round(barreiraTop.getBoundingClientRect().width);
        //const barrerTopWidth = Math.round(document.querySelector(".barreira-top-container").getBoundingClientRect().width);
        const barrerTopLeft = barreiraTop.getBoundingClientRect().left;
        //const barrerTopLeft = document.querySelector(".barreira-top-container").getBoundingClientRect().left;
        
        if (birdPositionRelative > (92.5 - (barrerTopHeight / 700 * 100).toFixed(2)) && (birdLeft > barrerTopLeft - 60) && birdLeft < barrerTopLeft + barrerTopWidth ){ 
            clearInterval(fallBird);
            clearInterval(autoInst);
            window.movimentation = false;
            document.querySelector(".game-over").style.display = "block"
        }else if (birdPositionRelative < (barrerBottomHeight / 700 * 100).toFixed(2) && birdLeft > barrerTopLeft - 60 && birdLeft < barrerTopLeft + barrerTopWidth){
            window.movimentation = false;
            clearInterval(fallBird);
            clearInterval(autoInst);
            document.querySelector(".game-over").style.display = "block"
        }else if (birdLeft == barrerTopLeft + barrerTopWidth){
            this.contagemDePontos += 1;
            console.log(this.contagemDePontos)
        }
    }, 1)
}

function birdMovimentation(){
    const bird = document.querySelector(".bird-container img");
    let birdTopDistance = 50;

   fallBird = setInterval(() => {
       bird.style.bottom = `${birdTopDistance}%`;
       birdTopDistance -= 0.25
       
       if (birdTopDistance <= 0){
           birdTopDistance = 0;
       }else if (birdTopDistance >= 95){
           birdTopDistance = 95;
       }
   }, 10);

   window.onclick = e => {
           birdTopDistance += 10; 
   }

   document.addEventListener("keyup", function(e) {
       var space = 32;
       if (space){
           birdTopDistance += 10;
       }
   })
}

function atualizaScore(){
    setInterval(() => {
        document.querySelector(".progresso").innerText = this.contagemDePontos;
    }, 100);
}

function startBarreiras(){
    const a = new parBarreiras("div", "barreiras-container", 1700);
    return document.querySelector("[wm-flappy]").appendChild(a);
}


this.autoInst = setInterval(()=> {
        startBarreiras();
    }, 1000)

atualizaScore();
birdMovimentation();




