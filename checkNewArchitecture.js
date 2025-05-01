const fs = require('fs');
const path = require('path');

console.log('Checking New Architecture configuration...');

// Check app.json for newArchEnabled
const appJsonPath = path.join(__dirname, 'app.json');
if (fs.existsSync(appJsonPath)) {
  let appJsonContent = fs.readFileSync(appJsonPath, 'utf8');
  let appJson;
  
  try {
    appJson = JSON.parse(appJsonContent);
    
    // Check if newArchEnabled is set
    if (appJson.expo && appJson.expo.newArchEnabled === true) {
      console.log('✅ New Architecture is already enabled in app.json');
    } else {
      // Add newArchEnabled to app.json
      if (appJson.expo) {
        appJson.expo.newArchEnabled = true;
        fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2), 'utf8');
        console.log('✅ Added newArchEnabled: true to app.json');
      } else {
        console.error('❌ Invalid app.json structure: expo key not found');
      }
    }
  } catch (error) {
    console.error('❌ Error parsing app.json:', error);
  }
} else {
  console.error('❌ app.json not found');
}

// Check babel.config.js for Reanimated plugin
const babelConfigPath = path.join(__dirname, 'babel.config.js');
if (fs.existsSync(babelConfigPath)) {
  let babelConfigContent = fs.readFileSync(babelConfigPath, 'utf8');
  
  if (babelConfigContent.includes('react-native-reanimated/plugin')) {
    console.log('✅ Reanimated plugin is already configured in babel.config.js');
  } else {
    console.log('❌ Reanimated plugin not found in babel.config.js');
    console.log('Please add "react-native-reanimated/plugin" to the plugins array in babel.config.js');
  }
} else {
  console.error('❌ babel.config.js not found');
}

// Check metro.config.js
const metroConfigPath = path.join(__dirname, 'metro.config.js');
if (fs.existsSync(metroConfigPath)) {
  console.log('✅ metro.config.js exists');
} else {
  console.error('❌ metro.config.js not found');
  console.log('Please create a metro.config.js file with proper configuration for the New Architecture');
}

console.log('\nNew Architecture check completed!');
console.log('If any issues were found, please fix them and restart your app with:');
console.log('npm run start-clean');
