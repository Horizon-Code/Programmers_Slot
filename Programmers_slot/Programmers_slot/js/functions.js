window.onload=inicio;
var credito=Math.floor(Math.random()*4)+9;
var imagenes=["js.png","python.png","sql.png"];
var premios=[5,2,1];
var numeros_actuales=[];
var au;
var activos=false;

function inicio(){
  document.getElementById("tirar").onclick=lanzar_inicio;
  document.getElementById("cruz").onclick=cerrar;
  au=document.getElementById("sonido");
  for (let k=0;k<document.getElementsByClassName("boton").length;k++){
    document.getElementsByClassName("boton")[k].onclick=lanzar_uno;
}
actualizar();
}
function lanzar_inicio(){
/*if(credito>0){
    sonar("lanzar.mp3");
  activos=true;*/
  numeros_actuales=[];
  for(let k=0;k<document.getElementsByClassName("boton").length;k++){
    numeros_actuales.push(escoger_numero());
    mostrar_imagen(k,numeros_actuales[k]);
}
comparar();
}
function lanzar_uno(){
 let hijos=this.parentNode.parentNode.children;
 for( let k=0;k<hijos.length;k++){
      if(this.parentNode == hijos[k]){
         numeros_actuales[k]=escoger_numero();
         mostrar_imagen(k,numeros_actuales[k]);
         comparar();
         break;
      }
 }
}
function escoger_numero(){
  //do{
    var azar=Math.floor(Math.random()*imagenes.length);
//}while(azar==actual)
  
  return azar;
}
function escoger_imagen(){}
function mostrar_imagen(num,im){
  document.getElementsByClassName("imagen")[num].getElementsByTagName("img")[0].src="img/"+imagenes[im];
}
function comparar(){
  if(numeros_actuales[0]==numeros_actuales[1] &&
    numeros_actuales[1]==numeros_actuales[2]){
    //hay premio
   let p=premios[numeros_actuales[0]] ;
   let mensaje=`Has ganado ${p}monedas<div>`;
    for(let k=0;k<p;k++){
      mensaje+=`<img src="img/monedaeuro.png">`;
    }
    mensaje+=`</div>`;
    mostrar_mensaje(mensaje);
    sonar("ganar.mp3");
    credito+=premios[numeros_actuales[0]];
  }
credito--;
 actualizar();
}
function actualizar(){
  document.getElementById("dinero").innerHTML=credito;
  for (let k=1;k<=credito;k++){
    document.getElementById("monedas").innerHTML += `<img 
    src="img/monedaeuro.png">`;
  }
}
function mostrar_mensaje(m){
   document.getElementById("velo").style.display="flex";
   document.getElementById("mensaje").innerHTML=m;
}
function cerrar(){
  document.getElementById("velo").style.display="none";
  au.pause();
}
function sonar(audio){
   au.src="audios/"+audio;
   au.play();
}