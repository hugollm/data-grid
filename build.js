var exec = require('child_process').execSync;
var fs = require('fs');

main();

function main()
{
    clearBuildDirectory();
    var bundleName = buildAndGetBundleName();
    copyStaticDirectory();
    injectBundleNameOnIndex(bundleName);
}

function clearBuildDirectory()
{
    exec('rm -rf build/*');
}

function buildAndGetBundleName()
{
    var jsonString = exec('BUILD=1 webpack --json', {encoding: 'utf-8'});
    var json = JSON.parse(jsonString);
    var bundleName = json.assetsByChunkName.main;
    return bundleName;
}

function copyStaticDirectory()
{
    exec('cp -r static/* build');
}

function injectBundleNameOnIndex(bundleName)
{
    var indexFile = 'build/index.html';
    fs.readFile(indexFile, 'utf8', function (error, fileContents) {
        var newFileContents = fileContents.replace(/bundle\.js/g, bundleName);
        fs.writeFile(indexFile, newFileContents);
    });
}
