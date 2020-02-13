'Use strict'

var CLOUD_WIDTH = 420;                           //Ширина окна статистики
var CLOUD_HEIGHT = 270;                          //Высота окна статистики
var CLOUD_X = 100;                               //Координата по Х верхнего левого угла окна статистики
var CLOUD_Y = 10;                                //Координата по Y верхнего левого угла окна статистики
var GAP_CONTENT_SIDE = 55;                       //Расстояние от боков окна статистики до контента
var GAP_CONTENT = 50;                            //Расстояние между стобиками статистики
var GAP_CONTENT_TOP = 30;                        //Расстояние от верха окна статистики до текста
var GAP_CONTENT_BOTTOM = 20;                     //Расстояние от низа окна статистики до контента
var GAP_SHEDOW = 10;                             //Смещение тени вниз и вправо
var FONT_GAP = 20;                               //Высота текстовых блоков
var BAR_HEIGHT = 150;                            //Высота самого высокого стлбика статистики
var BAR_WIDTH = 40;                              //Ширина стобиков статистики
var CLOUD_BOTTOM = CLOUD_Y + CLOUD_HEIGHT;       //Низ окна статистики

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
   return Math.max.apply(null, arr);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHEDOW, CLOUD_Y + GAP_SHEDOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  var congratulationText = function () {
  tx.fillStyle = '#000';
  tx.font = '16px PT Mono';
  tx.fillText('Ура вы победили!', CLOUD_X + GAP_CONTENT_SIDE, CLOUD_Y + GAP_CONTENT_TOP);
  tx.fillText('Список результатов:', CLOUD_X + GAP_CONTENT_SIDE, (CLOUD_Y + GAP_CONTENT_TOP) * 1.5);
  };
  congratulationText();

  names.forEach(function (name, i) {

  var getRandomNamber = Math.floor(Math.random() * 100) + '%';
  var floorTimes = Math.floor(times[i]);

  ctx.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomNamber + ', 50%)';
  ctx.fillRect(CLOUD_X + GAP_CONTENT_SIDE + (GAP_CONTENT + BAR_WIDTH) * i, CLOUD_BOTTOM - GAP_CONTENT_BOTTOM - FONT_GAP, BAR_WIDTH, (times[i] * BAR_HEIGHT) / maxTime * (-1));
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(name, CLOUD_X + GAP_CONTENT_SIDE + (GAP_CONTENT + BAR_WIDTH) * i, CLOUD_BOTTOM - GAP_CONTENT_BOTTOM);
  ctx.fillText(floorTimes, CLOUD_X + GAP_CONTENT_SIDE + (GAP_CONTENT + BAR_WIDTH) * i, CLOUD_BOTTOM - GAP_CONTENT_BOTTOM - ((times[i] * BAR_HEIGHT) / maxTime) - FONT_GAP * 1.5);
  });
  };
