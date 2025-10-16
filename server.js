const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Decode the URL to handle special characters
  let filePath = decodeURIComponent(req.url);
  
  // Default to index.html for root path
  if (filePath === '/') {
    filePath = '/index.html';
  }

  // Build the full file path
  const fullPath = path.join(__dirname, filePath);

  // Get file extension
  const extname = String(path.extname(fullPath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(fullPath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\x1b[32m✅ ESTMJS Dev Server running at:\x1b[0m`);
  console.log(`\x1b[36m   http://localhost:${PORT}\x1b[0m`);
  console.log(`\x1b[33m   Press Ctrl+C to stop\x1b[0m\n`);
});
