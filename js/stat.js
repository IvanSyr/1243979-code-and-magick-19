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
var barWidth = 40;                               //Ширина стобиков статистики
var cloudBottom = CLOUD_Y + CLOUD_HEIGHT;        //Низ окна статистики

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHEDOW, CLOUD_Y + GAP_SHEDOW, 'rgba(0, 0, 0, 0.7)');

  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_CONTENT_SIDE, CLOUD_Y + GAP_CONTENT_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_CONTENT_SIDE, (CLOUD_Y + GAP_CONTENT_TOP) * 1.5);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    } else {
      ctx.fillStyle = 'hsl(220, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    };

  ctx.fillRect(CLOUD_X + GAP_CONTENT_SIDE + (GAP_CONTENT + barWidth) * i, cloudBottom - GAP_CONTENT_BOTTOM - FONT_GAP, barWidth, (times[i] * BAR_HEIGHT) / maxTime * (-1));
  ctx.fillStyle = '#000'; //Переопределяю значения предыдущей команды ctx.fillStyle
  ctx.fillText(names[i], CLOUD_X + GAP_CONTENT_SIDE + (GAP_CONTENT + barWidth) * i, cloudBottom - GAP_CONTENT_BOTTOM);
  ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP_CONTENT_SIDE + (GAP_CONTENT + barWidth) * i, cloudBottom - GAP_CONTENT_BOTTOM - ((times[i] * BAR_HEIGHT) / maxTime) - FONT_GAP * 1.5);
  }
};
