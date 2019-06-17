// x· = x cos b - y sin b;
// y· = x sin b - y cos b;
// z· = z

var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform float u_CosB, u_SinB;
void main(){
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y* u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
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
    //获取u_CosB 和 u_SinB变量的地址
    var u_CosB = gl.getUniformLocation(gl.program, "u_CosB");
    var u_SinB = gl.getUniformLocation(gl.program, "u_SinB");
    //计算旋转数据
    var radian = Math.PI * 230 /180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    gl.uniform1f(u_CosB,cosB);
        gl.uniform1f(u_SinB,sinB);
    

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
