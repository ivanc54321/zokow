import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function getTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

const timestamp = getTimestamp();
const baseRestoreDir = path.join(rootDir, 'restore_points');
const pointDirName = `restore_${timestamp}`;
const targetPointDir = path.join(baseRestoreDir, pointDirName);
const modifiedFilesDir = path.join(targetPointDir, 'modified_files');
const headFilesDir = path.join(targetPointDir, 'original_head_files');
const latestDir = path.join(baseRestoreDir, 'latest');

fs.mkdirSync(modifiedFilesDir, { recursive: true });
fs.mkdirSync(headFilesDir, { recursive: true });

// Get changed files from git
let changedFiles = [];
try {
  const diffNames = execSync('git diff --name-only', { cwd: rootDir, encoding: 'utf-8' });
  changedFiles = diffNames.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
} catch (err) {
  console.error('Error fetching git diff:', err);
}

if (changedFiles.length === 0) {
  console.log('No modified files detected via git diff.');
} else {
  console.log(`Found ${changedFiles.length} modified files to back up:`);
}

// Save diff patch and stats
try {
  const diffPatch = execSync('git diff', { cwd: rootDir, encoding: 'utf-8' });
  fs.writeFileSync(path.join(targetPointDir, 'changes.patch'), diffPatch, 'utf-8');

  const diffStat = execSync('git diff --stat', { cwd: rootDir, encoding: 'utf-8' });
  fs.writeFileSync(path.join(targetPointDir, 'summary.txt'), diffStat, 'utf-8');
} catch (e) {
  console.error('Could not save patch files:', e);
}

// Copy each file
changedFiles.forEach((relPath) => {
  const srcFullPath = path.join(rootDir, relPath);
  const destModPath = path.join(modifiedFilesDir, relPath);
  const destHeadPath = path.join(headFilesDir, relPath);

  fs.mkdirSync(path.dirname(destModPath), { recursive: true });
  fs.mkdirSync(path.dirname(destHeadPath), { recursive: true });

  // Copy working copy (changes made)
  if (fs.existsSync(srcFullPath)) {
    fs.copyFileSync(srcFullPath, destModPath);
  }

  // Extract HEAD version
  try {
    const gitHeadFile = execSync(`git show HEAD:"${relPath.replace(/\\/g, '/')}"`, {
      cwd: rootDir,
      maxBuffer: 10 * 1024 * 1024
    });
    fs.writeFileSync(destHeadPath, gitHeadFile);
  } catch (err) {
    console.warn(`Could not extract HEAD version for ${relPath}`);
  }

  console.log(` - Backed up: ${relPath}`);
});

// Write info README inside target point
const pointReadme = `# Restore Point: ${pointDirName}
Created at: ${new Date().toISOString()}

## Modified Files Backed Up (${changedFiles.length} files)
${changedFiles.map(f => `- \`${f}\``).join('\n')}

## Folder Structure
- **\`modified_files/\`**: Working tree copies of all files with your current changes applied.
- **\`original_head_files/\`**: Original state of these files before changes were made (from git HEAD).
- **\`changes.patch\`**: Standard unified git patch file.
- **\`summary.txt\`**: Change breakdown and diff stats.

## How to Restore
### Option 1: Revert all changes back to original HEAD
\`\`\`bash
git checkout HEAD -- ${changedFiles.join(' ')}
# OR copy files from original_head_files/ back to src/
\`\`\`

### Option 2: Re-apply this restore point's changes
\`\`\`bash
# Copy files from modified_files/ into the project root:
# Or apply the patch:
git apply "restore_points/${pointDirName}/changes.patch"
\`\`\`
`;
fs.writeFileSync(path.join(targetPointDir, 'README.md'), pointReadme, 'utf-8');

// Also update base restore_points/README.md
const baseReadmePath = path.join(baseRestoreDir, 'README.md');
const baseReadme = `# Project Restore Points

This directory contains restore points / snapshots of changes made across the project.

## Available Restore Points
- **[\`${pointDirName}\`](./${pointDirName})** (Created: ${new Date().toLocaleString()})

## How to Create a New Restore Point
Run:
\`\`\`bash
npm run restore-point
\`\`\`
`;
fs.writeFileSync(baseReadmePath, baseReadme, 'utf-8');

console.log(`\nSuccessfully created restore point at: ${targetPointDir}`);
