var VSHADER_SOURCE = `
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;//设置坐标
    gl_PointSize = 10.0;//设置点的尺寸
}
`;
var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main(){
        gl_FragColor = u_FragColor;
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
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log(`Failed to initialize shaders`);
        return;
    }
    //获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");

    if (a_Position < 0) {
        console.log(`Failed to get the storage location of a_Position`);
    }
    //获取u_FragColor变量的存储位置
    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

    let isDown = false;
    var throttledDrawPoint = mthrottle(click, 100);
    canvas.onmousedown = function (ev) {
        throttledDrawPoint(ev, gl, canvas, a_Position,u_FragColor);
        isDown = true;
    }
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


}
var g_points = []; // The array for the position of a mouse press
var g_colors = [];//存储点颜色的数组
function click(ev, gl, canvas, a_Position,u_FragColor) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    // Store the coordinates to g_points array
    //   g_points.push(x); g_points.push(y);
    //存储点到数组
    g_points.push([x, y]);
    //存储颜色到数组
    if(x>=0.0&&y>=0.0){
        //第一象限
        g_colors.push([1.0,0.0,0.0,1.0]);//红色
    }else if(x<0.0&&y<0.0){
        //第三象限
        g_colors.push([0.0,1.0,0.0,1.0]);//绿色
    }else {
        //其他象限
        g_colors.push([1.0,1.0,1.0,1.0]);//白色
    }
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i ++) {
        // Pass the position of a point to a_Position variable
        var rgba =  g_colors[i];
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
        gl.uniform4f(u_FragColor,rgba[0], rgba[1], rgba[2], rgba[3])

        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
main();