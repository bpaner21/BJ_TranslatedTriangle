// TranslatedTriangle.js

// Vertex shader program
// Declares a new vec4 and assigns it to gl_Position
// Because a_Position has only been declared
// a_Position and gl_Position have a default value of (0,0,0,1)
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform vec4 u_Translation;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position + u_Translation;\n' +
    '}\n';

// Fragment shader program
// Sets the color of the shader to red, with full opacity
var FSHADER_SOURCE =
    'void main() {\n' +
    ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +	// Set the color
    '}\n';

// The translation distance for x, y, and z direction
var Tx = 0.5, Ty = 0.5, Tz = 0.0;

function main()
{
    // Retrieve <canvas> element 
    // Initilializes the variable 'canvas' as equal to the canvas element 'webgl' form the .html page
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    // Initializes the rendering context for this program as a canvas
    // This helps the program determine whether to use 2D or 3D drawing techniques
    var gl = getWebGLContext(canvas);
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL.');
        return;
    }               // Validates that the context was properly acquired

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE))
    {
        console.log('Failed to initialize shaders.');
        return;
    }

    // Set the positions of the vertices
    var n = initVertexBuffers(gl);
    if (n < 0)
    {
        console.log('Failed to set the positions of the vertices.');
    }

    // Pass the translation distance to the vertex shader
    var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
    if (u_Translation < 0)
    {
        console.log('Failed to pass the translation distance to the vertex shader.');
        return;
    }               // Validates that the translation distance was properly acquired

    gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);

    // Set the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw a triangle
    gl.drawArrays(gl.TRIANGLES, 0, n);	// n is 3

}   // main()

function initVertexBuffers(gl)
{
    var vertices = new Float32Array([0.0, 0.5,      -0.5, -0.5,     0.5, -0.5]);
    var n = 3;	// The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer)
    {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Get the storage location of attribute variable
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;

}   // initVertixBuffers()