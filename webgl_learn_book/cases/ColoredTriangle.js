var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = a_Position;//设置坐标
    v_Color = a_Color;
}
`;
var FSHADER_SOURCE = `
precision mediump float;

varying vec4 v_Color;//<- 内插得到的颜色被赋给v_Color
void main(){
    gl_FragColor = v_Color;//<-再赋给gl_FragColor
}`
function main() {
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');
    //获取WebGL上下文
    let gl = getWebGLContext(canvas, true);
    if (!gl) {
        console.log('Faild to get the rendering context for WebGL');
        return;
    }
    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log(`Failed to initialize shaders`);
        return;
    }
    //设置顶点位置
    var n = initVertexBuffers(gl);
    if(n<0){
        console.log(`Failed to set the position of the vertices`);
        return;
    }

    // let isDown = false;
    // var throttledDrawPoint = mthrottle(click,100);
    // canvas.onmousedown = function(ev) {
    //     throttledDrawPoint(ev,gl,canvas,a_Position);
    //     isDown = true;
    // }
    // canvas.onmouseup = function(ev){
    //     isDown = false;
    // }
    // canvas.onmousemove = function(ev){
    //     if(isDown){
    //         throttledDrawPoint(ev,gl,canvas,a_Position);
    //     }
    // }
    //指定 清空 <canvas >的颜色 r , g , b , a(alpha透明度)，默认白色
    gl.clearColor(0.0, 0.0, 0.0, 1);//黑色
    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制3个点
    gl.drawArrays(gl.TRIANGLES,0,n);
    // gl.drawArrays(gl.LINES, 0, n);
    // gl.drawArrays(gl.LINE_STRIP, 0, n);
    // gl.drawArrays(gl.LINE_LOOP, 0, n);


}
function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        //顶点坐标和颜色
        0.0,0.5, 1.0,0.0,0.0,
        -0.5,-0.5, 0.0,1.0,0.0,
        0.5,-0.5, 0.0,0.0,1.0
    ]);
    var n = 3;//点的个数
    //创建顶点颜色缓冲区对象
    var vertexColorBuffer = gl.createBuffer();
    if(!vertexColorBuffer){
        console.log(`Failed to create the buffer object`);
        return - 1;
    }
    //将缓冲区对象绑定到目标缓冲区中，分 gl.ARRAY_BUFFER 、 gl.ELEMENT_ARRAY_BUFFER 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors, gl.STATIC_DRAW);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    var a_Color = gl.getAttribLocation(gl.program,'a_Color');

    //将缓冲区对象分配给 a_Position 变量 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE * 5,0);
    //将缓冲区对象分配给 a_Color 变量
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 5,FSIZE * 2);
    //连接a_Position 变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    //连接a_Color 变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Color);
    //解除绑定
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    return n;
}
main();
