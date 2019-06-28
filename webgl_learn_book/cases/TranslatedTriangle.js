var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform vec4 u_Translation;
void main(){
    gl_Position = a_Position+u_Translation;//设置坐标
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
    //获取平移量变量u_Translation 的地址
    var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
    gl.uniform4f(u_Translation, 0.5, 0.5, 0.0, 0.0);

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
    //绘制n个点
    gl.drawArrays(gl.TRIANGLES, 0, n);



}
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
    ]);
    var n = vertices.length/2;//点的个数
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log(`Failed to create the buffer object`);
        return - 1;
    }
    //将缓冲区对象绑定到目标缓冲区中，分 gl.ARRAY_BUFFER 、 gl.ELEMENT_ARRAY_BUFFER 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW);
    
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');

    //将缓冲区对象分配给 a_Position 变量 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    //连接a_Position 变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}
var g_points = []; // The array for the position of a mouse press
function click(ev, gl, canvas, a_Position) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect() ;

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  // Store the coordinates to g_points array
  g_points.push(x); g_points.push(y);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i = 0; i < len; i += 2) {
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
main();
