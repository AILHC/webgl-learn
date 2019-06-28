// x· = x cos b - y sin b;
// y· = x sin b - y cos b;
// z· = z

var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform mat4 u_xformMatrix;
void main(){
    gl_Position = u_xformMatrix * a_Position;
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
    //获取u_xformMatrix变量的地址
    var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");
    //计算旋转数据
    var radian = Math.PI * 180 /180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    //注意：WebGL中矩阵是列主序 旋转矩阵
    var xformMatrix = new Float32Array([
        cosB,sinB,0.0,0.0,
        -sinB,cosB,0.0,0.0,
        0.0,0.0,1.0,0.0,
        0.0,0.0,0.0,1.0
    ]); 
    var tX = 0.5,tY = 0.5,tZ= 0.5;
    //平移矩阵
    // var xformMatrix = new Float32Array([
    //     1.0,0.0,0.0,0.0,
    //     0.0,1.0,0.0,0.0,
    //     0.0,0.0,1.0,0.0,
    //     tX,tY,tZ,1.0
    // ]); 
    var sX = 0.5,sY = 0.5,sZ= 0.5;
    //旋转矩阵
    // var xformMatrix = new Float32Array([
    //     sX,0.0,0.0,0.0,
    //     0.0,sY,0.0,0.0,
    //     0.0,0.0,sZ,0.0,
    //     0.0,0.0,0.0,1.0
    // ]); 
    /**
     * //对应的是,按列主序就是说，这个二维矩阵在一维数组的顺序,
     * 按列数，从左到右，从上到下数 cosB -> sinB -> 0 -> 0 ->  -sinB -> cosB -> 0 -> 0 ->0
     * [cosB -sinB 0  0 ]
     * [sinB cosB  0  0 ]
     * [0    0     1  0 ]
     * [0    0     0  1 ]
     */
    gl.uniformMatrix4fv(u_xformMatrix, false,xformMatrix);

    // let isDown = false;
    // var throttledDrawPoint = mthrottle(click,100);
    canvas.onmousedown = function(ev) {
        
        
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
main();
