var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main(){
    gl_Position = a_Position;//设置坐标
    gl_PointSize = a_PointSize;//设置点大小
}
`;
var FSHADER_SOURCE = `void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
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
    // gl.drawArrays(gl.TRIANGLES,0,n);
    // gl.drawArrays(gl.LINES, 0, n);
    // gl.drawArrays(gl.LINE_STRIP, 0, n);
    gl.drawArrays(gl.POINTS, 0, n);


}
function initVertexBuffers(gl) {
    //顶点数组
    var verticeSizes = new Float32Array([
        0.0,0.5,10.0,
        -0.5,-0.5,20.0,
        0.5,-0.5,30.0
    ]);
    var n = 3;//点的个数
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log(`Failed to create the buffer object`);
        return - 1;
    }
    //将缓冲区对象绑定到目标缓冲区中，分 gl.ARRAY_BUFFER 、 gl.ELEMENT_ARRAY_BUFFER 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticeSizes, gl.STATIC_DRAW);
    const FSIZE = verticeSizes.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');

    //将缓冲区对象分配给 a_Position 变量 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*3,0);

    //连接a_Position 变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    //将顶点尺寸写入缓冲区并开启缓冲区
    
    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*3,FSIZE*2);
    gl.enableVertexAttribArray(a_PointSize);
    return n;
}

main();
