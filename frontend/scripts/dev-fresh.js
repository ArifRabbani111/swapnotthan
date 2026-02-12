const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const lockPath = path.join(__dirname, '..', '.next', 'dev', 'lock');
try {
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
    console.log('Removed stale .next/dev/lock');
  }
} catch (e) {
  console.warn('Could not remove lock:', e.message);
}

const child = spawn('npx', ['next', 'dev'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
});
child.on('exit', (code) => process.exit(code || 0));
