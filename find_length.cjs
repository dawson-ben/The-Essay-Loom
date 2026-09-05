const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('useState') && content.includes('.length')) {
        console.log(`\n--- ${f} ---`);
        const lines = content.split('\n');
        lines.forEach((l, i) => {
            if (l.includes('useState')) {
                console.log(`${i+1}: ${l}`);
                for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
                    console.log(`${j+1}: ${lines[j]}`);
                    if (lines[j].includes('.length')) console.log(`   *** FOUND LENGTH ***`);
                    if (lines[j].includes(')')) break; // simple heuristic
                }
            }
        });
    }
});
