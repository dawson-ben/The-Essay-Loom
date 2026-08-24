const fs = require('fs');
let code = fs.readFileSync('src/firebase.ts', 'utf8');

code = code.replace(/getFirestore/g, 'initializeFirestore');
code = code.replace(/initializeFirestore\(app, \(firebaseConfig as any\)\.firestoreDatabaseId\)/, 'initializeFirestore(app, { experimentalForceLongPolling: true }, (firebaseConfig as any).firestoreDatabaseId)');

fs.writeFileSync('src/firebase.ts', code);
