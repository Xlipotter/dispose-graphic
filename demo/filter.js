function Filter(context) {
  this.context = context;
}
Filter.prototype.constructor = Filter;

// 水平翻转
Filter.prototype.flipHorizontal = function(startX, startY, w, h) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 中轴
  let middleAxle = (w * 4) / 2;

  // 2.遍历每一行作为外循环
  for (let curRow = 0; curRow < h; curRow++) {
    // 每行开始的通道位置
    let aisleStart = curRow * w * 4,
      // 每行结束的通道位置
      aisleEnd = (curRow + 1) * w * 4 - 4;
    // 每一行中轴所在的位置
    let curMiddleAxle = aisleEnd - middleAxle;

    // 3.遍历当前行的列作为内循环,把列的左边像素按照轴对称和右边的像素互换
    for (; aisleStart <= curMiddleAxle; aisleStart += 4, aisleEnd -= 4) {
      // 临时存放
      let tr = imgdata.data[aisleStart],
        tg = imgdata.data[aisleStart + 1],
        tb = imgdata.data[aisleStart + 2],
        ta = imgdata.data[aisleStart + 3];

      imgdata.data[aisleStart] = imgdata.data[aisleEnd];
      imgdata.data[aisleStart + 1] = imgdata.data[aisleEnd + 1];
      imgdata.data[aisleStart + 2] = imgdata.data[aisleEnd + 2];
      imgdata.data[aisleStart + 3] = imgdata.data[aisleEnd + 3];

      imgdata.data[aisleEnd] = tr;
      imgdata.data[aisleEnd + 1] = tg;
      imgdata.data[aisleEnd + 2] = tb;
      imgdata.data[aisleEnd + 3] = ta;
    }
  }

  // 4.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};

// 垂直翻转
Filter.prototype.flipVertical = function Filter(context) {
  this.context = context;
};
Filter.prototype.constructor = Filter;
Filter.prototype.flipVertical = function(startX, startY, w, h) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 中轴
  let middleAxle = Math.floor(h / 2),
    rowAisles = w * 4;

  // 2.遍历总行数一半的每一行作为外循环(向下取整)
  for (var curRow = 0; curRow < middleAxle; curRow++) {
    // 开始的通道位置
    let aisleStart = curRow * rowAisles,
      // 镜像对称的开始位置
      mirrorStart = (h - curRow - 1) * rowAisles;

    // 3.遍历当前行的列作为内循环,把列的每个通道按照水平轴对称和镜像里的通道互换
    for (
      ;
      aisleStart < rowAisles * (curRow + 1);
      aisleStart += 4, mirrorStart += 4
    ) {
      var tr = imgdata.data[aisleStart],
        tg = imgdata.data[aisleStart + 1],
        tb = imgdata.data[aisleStart + 2],
        ta = imgdata.data[aisleStart + 3];

      imgdata.data[aisleStart] = imgdata.data[mirrorStart];
      imgdata.data[aisleStart + 1] = imgdata.data[mirrorStart + 1];
      imgdata.data[aisleStart + 2] = imgdata.data[mirrorStart + 2];
      imgdata.data[aisleStart + 3] = imgdata.data[mirrorStart + 3];

      imgdata.data[mirrorStart] = tr;
      imgdata.data[mirrorStart + 1] = tg;
      imgdata.data[mirrorStart + 2] = tb;
      imgdata.data[mirrorStart + 3] = ta;
    }
  }

  // 4.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};

// 反相
Filter.prototype.inversion = function()