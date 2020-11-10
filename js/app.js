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

  for (var i = 0; i < randomIndexes.length; i++) {
    var currentIndex = randomIndexes[i];
    var currentElement = imageElements[i];

    currentElement.src = allProducts[currentIndex].filePath;
    currentElement.alt = allProducts[currentIndex].title;
    currentElement.title = allProducts[currentIndex].title;
    allProducts[currentIndex].appearances++;
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

renderImages();

votingElement.addEventListener("click", recordVote);
