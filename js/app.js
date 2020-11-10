"use strict";

var allProducts = [];
var votingElement = document.getElementById("voting-area");
var leftImageElement = document.getElementById("left-image");
var centerImageElement = document.getElementById("center-image");
var rightImageElement = document.getElementById("right-image");
var imageElements = [leftImageElement, centerImageElement, rightImageElement];
var randomIndexes = [];
var votingRounds = 0;
var maxRounds = 25;
var productLabels = [];
var productVotes = [];
var productShown = [];

function Product(fileName) {
  this.filePath = `img/${fileName}`;
  this.alt = this.title = fileName.slice(0,-4);
  this.votes = 0;
  this.appearances = 0;
  this.percentage = 0;

  allProducts.push(this);
}

Product.prototype.percentageChosen = function () {
  var timesPicked = this.votes;
  var timesShown = this.appearances;

  if (timesShown === 0) {
    this.percentage = 0;
  } else {
    this.percentage = Math.round((timesPicked / timesShown) * 100);
  }
};

new Product("bag.jpg");
new Product("banana.jpg");
new Product("bathroom.jpg");
new Product("boots.jpg");
new Product("breakfast.jpg");
new Product("bubblegum.jpg");
new Product("chair.jpg");
new Product("cthulhu.jpg");
new Product("dog-duck.jpg");
new Product("dragon.jpg");
new Product("pen.jpg");
new Product("pet-sweep.jpg");
new Product("scissors.jpg");
new Product("shark.jpg");
new Product("sweep.png");
new Product("tauntaun.jpg");
new Product("unicorn.jpg");
new Product("usb.gif");
new Product("water-can.jpg");
new Product("wine-glass.jpg");

function renderImages() {
  generateRandomIndexes();

  for (var i = 0; i < 3; i++) {
    var currentIndex = randomIndexes[i];
    var currentElement = imageElements[i];

    currentElement.src = allProducts[currentIndex].filePath;
    currentElement.alt = allProducts[currentIndex].title;
    currentElement.title = allProducts[currentIndex].title;
    allProducts[currentIndex].appearances++;
  }
}

function generateRandomIndexes() {

  for(var i = 0 ; i < 3 ; i++){

		var generatedNumber = getRandomNumber();

		while(randomIndexes.includes(generatedNumber)){
		generatedNumber = getRandomNumber();
		}

		randomIndexes.unshift(generatedNumber);

		while(randomIndexes.length > 6){
		randomIndexes.pop();
		}
	}
}

function getRandomNumber(){
	return Math.floor(Math.random() * allProducts.length);
}

function recordVote(e) {
  if (
    e.target.id === "left-image" ||
    e.target.id === "center-image" ||
    e.target.id === "right-image"
  ) {
    var selectedImage = e.target.title;
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].title === selectedImage) {
        allProducts[i].votes++;
      }
    }
    votingRounds++;
    if (votingRounds === maxRounds) {
      votingElement.removeEventListener("click", recordVote);
      getPercentages();
      createResultButton();
    }
    renderImages();
  }
}

function createResultButton() {
  var buttonContainer = document.getElementById("button-container");
  var resultsButton = document.createElement("button");

  resultsButton.textContent = "View Results";
  buttonContainer.appendChild(resultsButton);
  resultsButton.addEventListener("click", displayResults);
}

function displayResults() {
  document.getElementById("results-header").innerHTML = "";
  var resultsHeader = document.getElementById("results-header");
  var headerEl = document.createElement("h2");
  var resultsList = document.getElementById("results-list");
  var resultEl;
  var pluralVotes;
  var pluralShown;

  headerEl.textContent = "Results";
  resultsHeader.appendChild(headerEl);

  for (var i = 0; i < allProducts.length; i++) {
    pluralVotes = "s";
    pluralShown = "s";

    if (allProducts[i].votes === 1) {
      pluralVotes = "";
    }

    if (allProducts[i].appearances === 1) {
      pluralShown = "";
    }

    resultEl = document.createElement("li");
    resultEl.textContent = `${allProducts[i].title} had ${allProducts[i].votes} vote${pluralVotes}, and was seen ${allProducts[i].appearances} time${pluralShown}. ${allProducts[i].percentage}%`;
    resultsList.appendChild(resultEl);

  }

  document.getElementById("button-container").innerHTML = "";
  thankYouMessage();
  generateChart();
}

function createProductLabels(){
  for(var i = 0 ; i < allProducts.length ; i++){
    productLabels.push(allProducts[i].title);
  }
}

function createProductVotes(){
  for(var i = 0 ; i < allProducts.length ; i++){
    productVotes.push(allProducts[i].votes);
  }
}

function createProductShown(){
  for(var i = 0 ; i < allProducts.length ; i++){
    productShown.push(allProducts[i].appearances);
  }
}

function generateChart(){
  createProductLabels();
  createProductVotes();
  createProductShown();

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: productLabels,
          datasets: [{
              label: 'Votes',
              data: productVotes,
              backgroundColor: [
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)', 'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)', 'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)', 'rgba(0, 204, 0, 0.4)',
                  'rgba(0, 204, 0, 0.4)'
              ],
              borderColor: [
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)', 'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)', 'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)', 'rgba(0, 204, 0, 1)',
                  'rgba(0, 204, 0, 1)'
              ],
              borderWidth: 1
          }, {
              label: 'Times Shown',
              data: productShown,
              backgroundColor: [
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)', 'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)', 'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)', 'rgba(107, 107, 71, 0.4)',
                  'rgba(107, 107, 71, 0.4)'
              ],
              borderColor: [
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)', 'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)', 'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)', 'rgba(107, 107, 71, 1)',
                  'rgba(107, 107, 71, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

function thankYouMessage() {
  var thankElement = document.getElementById("button-container");
  var thanksMessage = document.createElement("h4");
  
  thanksMessage.textContent = "Thank You For Participating!!";
  thankElement.appendChild(thanksMessage);
}

function getPercentages() {
  for (var i = 0; i < allProducts.length; i++) {
    allProducts[i].percentageChosen();
  }
}

generateRandomIndexes();
renderImages();

votingElement.addEventListener("click", recordVote);

