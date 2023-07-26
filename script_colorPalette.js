
$(document).ready(function() {
  generateColors();

  $('#add-color').click(function() {
    generateColors();
  });

  function generateColors() {
    var colorPalette = $('#color-palette');
    colorPalette.empty();

    var letters = '0123456789ABCDEF';
    var colorA = getRandomDarkColor(letters);
    var colorB = getLighterColor(colorA, 0.25);
    var colorC = getLighterColor(colorA, 0.5);
    var colorD = getLighterColor(colorA, 0.75);

    var colors = [colorA, colorB, colorC, colorD];

    let button = document.getElementById('copyButton');

    button.addEventListener('click', ()=>{ 
        navigator.clipboard.writeText(colors.toString());
        button.innerText = 'Copied'
        setTimeout(function() {
          button.innerText = "Copy";
        }, 500);
     })

    for (var i = 0; i < colors.length; i++) {
      var colorBox = $('<div>').addClass('col-md-3 color-box').css('background-color', colors[i]);
      var colorCode = $('<p>').text(colors[i]).addClass('color-code');
      colorBox.append(colorCode);
      colorPalette.append(colorBox);
    }
  }

  function getRandomDarkColor(letters) {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  }

  function getLighterColor(color, percentage) {
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);

    r = Math.min(Math.round(r + (255 - r) * percentage), 255);
    g = Math.min(Math.round(g + (255 - g) * percentage), 255);
    b = Math.min(Math.round(b + (255 - b) * percentage), 255);

    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
});

