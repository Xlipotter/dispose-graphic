function Filter(context) {
  this.context = context;
}
Filter.prototype.constructor = Filter;

/*
 * 水平翻转
 */
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

/*
 * 垂直翻转
 */
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

/*
 * 反相
 */
Filter.prototype.inversion = function(startX, startY, w, h) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 图像的总像素
  let pixels = imgdata.data.length;

  // 2.遍历每一个像素
  for (let i = 0; i < pixels; i += 4) {
    // 3.将每个像素的各个通道的数值变成它的补数
    // 当前的r,g,b色值
    let r = imgdata.data[i],
      g = imgdata.data[i + 1],
      b = imgdata.data[i + 2];
    // 反相后的r,g,b色值
    imgdata.data[i] = 255 - r;
    imgdata.data[i + 1] = 255 - g;
    imgdata.data[i + 2] = 255 - b;
  }

  // 4.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};

/*
 * 灰度
 */
Filter.prototype.grayScale = function(startX, startY, w, h) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 图像的总像素
  let pixels = imgdata.data.length;

  // 2.遍历每一个像素
  for (let i = 0; i < pixels; i += 4) {
    // 3.将每个像素的各个通道的数值变成按权的整数法所得的值
    // 当前的r,g,b色值
    let r = imgdata.data[i],
      g = imgdata.data[i + 1],
      b = imgdata.data[i + 2];

    // 计算结果值
    let val = parseInt(r * 0.3 + g * 0.59 + b * 0.11);
    // 反相后的r,g,b色值
    imgdata.data[i] = val;
    imgdata.data[i + 1] = val;
    imgdata.data[i + 2] = val;
  }

  // 4.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};

/*
 * 黑白
 */
Filter.prototype.blackWhite = function(startX, startY, w, h) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 图像的总像素
  let pixels = imgdata.data.length;

  // 2.遍历每一个像素
  for (let i = 0; i < pixels; i += 4) {
    // 3.将每个像素的所有通道的值按权平均,和中性灰的色值进行对比
    // 当前的r,g,b色值
    let r = imgdata.data[i],
      g = imgdata.data[i + 1],
      b = imgdata.data[i + 2];

    // 计算结果值
    let val = parseInt(r * 0.3 + g * 0.59 + b * 0.11) >= 128 ? 255 : 0;
    // 黑白后的r,g,b色值
    imgdata.data[i] = val;
    imgdata.data[i + 1] = val;
    imgdata.data[i + 2] = val;
  }

  // 4.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};

/*
 * 浮雕
 */
Filter.prototype.relief = function(startX, startY, w, h) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 图像的总像素
  let pixels = imgdata.data.length;

  // 2.遍历每一个像素
  for (var i = 0, j = 4; i < pixels; i += 4, j += 4) {
    if (j > pixels) {
      j = pixels - 4;
    }
    // 3.把相邻像素的同个通道进行差值运算,再加上中性灰的色值
    let r = Math.abs(imgdata.data[i] - imgdata.data[j] + 128),
      g = Math.abs(imgdata.data[i + 1] - imgdata.data[j + 1] + 128),
      b = Math.abs(imgdata.data[i + 2] - imgdata.data[j + 2] + 128);

    // 4.把结果通道的值进行求和并按权平均作为最终通道的值
    let val = parseInt(r * 0.3 + g * 0.59 + b * 0.11);
    imgdata.data[i] = val;
    imgdata.data[i + 1] = val;
    imgdata.data[i + 2] = val;
  }

  // 5.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};

/*
 * 高斯模糊
 */
Filter.prototype.gaussianBlur = function(startX, startY, w, h, R = 1) {
  // 1.获取图像信息
  let imgdata = this.context.getImageData(startX, startY, w, h);
  // 图像的通道集合
  var pxInfo = imgdata.data;
  // 处理后的图像信息
  var newImgData = [];

  // 2.根据模糊半径求得周边每个点的权重
  var weightingfactor = weightingFactor(createMartixArray(R));

  // 3.遍历每一行
  for (let curRow = 0; curRow < h; curRow++) {
    // 4.在当前行内遍历列的每个点
    for (let curCol = 0; curCol < w; curCol++) {
      // 5.在当前点遍历周边所有像素点,以通道作为新的集合
      var calDataR = [], // 周围红通道的集合
        calDataG = [], // 周围绿通道的集合
        calDataB = [], // 周围蓝通道的集合
        calDataA = []; // 周围Alpha通道的集合
      // 获取周边像素信息的行
      for (let i = -Math.abs(R); i <= Math.abs(R); i++) {
        if (curRow + i < 0 || curRow + i >= h) {
          // 若超出行边界，跳过
          continue;
        }
        // 获取周边像素所有通道的集合
        for (let j = -Math.abs(R); j <= Math.abs(R); j++) {
          if (curCol + j < 0 || curCol + j >= w) {
            // 若超出列边界，跳过
            continue;
          }
          var index = ((curRow + i) * w + curCol + j) * 4;
          calDataR.push(pxInfo[index]);
          calDataG.push(pxInfo[index + 1]);
          calDataB.push(pxInfo[index + 2]);
          calDataA.push(pxInfo[index + 3]);
        }
      }

      // 6.对每个通道进行权重值的计算
      imgdata.data[(curRow * w + curCol) * 4] = weightingFactorValue(
        weightingfactor,
        calDataR
      );
      imgdata.data[(curRow * w + curCol) * 4 + 1] = weightingFactorValue(
        weightingfactor,
        calDataG
      );
      imgdata.data[(curRow * w + curCol) * 4 + 2] = weightingFactorValue(
        weightingfactor,
        calDataB
      );
      imgdata.data[(curRow * w + curCol) * 4 + 3] = weightingFactorValue(
        weightingfactor,
        calDataA
      );
    }
  }

  // 7.把处理后的像素信息放回画布
  this.context.clearRect(startX, startY, w, h);
  this.context.putImageData(imgdata, startX, startY);
};
