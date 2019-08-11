/*
 * 实际权重(令结果权重总和为1)
 */
const weightingFactor = function(arr) {
  var newarr = [];
  var account = 0;
  for (var i = 0; i < arr.length; i++) {
    var val = GaussianDistribution(arr[i][0], arr[i][1], 1.5, 1.5);
    account += val;
    newarr.push(val);
  }
  for (var j = 0; j < newarr.length; j++) {
    newarr[j] /= account;
  }
  return newarr;
};

/*
 * 创建以当前点为原点，半径为X的方阵数组
 */
const createMartixArray = function(num) {
  var arr = [];
  for (var rows = -num; rows <= num; rows++) {
    for (var cols = -num; cols <= num; cols++) {
      arr.push([rows, cols]);
    }
  }
  return arr;
};

/*
 * 权重计算得到的值
 */
const weightingFactorValue = function(arrsource, arrvalue) {
  if (!arrvalue instanceof Array) {
    throw "nedd an array";
  }
  var valuelen = arrvalue.length;
  var sourcelen = arrsource.length;
  // 如果像素点不足，则以附近点补上
  if (valuelen < sourcelen) {
    for (var k = 0; k < Math.abs(valuelen - sourcelen); k++) {
      var ran = Math.floor(Math.random() * valuelen);
      arrvalue.push(arrvalue[ran]);
    }
  }
  var val = 0;
  for (var i = 0; i < sourcelen; i++) {
    val += arrvalue[i] * arrsource[i];
  }
  return parseInt(val);
};

/*
 * 二维正态分布
 */
const GaussianDistribution = function(x, y, o1, o2, u1 = 0, u2 = 0, p = 0) {
  if (arguments.length < 4) {
    throw "参数长度至少4个！";
  } else {
    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] !== "number") {
        throw "请确保参数类型为数字！";
      }
    }
  }
  return (
    (1 / (2 * Math.PI * o1 * o2 * Math.sqrt(1 - Math.pow(p, 2)))) *
    Math.exp(
      (-1 / (2 * (1 - Math.pow(p, 2)))) *
        (Math.pow(x - u1, 2) / Math.pow(o1, 2) -
          ((2 * p * (x - u1) * (y - u2)) / 2) * o1 * o2 +
          Math.pow(y - u2, 2) / Math.pow(o2, 2))
    )
  );
};
