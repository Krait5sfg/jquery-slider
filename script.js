$(function () {
  var backgroundColor = {
    red: 240,
    green: 240,
    blue: 250
  };

  var color = {
    red: 0,
    green: 0,
    blue: 0
  };

  function setValue(red, green, blue) {
    return {red, green, blue};
  }

  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString(16),
      g.toString(16),
      b.toString(16)
    ];
    $.each(hex, function (nr, val) {
      if (val.length === 1) {
        hex[nr] = "0" + val;
      }
    });
    return hex.join("").toUpperCase();
  }

  function refreshSwatch(evt) {
    var red = $("#red").slider("value"),
      green = $("#green").slider("value"),
      blue = $("#blue").slider("value"),
      hex = hexFromRGB(red, green, blue);
    $("#swatch").css('background-color', "#" + hex);
    if (evt.type === 'slide') {
      backgroundColor = setValue(red, green, blue);
    }
  }

  function refreshColor(evt) {
    var red = $("#red").slider("value"),
      green = $("#green").slider("value"),
      blue = $("#blue").slider("value"),
      hex = hexFromRGB(red, green, blue);
    $("#swatch").css('color', "#" + hex);
    if (evt.type === 'slide') {
      color = setValue(red, green, blue);
    }
  }

  $("#red, #green, #blue").slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refreshSwatch,
  });

  // начальные установки при открытии страницы
  $("#red").slider("value", backgroundColor.red);
  $("#green").slider("value", backgroundColor.green);
  $("#blue").slider("value", backgroundColor.blue);
  $("#swatch").css("background-color", "#" + hexFromRGB(backgroundColor.red, backgroundColor.green, backgroundColor.blue));

  // переключение между фоном и шрифтом
  $('button').click((function (evt) {
    $('.active').removeClass('active');
    $(evt.target).addClass('active');
    if (evt.target.dataset.name === 'color') {
      $("#red, #green, #blue").slider({
        slide: refreshColor,
      });

      $("#red").slider("value", color.red);
      $("#green").slider("value", color.green);
      $("#blue").slider("value", color.blue);
      $("#swatch").css("color", "#" + hexFromRGB(color.red, color.green, color.blue));

    } else {
      $("#red, #green, #blue").slider({
        slide: refreshSwatch,
      });

      $("#red").slider("value", backgroundColor.red);
      $("#green").slider("value", backgroundColor.green);
      $("#blue").slider("value", backgroundColor.blue);
      $("#swatch").css("background-color", "#" + hexFromRGB(backgroundColor.red, backgroundColor.green, backgroundColor.blue));
    }
  }))
});
