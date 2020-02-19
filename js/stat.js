'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLUMN_WIDTH = 40;

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandom = function (number) {
  return Math.floor(Math.random() * number);
};

window.renderStatistics = function (ctx, names, times) {
  var createCloud = function (x, y, color) {
    var CLOUD_WIDTH = 420;
    var CLOUD_HEIGHT = 270;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderCloudWithShadow = function () {
    var GAP = 10;
    var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
    var SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';
    createCloud(CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
    createCloud(CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  };

  var createText = function (text, x, y) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(text, x, y);
  };

  var renderCongratulationText = function () {
    var GAP_OF_LEFT = CLOUD_X + 55;
    var GAP_OF_TOP = CLOUD_Y + 20;
    var TEXT_HEIGHT = 20;
    var texts = ['Ура вы победили!', 'Список результатов:'];
    texts.forEach(function (text, i) {
      createText(text, GAP_OF_LEFT, GAP_OF_TOP + (TEXT_HEIGHT * i));
    });
  };

  var createColumn = function (currentColumnX, bottom, heightColumn, color) {
    ctx.fillStyle = color;
    ctx.fillRect(currentColumnX, bottom - heightColumn, COLUMN_WIDTH, heightColumn);
  };

  var createHistogram = function (currentColumnX, heightColumn, name, time) {
    var MY_COLOR = 'rgba(255, 0, 0, 1)';
    var otherColor = 'hsl(240, ' + getRandom(100) + '%, 50%)';
    var COLUMN_Y = 240;
    var userTimeTextY = COLUMN_Y - heightColumn - 10;
    var userNameTextY = COLUMN_Y + 20;
    var color = name === 'Вы' ? MY_COLOR : otherColor;
    time = Math.round(time);
    createText(time, currentColumnX, userTimeTextY);
    createText(name, currentColumnX, userNameTextY);
    createColumn(currentColumnX, COLUMN_Y, heightColumn, color);
  };

  var renderHistogram = function () {
    var COLUMN_X = CLOUD_X + 55;
    var COLUMN_GAP = 50;
    var COLUMN_HEIGHT = 150;
    var maxTime = getMaxElement(times);

    names.forEach(function (name, i) {
      var time = times[i];
      var currentColumnX = COLUMN_X + ((COLUMN_WIDTH + COLUMN_GAP) * i);
      var currentColumnHeight = time / maxTime * COLUMN_HEIGHT;
      createHistogram(currentColumnX, currentColumnHeight, name, time);
    });
  };

  var init = function () {
    renderCloudWithShadow();
    renderCongratulationText();
    renderHistogram();
  };

  init();
};
