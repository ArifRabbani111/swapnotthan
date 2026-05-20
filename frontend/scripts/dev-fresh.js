const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = path.join(__dirname, '..');
const lockPath = path.join(rootDir, '.next', 'dev', 'lock');

function removeLock() {
  try {
    if (fs.existsSync(lockPath)) {
      fs.unlinkSync(lockPath);
      console.log('[dev:fresh] Removed stale .next/dev/lock');
      return true;
    }
  } catch (e) {
    console.warn('[dev:fresh] Could not remove lock:', e.message);
    return false;
  }
  return true;
}

// Remove lock (retry once after short delay if still held)
removeLock();
setTimeout(() => {
  removeLock();
  const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next');
  const child = spawn('node', [nextBin, 'dev'], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  });
  child.on('exit', (code) => process.exit(code || 0));
}, 300);
