const { spawn } = require('child_process');
const fs = require('fs');
const log = fs.openSync('/home/z/my-project/dev.log', 'a');

const child = spawn('bun', ['run', 'dev'], {
  cwd: '/home/z/my-project',
  stdio: [log, log, log],
  detached: true,
});

child.unref();

// Write PID for tracking
fs.writeFileSync('/home/z/my-project/.dev-server.pid', child.pid.toString());

console.log(`Server started with PID ${child.pid}`);
