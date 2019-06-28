var VSHADER_SOURCE = `
void main(){
    gl_Position = vec4(0.0,0.0,1.0,1);//设置坐标
    gl_PointSize = 10.0;//设置点的尺寸
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

    //绘制一个点
    gl.drawArrays(gl.POINTS,0, 1);

}
main();