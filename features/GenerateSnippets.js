const vscode = require('vscode');
const find = require('find');
const fs = require('fs');
function createNameSnippets() {
    let filee = {}, mapping = {};
    if(vscode.workspace.workspaceFolders !== undefined) {
        let wf = vscode.workspace.workspaceFolders[0].uri.path ;
        find.eachfile(/\.php$/, wf, function(files){
            try {
                if (files.includes("vendor/magento") || files.includes("app/code")) {
                    let prefix = getNamespace(files);
                    if (prefix !== undefined) {
                        let snippet = {
                            prefix: prefix,
                            body: prefix
                        };
                        filee[prefix] = snippet;
                        mapping[prefix] = files;
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }).end(function(){
            const data = JSON.stringify(filee, null, "\t"), map = JSON.stringify(mapping, null, "\t");
            fs.writeFile(__dirname + '/files/magento.json', data, (err) => {
                if (err) throw err;
            });
            fs.writeFile(__dirname + '/files/mapping.json', map, (err) => {
                if (err) throw err;
            });
        }).error(function(err) {
            if (err) vscode.window.showInformationMessage(err);
        });
    }
}
function getNamespace(fileName) {
    let namespace, path, classname;
    let data = fs.readFileSync(fileName, 'utf8');
    let lines = data.split(/\r?\n/);
    lines.every((line) => {
        if (line.includes('namespace')) {
            let lineArray = line.split(" ");
            if (lineArray[0] === "namespace") {
                namespace = line.replace('namespace ', '');
                return false;
            }
        }
        return true;
    });

    if (namespace !== undefined) {
        path = namespace.slice(0, -1);
        classname = fileName.split("/").pop().replace(".php", "");
        return path+"\\"+classname;
    }
}
exports.createNameSnippets = createNameSnippets;