# Lab: 13

---

## BusMall

I build a market analysis app that presents the user with three random products from a catalog of twenty. The user selects the product they would be most likely to purchase from the group of images and is then presented with a new set of three images to chose from. None of the images in the round will repeat any of the images in the previous round. After 25 choices have been made, the user is presented with a "View Results" button. When clicked, the button and images will be removed and the results of the survey will be displayed to the left, indicating the number of times each product was shown, how many times it was selected and the percentage of times the product was selected when it was presented as a choice. This information is mirrored in a bar graph that will appear on the right side of the page as well. An aggregate number of votes for each product is retained utilizing local storage. The number of voting rounds can also be adjusted by changing the value of the 'maxRounds' global variable.

### How Does The Application Work

Open in a web browser.

### Author: William Moreno

### Links and Resources

- [BusMall Repository](https://github.com/William-Moreno/bus-mall)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- Unsplash Images by Valik Chernetskyi, Roman Fox and Juan Encalada.
- [BusMall Webpage](https://william-moreno.github.io/bus-mall)

### Reflections and Comments

**Lab: 11**

- I was able to achieve the primary goals within our alotted lab time. However, I then proceeded to spend an additional 4 hours styling and tweaking and adding extra functionality to the project before I was satisfied for the night.

**Lab: 12**

- I was able to refactor my code to meet the new requirements more easily than I had thought I would. I believe this is partially due to the fact that my orignal architecture for my app.js was conceived of well enough and flexible enough that it required only minor adjustments to produce the desired results.
- I made use of the Chart.js library and documentation to incorporate the desired chart showing number of votes and times shown for each product. _(see link above)_
- I kept styling changes to a minimum today as I did not feel I needed to address it at this point.

**Lab: 13**

- The implementation of local storage to keep track of the aggregate numbers of votes was fairly simple and straightforward. Refactoring of code was minimal to insert this feature.

**Lab: 15b**

- I have touched up the app a bit. The images are now removed upon vote completion when the button is clicked. I also have hidden the chart until the button is clicked as well. As a result, I was able to increase the size of the chart and display it farther up the page where it seems to be easier to view.
- The page has also been deployed on GitHub Pages.
