const installer = require('electron-installer-windows')

const options = {
  src: 'out/driftr-win32-x64/',
  dest: 'installers',
  icon: "favicon.ico",
  iconNuget: "favicon.ico",
  exe: "driftr.exe",
  name: "DriftR"
}

async function main (options) {
  console.log('Creating package (this may take a while)')
  try {
    await installer(options)
    console.log(`Successfully created package at ${options.dest}`)
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}
main(options)