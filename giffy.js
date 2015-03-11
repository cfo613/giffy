window.addEventListener('load', function() {

  //search GIFs on Giphy API
  var searchGIFs = function() {
    //get search params and replace spaces with %20
    var input = document.querySelector("#search").value
    var searchterm = input.replace(/" "/g, "%20");
    //set api url with search terms
    var url = "http://api.giphy.com/v1/gifs/search?q=" + searchterm + "&api_key=dc6zaTOxFJmzC"

    //AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', function(e) {
      //get api response and parse it
      var data = JSON.parse(xhr.responseText);
      //load the first image
      var img = document.querySelector("img");
      var counter = 0;
      img_src = data["data"][counter]["images"]["original"]["url"];
      img.src = img_src;
      var h3 = document.querySelector("h3");
      h3.innerHTML = "Toggle through the images using the left / right arrow keys"
      //listen for keydown for left and right arrows
      var body = document.querySelector("body");
      body.addEventListener("keydown", function(evt) {
        //if left arrow is pressed
        if (evt.keyCode === 37 && counter > 0) {
          h3.innerHTML = "Toggle through the images using the left / right arrow keys"
          counter --
          img_src = data["data"][counter]["images"]["original"]["url"];
          img.src = img_src;
        }
        //if right arrow is pressed
        if (evt.keyCode === 39 && counter < data["data"].length - 1) {
          h3.innerHTML = "Toggle through the images using the left / right arrow keys"
          counter ++
          img_src = data["data"][counter]["images"]["original"]["url"];
          img.src = img_src;
        }
        //handle user going too far left or right in array
        if (evt.keyCode === 37 && counter <= 0) {
          h3.innerHTML = "You've reached the end this way. Try the other direction or search for other sweet GIFs!"
        }
        if (evt.keyCode === 39 && counter >= data["data"].length - 1) {
          h3.innerHTML = "You've reached the end this way. Try the other direction or search for other sweet GIFs!"
        }
      })
    });
    xhr.send();
  };

  //call searchGIFs function on submit button click
  var submit = document.querySelector("#submit");
  submit.addEventListener("click", function() {
    searchGIFs();
  })

  //call searchGIFs function if user presses enter
  var input = document.querySelector("#search");
  input.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 13) {
      searchGIFs();
    }
  })

  //get size of window
  var htmlWindow = document.querySelector("html");
  var htmlRect = htmlWindow.getBoundingClientRect();
  var windowWidth = htmlRect.width;
  var windowHeight = htmlRect.height;

  //set attributes of container
  var sideMargin = 0.1*windowWidth + "px";
  var topMargin = 0.05*windowHeight + "px";
  var conHeight = 0.9*windowHeight + "px";
  document.querySelector(".container").style.marginLeft = sideMargin;
  document.querySelector(".container").style.marginRight = sideMargin;
  document.querySelector(".container").style.marginTop = topMargin;
  document.querySelector(".container").style.marginBottom = topMargin;
  document.querySelector(".container").style.height = conHeight;

  //get size of container
  var container = document.querySelector(".container");
  var containerRect = container.getBoundingClientRect();
  var containerWidth = containerRect.width;
  var containerHeight = containerRect.height;

  //set attributes of images
  var imageHeight = 0.55*containerHeight + "px";
  // var imageWidth = 0.8*containerWidth + "px";
  document.querySelector("img").style.height = imageHeight;
  // document.querySelector("img").style.width = imageWidth;



});
