var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;

void main(){
    gl_Position = a_Position;//设置坐标
    v_TexCoord = a_TexCoord;
}
`;
var FSHADER_SOURCE = `
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main(){
    gl_FragColor = texture2D(u_Sampler,v_TexCoord);//<-再赋给gl_FragColor
}`;
function main() {
    // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Set texture
  if (!initTextures(gl, n)) {
    console.log('Failed to intialize the texture.');
    return;
  }


}
function initVertexBuffers(gl) {
    var verticesTexCoords = new Float32Array([
        //顶点坐标和颜色
        -0.5, 0.5, 0.0, 1.0,
        -0.5,-0.5, 0.0, 0.0,
         0.5, 0.5, 1.0, 1.0,
         0.5,-0.5, 1.0, 0.0
    ]);
    var n = 4;//点的个数
    //创建缓冲区对象
    var vertexTexCoordBuffer = gl.createBuffer();
    if(!vertexTexCoordBuffer){
        console.log(`Failed to create the buffer object`);
        return - 1;
    }
    //将顶点坐标和纹理坐标写入缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);

    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticesTexCoords, gl.STATIC_DRAW);
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    var a_TexCoord = gl.getAttribLocation(gl.program,'a_TexCoord');

    //将缓冲区对象分配给 a_Position 变量 
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE * 4,0);
    //将缓冲区对象分配给 a_Color 变量
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE * 4,FSIZE * 2);
    //连接a_Position 变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    //连接a_Color 变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_TexCoord);
    //解除绑定
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    return n;
}
function initTextures(gl,n) {
    var texture = gl.createTexture();
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    var image = new Image();
    image.onload = function(){
        loadTexture(gl,n,texture,u_Sampler,image);
    }
    image.src = '../../resources/sky.jpg';
    return true;
}
function loadTexture(gl,n,texture,u_Sampler,image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//对纹理图像进行y轴翻转》？？？？
    //开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    //向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
//   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);
    //配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
    //将0号纹理传递给着色器
    gl.uniform1i(u_Sampler,0);

    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
}
main();
