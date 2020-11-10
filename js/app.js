"use strict";

var allProducts = [];
var leftImageElement = document.getElementById("left-image");
var centerImageElement = document.getElementById("center-image");
var rightImageElement = document.getElementById("right-image");
var imageElements = [leftImageElement, centerImageElement, rightImageElement]
var randomIndexes = [];
var numberOfVotes = 0;

function Product(fileName, title) {
  this.filePath = `img/${fileName}`;
  this.alt = title;
  this.title = title;
  this.votes = 0;
  this.appearances = 0;

  allProducts.push(this);
}

new Product("bag.jpg", "bag");
new Product("banana.jpg", "banana");
new Product("bathroom.jpg", "bathroom");
new Product("boots.jpg", "boots");
new Product("breakfast.jpg", "breakfast");
new Product("bubblegum.jpg", "bubblegum");
new Product("chair.jpg", "chair");
new Product("cthulhu.jpg", "cthulhu");
new Product("dog-duck.jpg", "dog-duck");
new Product("dragon.jpg", "dragon");
new Product("pen.jpg", "pen");
new Product("pet-sweep.jpg", "pet-sweep");
new Product("scissors.jpg", "scissors");
new Product("shark.jpg", "shark");
new Product("sweep.png", "sweep");
new Product("tauntaun.jpg", "tauntaun");
new Product("unicorn.jpg", "unicorn");
new Product("usb.gif", "usb");
new Product("water-can.jpg", "water-can");
new Product("wine-glass.jpg", "wine-glass");

function renderImages() {
  generateRandomIndexes();

  for(var i = 0 ; i < randomIndexes.length ; i++){
   imageElements[i].src = allProducts[randomIndexes[i]].filePath;
   imageElements[i].alt = allProducts[randomIndexes[i]].title;
   imageElements[i].title = allProducts[randomIndexes[i]].title;
   allProducts[randomIndexes[i]].appearances++;

  }

}

function generateRandomIndexes() {
  randomIndexes = [];
  var indexLeft = Math.floor(Math.random() * allProducts.length);
  var indexCenter = Math.floor(Math.random() * allProducts.length);
  while (indexCenter === indexLeft) {
    indexCenter = Math.floor(Math.random() * allProducts.length);
  }
  var indexRight = Math.floor(Math.random() * allProducts.length);
  while (indexRight === indexLeft || indexRight === indexCenter) {
    indexRight = Math.floor(Math.random() * allProducts.length);
  }
  randomIndexes.push(indexLeft, indexCenter, indexRight);
}

function recordVote(e){
 var selectedImage = e.target.title;
 for(var i = 0 ; i < allProducts.length ; i++) {
  if(allProducts[i].title === selectedImage) {
   allProducts[i].votes++;
  }
 }
 numberOfVotes++;
 if(numberOfVotes === 25){
  votingElement.removeEventListener('click', recordVote);
  createResultButton();
 }
 renderImages();
}

function createResultButton(){
 var buttonContainer = document.getElementById('button-container');
 var resultsButton = document.createElement('button');
 resultsButton.textContent = 'View Results';
 buttonContainer.appendChild(resultsButton);
 resultsButton.addEventListener('click', displayResults);
}

function displayResults(){
 document.getElementById('results-frame').innerHTML = '';
 var resultsFrame = document.getElementById('results-frame');
 var headerEl = document.createElement('h2');
 var resultEl;
 var pluralVotes;
 var pluralShown;
 headerEl.textContent = 'Results';
 resultsFrame.appendChild(headerEl);
 for(var i = 0 ; i < allProducts.length ; i++){
  pluralVotes = 's';
  pluralShown = 's';
  if(allProducts[i].votes === 1){
   pluralVotes = '';
  }
  if(allProducts[i].appearances === 1){
   pluralShown = '';
  }
  resultEl = document.createElement('p');
  resultEl.textContent = `${allProducts[i].title} had ${allProducts[i].votes} vote${pluralVotes}, and was seen ${allProducts[i].appearances} time${pluralShown}.`;
  resultsFrame.appendChild(resultEl);
 }
 resultButton.removeEventListener('click', displayResults);
}


renderImages();

console.log(allProducts);

var votingElement = document.getElementById('voting-area');
votingElement.addEventListener('click', recordVote);
