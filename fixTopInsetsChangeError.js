const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting fix for topInsetsChange error...');

// Clear cache
console.log('Clearing cache...');
try {
  // Clear node_modules/.cache
  const cachePath = path.join(__dirname, 'node_modules', '.cache');
  if (fs.existsSync(cachePath)) {
    fs.rmSync(cachePath, { recursive: true, force: true });
    console.log('Successfully cleared node_modules/.cache');
  }

  // Clear .expo
  const expoPath = path.join(__dirname, '.expo');
  if (fs.existsSync(expoPath)) {
    fs.rmSync(expoPath, { recursive: true, force: true });
    console.log('Successfully cleared .expo');
  }
} catch (error) {
  console.error('Error clearing cache:', error);
}

// Add LogBox.ignoreLogs to App.js if not already present
console.log('Checking App.js for LogBox.ignoreLogs...');
const appJsPath = path.join(__dirname, 'App.js');
if (fs.existsSync(appJsPath)) {
  let appJsContent = fs.readFileSync(appJsPath, 'utf8');
  
  // Check if LogBox is imported
  if (!appJsContent.includes('LogBox')) {
    appJsContent = appJsContent.replace(
      /import React/,
      "import React from 'react';\nimport { LogBox } from 'react-native'"
    );
    console.log('Added LogBox import to App.js');
  }
  
  // Check if topInsetsChange error is ignored
  if (!appJsContent.includes('topInsetsChange')) {
    // Find a good place to add the LogBox.ignoreLogs
    if (appJsContent.includes('LogBox.ignoreLogs')) {
      // Add to existing LogBox.ignoreLogs
      appJsContent = appJsContent.replace(
        /LogBox\.ignoreLogs\(\[([\s\S]*?)\]\)/,
        (match, p1) => {
          if (p1.includes('topInsetsChange')) {
            return match; // Already there
          }
          return `LogBox.ignoreLogs([${p1}${p1.trim() ? ',' : ''}\n  'Unsupported top level event type "topInsetsChange" dispatched'\n])`;
        }
      );
    } else {
      // Add new LogBox.ignoreLogs
      appJsContent = appJsContent.replace(
        /(import.*?;(\r?\n)*)+/,
        (match) => `${match}\n// Ignore specific warnings\nLogBox.ignoreLogs(['Unsupported top level event type "topInsetsChange" dispatched']);\n`
      );
    }
    console.log('Added topInsetsChange to LogBox.ignoreLogs in App.js');
  }
  
  fs.writeFileSync(appJsPath, appJsContent, 'utf8');
}

// Add GestureHandlerRootView if not already present
console.log('Checking for GestureHandlerRootView...');
if (fs.existsSync(appJsPath)) {
  let appJsContent = fs.readFileSync(appJsPath, 'utf8');
  
  // Check if GestureHandlerRootView is imported
  if (!appJsContent.includes('GestureHandlerRootView')) {
    appJsContent = appJsContent.replace(
      /import React/,
      "import React from 'react';\nimport { GestureHandlerRootView } from 'react-native-gesture-handler'"
    );
    console.log('Added GestureHandlerRootView import to App.js');
  }
  
  // Check if GestureHandlerRootView is used
  if (!appJsContent.includes('<GestureHandlerRootView')) {
    // Find the root component and wrap it with GestureHandlerRootView
    appJsContent = appJsContent.replace(
      /<(SafeAreaProvider|View|NavigationContainer)([^>]*)>/,
      '<GestureHandlerRootView style={{ flex: 1 }}>\n      <$1$2>'
    );
    
    // Find the closing tag of the root component and add the closing GestureHandlerRootView
    appJsContent = appJsContent.replace(
      /<\/(SafeAreaProvider|View|NavigationContainer)>(\s*)(}|;|export)/,
      '</$1>\n    </GestureHandlerRootView>$2$3'
    );
    
    console.log('Added GestureHandlerRootView wrapper to App.js');
  }
  
  fs.writeFileSync(appJsPath, appJsContent, 'utf8');
}

console.log('Fix completed! Please restart your Expo app with:');
console.log('npm run start-clean');
