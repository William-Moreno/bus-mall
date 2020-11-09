'use strict';

var allProducts = [];
var leftImageElement = document.getElementById('left-image');
var centerImageElement = document.getElementById('center-image');
var rightImageElement = document.getElementById('right-image');
var indexLeft;
var indexCenter;
var indexRight;


function Product(fileName, title){
 this.filepath = `img/${fileName}`;
 this.alt = title;
 this.title = title;
 this.votes = 0;
 this.appearances = 0;

 allProducts.push(this);

}

new Product('bag.jpg', 'bag');
new Product('banana.jpg', 'banana');
new Product('bathroom.jpg', 'bathroom');
new Product('boots.jpg', 'boots');
new Product('breakfast.jpg', 'breakfast');
new Product('bubblegum.jpg', 'bubblegum');
new Product('chair.jpg', 'chair');
new Product('cthulhu.jpg', 'cthulhu');
new Product('dog-duck.jpg', 'dog-duck');
new Product('dragon.jpg', 'dragon');
new Product('pen.jpg', 'pen');
new Product('pet-sweep.jpg', 'pet-sweep');
new Product('scissors.jpg', 'scissors');
new Product('shark.jpg', 'shark');
new Product('sweep.png', 'sweep');
new Product('tauntaun.jpg', 'tauntaun');
new Product('unicorn.jpg', 'unicorn');
new Product('usb.gif', 'usb');
new Product('water-can.jpg', 'water-can');
new Product('wine-glass.jpg', 'wine-glass');

console.log(allProducts);

function renderImages(){

}

function generateRandomIndexes(){
 indexLeft = Math.floor(Math.random() * allProducts.length);
 indexCenter = Math.floor(Math.random() * allProducts.length);
 while(indexCenter === indexLeft){
  indexCenter = Math.floor(Math.random() * allProducts.length);
 }
 indexRight = Math.floor(Math.random() * allProducts.length);
 while(indexRight === indexLeft || indexRight === indexCenter){
  indexRight = Math.floor(Math.random() * allProducts.length);
 }
}


// var votingElement = document.getElementById('voting-area');
// votingElement.addEventListener('click', recordVote);