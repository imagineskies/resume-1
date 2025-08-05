'use strict';
// Variable
var currentPageViewed;

// Declarations


// Constants
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const homePage = document.getElementById('homePage');
const aboutPage = document.getElementById('aboutPage');
const portfolioPage = document.getElementById('portfolioPage');
const resumePage = document.getElementById('resumePage');
const contactPage = document.getElementById('contactPage');
const pageList = [homePage, aboutPage, portfolioPage, resumePage, contactPage];
const mobileNavBar = document.getElementById('mobileNavBar');


/*
____________________________________________________________________________________
Functions
____________________________________________________________________________________
*/


function setHeaderHeight() {
  var height = screen.height;
  document.documentElement.style.setProperty("--header-height", height + 'px');
  console.log(height);
}

function dateSince(pm, py) { // Past Month, Past Year
  pm = months.indexOf(pm);
  let cd = new Date(); // Define a variable of the current date.
  let cm = cd.getMonth(); // Get the month from the current date.
  let cy = cd.getFullYear(); // Get the year from the current date.
  let diy = 12 * (cy - py); // Subtract the past year from the current year to get the number of years in between. Then multiply by 12 to get the number of months.
  let dim = Math.abs(cm - pm); // Subtract the past month from the current month to get the number of months in between. 
  let nvar = diy - dim; // Subtract the total of months in beween from the total number of years in months.
  let yearsSince = Math.floor(nvar/12); // Divide the total number of months by 12 to get the total number of years from the past to current.
  let monthsSince = nvar - (yearsSince*12) // The math should be self explanatory.
  let timeInBetween = (yearsSince.toString() + " yr") + " " + (monthsSince.toString() + " mos") // Adding in abreviations while turing this into a string.
  return timeInBetween // Return the string created
}
document.getElementById('currentdurationOfEmployment').innerHTML = dateSince('August', '2022');

function swapClass(x, y, z) {
  x = document.getElementById(x)
  x.classList.replace(y, z);
}

function checkActivePage() {
  let activePage
  for (let i = 0; i < pageList.length; i++) {
    if (pageList[i].classList.contains("active") == true) {
      activePage =  pageList[i].id;
      return currentPageViewed = activePage;
    }
  }
}

function mobileMenuAllowed() {
  if (pageList[0].classList.contains("unactive") == true) {
    mobileNavBar.classList.add("shown");
    mobileNavBar.classList.remove("hidden");
  } else {
    mobileNavBar.classList.add("hidden");
    mobileNavBar.classList.remove("shown");
  }
}

function exportCurrentPageViewed()  {
  var currentPageViewed = checkActivePage();
  sessionStorage.setItem('currentPageViewed', currentPageViewed);
}

function importCurrentPageViewed() {
  let data = sessionStorage.getItem('currentPageViewed');
  if (data !== 'homePage' && data !== null) {
    swapClass('homePage', "active", "unactive");
    swapClass(data, "unactive", "active");
    mobileMenuAllowed();
  }
}

function menuButton(page) {
  let activePage = checkActivePage();
  swapClass(activePage, "active", "unactive")
  swapClass(page, "unactive", "active")
  mobileMenuAllowed();
  exportCurrentPageViewed();
}

function pageSwap(page) {
  homePage.classList.add('animate__animated', 'animate__fadeOutUp');
  swapClass("homePage", "active", "unactive");
  homePage.classList.remove('animate__animated', 'animate__fadeOutUp');
  swapClass(page, "unactive", "active");
  let apage = document.getElementById(page);
  apage.classList.add('animate__animated', 'animate__fadeInUp');
  setTimeout(() => {
    apage.classList.remove('animate__animated', 'animate__fadeInUp');
  }, 2000);
  mobileMenuAllowed();
  exportCurrentPageViewed();
}

/*
____________________________________________________________________________________
Event Listeners
____________________________________________________________________________________
*/

