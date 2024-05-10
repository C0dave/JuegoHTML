const cards = document.querySelectorAll(".card");
const num_parejas = document.querySelector(".container h2 span");

let tar_1,tar_2;
let deshabiltarCartas=false;
let parejas = 0;

let sonidos = document.querySelector("#sonidos");
let fondos = document.querySelector("#fondos");

const sonIguales = (imagen1,imagen2) => {
    if(imagen1 === imagen2){
        sonidos.src = 'sounds/success.mp3';
        sonidos.volume = 0.3;
        sonidos.play();
        parejas++;
        num_parejas.innerHTML = parejas;
        if(parejas === 8){
            sonidos.src = 'sounds/win.mp3';
            sonidos.volume = 0.5;
            sonidos.play();
            setTimeout(() => {
                return reiniciarJuego();
                
            },1000)
        }
        tar_1.removeEventListener("click", darVuelta);
        tar_2.removeEventListener("click", darVuelta);
        tar_1 = tar_2 = "";
        return (deshabiltarCartas = false);
    }

    setTimeout(()=>{ 
        tar_1.classList.add("moverse");
        tar_2.classList.add("moverse");
        sonidos.src = 'sounds/lose.mp3';
        sonidos.volume = 0.3;
        sonidos.play();
    },500)

    setTimeout(()=>{ 
        tar_1.classList.remove("moverse", "vuelta");
        tar_2.classList.remove("moverse", "vuelta");
        tar_1 = tar_2 = "";
        deshabiltarCartas = false;
    },1500)
}

const darVuelta = (e)=> {
    let tarjeta = e.target; 
    if(tarjeta!== tar_1 && !deshabiltarCartas){
        tarjeta.classList.add("vuelta"); 
        if(!tar_1){
            return tar_1=tarjeta;
        }
        tar_2 = tarjeta;
        deshabiltarCartas = true;
        let img1 = tar_1.querySelector('img').src;
        let img2 = tar_2.querySelector('img').src;
        sonIguales(img1,img2)
    }
};

const reiniciarJuego = () => {
    fondos.src = 'sounds/background.mp3';
    fondos.volume = 0.5;
    fondos.play();
    parejas = 0;
    tar_1 = tar_2 = "";
    deshabiltarCartas = false;
    num_parejas.innerHTML = 0;
    let fichas = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    fichas.sort(() => {
        return Math.random() - 0.5;
    });
    cards.forEach((tarjeta, index) => {
        tarjeta.classList.remove("vuelta");
        let img = tarjeta.querySelector("img");
        img.src = `img/img-${fichas[index]}.png`;
        tarjeta.addEventListener("click", darVuelta);
    });
};
reiniciarJuego();

