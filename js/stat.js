"use strict";

const CLOUD_HEIGHT = 270;
const CLOUD_WIDTH = 420;
const CLOUD_COORDINATE_X = 100;
const CLOUD_COORDINATE_Y = 10;
const GAP = 50;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;

const createCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
const createText = (ctx, x, y, font, fontSize, color, content) => {
  ctx.font = `${font} ${fontSize}`;
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = color;
  ctx.fillText(`${content}`, x, y);
};
const getMaxTime = (arr) => {
  let maxElement = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

window.renderStatistics = function (ctx, names, times) {

  let maxTime = getMaxTime(times);

  createCloud(ctx, CLOUD_COORDINATE_X + 10, CLOUD_COORDINATE_Y + 10, `rgba(0, 0, 0, 0.7)`);
  createCloud(ctx, CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, `#fff`);
  createText(ctx, 130, 30, `PT Mono`, `16px`, `#222222`, `Ура вы победили!`);
  createText(ctx, 130, 50, `PT Mono`, `16px`, `#222222`, `Список результатов:`);

  for (let i = 0; i < names.length; i++) {
    const roundedTime = Math.floor(times[i]);
    const barHeight = Math.floor(-(BAR_HEIGHT * roundedTime) / maxTime);
    const timeTextPosition = (BAR_HEIGHT - (Math.floor((BAR_HEIGHT * roundedTime) / maxTime)) + GAP + 15);

    // Render the bars
    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(226, 96%, ${getRandomInt(40)}%)`;
    }
    ctx.fillRect(130 + ((BAR_WIDTH + GAP) * i), 240, BAR_WIDTH, barHeight);

    // Render the text
    ctx.fillStyle = `rgba(0, 0, 0, .7)`;
    ctx.fillText(roundedTime, 130 + ((BAR_WIDTH + GAP) * i), timeTextPosition);
    ctx.fillText(names[i], 130 + ((BAR_WIDTH + GAP) * i), 250);
  }
};
