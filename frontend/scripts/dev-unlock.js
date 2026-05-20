const fs = require('fs');
const path = require('path');

const lockPath = path.join(__dirname, '..', '.next', 'dev', 'lock');
try {
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
    console.log('Removed .next/dev/lock. You can run "npm run dev" now.');
  } else {
    console.log('No lock file found. Run "npm run dev" or "npm run dev:fresh".');
  }
} catch (e) {
  console.error('Could not remove lock:', e.message);
  console.error('Stop any running "next dev" (Ctrl+C), then run: npm run dev:unlock');
  process.exit(1);
}
