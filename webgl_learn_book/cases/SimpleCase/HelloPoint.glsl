//vs
void main(){
    gl_Position = vec4(0.0,0.0,0.0,1.0);//设置坐标
    gl_PointSize = 10.0;//设置点的尺寸
}
//ps
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
