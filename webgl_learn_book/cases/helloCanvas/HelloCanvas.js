function main() {
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');
    //获取WebGL上下文
    let gl = getWebGLContext(canvas,true);
    if(!gl){
        console.log('Faild to get the rendering context for WebGL');
        return;
    }
    //指定 清空 <canvas >的颜色 r , g , b , a(alpha透明度)，默认白色
    gl.clearColor(0.0, 0.0, 0.0, 1);//黑色
    // gl.clearColor(1.0, 0.0, 0.0, 1.0);//红色
    // gl.clearColor(0.0, 1.0, 0.0, 1.0);//绿色
    // gl.clearColor(0.0, 0.0, 1.0, 1.0);//蓝色
    // gl.clearColor(1.0, 1.0, 0.0, 1.0);//黄色
    // gl.clearColor(1.0, 0.0, 1.0, 1.0);//紫色
    // gl.clearColor(0.0, 1.0, 1.0, 1.0);//青色
    // gl.clearColor(1.0, 1.0, 1.0, 1.0);//白色
    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.clearDepth(depth)//指定清空深度缓冲区的值 默认 1.0
    // gl.clearStencil(s)//指定清空模版缓冲区的值 ， 默认 0
    // gl.DEPTH_BUFFER_BIT  //指定深度缓冲区
    // gl.COLOR_BUFFER_BIT   //指定颜色缓冲区
    // gl.STENCIL_BUFFER_BIT  // 指定模版缓冲区  
    //可以 用位操作符来指定多个缓冲区  如：gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT

}