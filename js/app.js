'use strict';

// global variables

var allProducts = [];
var votingElement = document.getElementById('voting-area');
var leftImageElement = document.getElementById('left-image');
var centerImageElement = document.getElementById('center-image');
var rightImageElement = document.getElementById('right-image');
var imageElements = [leftImageElement, centerImageElement, rightImageElement];
var randomIndexes = [];
var votingRounds = 0;
var maxRounds = 25;
var productLabels = [];
var productVotes = [];
var productShown = [];

// product constructor function

function Product(filePath, votes = 0, appearances = 0, percentage = 0) {
  this.filePath = filePath;
  this.alt = this.title = filePath.slice(4,-4);
  this.votes = votes;
  this.appearances = appearances;
  this.percentage = percentage;

  allProducts.push(this);
}

// prototype function to determine percentage of times a shown product was voted for

Product.prototype.percentageChosen = function () {
  var timesPicked = this.votes;
  var timesShown = this.appearances;

  if (timesShown === 0) {
    this.percentage = 0;
  } else {
    this.percentage = Math.round((timesPicked / timesShown) * 100);
  }
};

// initial population of allProducts arrive with Object Instances

function populateInitialProductArray(){

  new Product('img/bag.jpg');
  new Product('img/banana.jpg');
  new Product('img/bathroom.jpg');
  new Product('img/boots.jpg');
  new Product('img/breakfast.jpg');
  new Product('img/bubblegum.jpg');
  new Product('img/chair.jpg');
  new Product('img/cthulhu.jpg');
  new Product('img/dog-duck.jpg');
  new Product('img/dragon.jpg');
  new Product('img/pen.jpg');
  new Product('img/pet-sweep.jpg');
  new Product('img/scissors.jpg');
  new Product('img/shark.jpg');
  new Product('img/sweep.png');
  new Product('img/tauntaun.jpg');
  new Product('img/unicorn.jpg');
  new Product('img/usb.gif');
  new Product('img/water-can.jpg');
  new Product('img/wine-glass.jpg');
}

// image rendering function

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

// generate random number for randomIndexes array

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

// voting function

function recordVote(e) {
  if (
    e.target.id === 'left-image' ||
    e.target.id === 'center-image' ||
    e.target.id === 'right-image'
  ) {
    var selectedImage = e.target.title;
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].title === selectedImage) {
        allProducts[i].votes++;
      }
    }
    votingRounds++;
    if (votingRounds === maxRounds) {
      votingElement.removeEventListener('click', recordVote);
      getPercentages();
      createResultButton();
    }
    renderImages();
  }
}

// create button to display voting results

function createResultButton() {
  var buttonContainer = document.getElementById('button-container');
  var resultsButton = document.createElement('button');

  resultsButton.textContent = 'View Results';
  buttonContainer.appendChild(resultsButton);
  resultsButton.addEventListener('click', displayResults);
}

// voting results display

function displayResults() {
  document.getElementById('results-header').innerHTML = '';
  var resultsHeader = document.getElementById('results-header');
  var headerEl = document.createElement('h2');
  var resultsList = document.getElementById('results-list');
  var resultEl;
  var pluralVotes;
  var pluralShown;

  headerEl.textContent = 'Results';
  resultsHeader.appendChild(headerEl);

  for (var i = 0; i < allProducts.length; i++) {
    pluralVotes = 's';
    pluralShown = 's';

    if (allProducts[i].votes === 1) {
      pluralVotes = '';
    }

    if (allProducts[i].appearances === 1) {
      pluralShown = '';
    }

    resultEl = document.createElement('li');
    resultEl.textContent = `${allProducts[i].title} had ${allProducts[i].votes} vote${pluralVotes}, and was seen ${allProducts[i].appearances} time${pluralShown}. ${allProducts[i].percentage}%`;
    resultsList.appendChild(resultEl);

  }

  document.getElementById('button-container').innerHTML = '';
  thankYouMessage();
  blankImages();
  generateChart();
  storeProductInfo();
}

// generate data for chart

function createChartData(){
  for(var i = 0 ; i < allProducts.length ; i++){
    productLabels.push(allProducts[i].title);
    productVotes.push(allProducts[i].votes);
    productShown.push(allProducts[i].appearances);
  }
}

// chart generator

function generateChart(){
  createChartData();

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

// end of vote functions

function thankYouMessage() {
  var thankElement = document.getElementById('button-container');
  var thanksMessage = document.createElement('h4');
  
  thanksMessage.textContent = 'Thank You For Participating!!';
  thankElement.appendChild(thanksMessage);
}

function getPercentages() {
  for (var i = 0; i < allProducts.length; i++) {
    allProducts[i].percentageChosen();
  }
}

function blankImages(){
  document.getElementById('image-area').innerHTML = '';
  document.getElementById('prompt-vote').textContent = '';
  var showChartArea = document.getElementById('information');
  showChartArea.classList.remove('chart-container');
}

// determine if this is the first visit

function firstVisit(){
  if(localStorage.length === 0){
    populateInitialProductArray();
  } else {
    retrieveProductInfo();
  }
}

// local storage functions

function storeProductInfo(){
  var stringifiedProducts = JSON.stringify(allProducts);
  localStorage.setItem('productinfo', stringifiedProducts);
}

function retrieveProductInfo(){
  var storedProducts = localStorage.getItem('productinfo');
  var parsedProducts = JSON.parse(storedProducts);

  reconstituteProductArray(parsedProducts);
}

function reconstituteProductArray(parsedArray){
  allProducts = [];
  for(var i = 0 ; i < parsedArray.length ; i++){
    new Product(parsedArray[i].filePath, parsedArray[i].votes, parsedArray[i].appearances, parsedArray[i].percentage);
  }
}

// function calls and establishment of event listener on intial page load

firstVisit();
generateRandomIndexes();
renderImages();

votingElement.addEventListener('click', recordVote);

