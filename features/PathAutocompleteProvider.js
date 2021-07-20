const find = require("find");
const vs = require("vscode");
const fs = require("fs");
const eventsList = require("./EventsList");
const schemaList = require("./DbSchema");
const layoutList = require("./Layouts");
const configList = require("./Configurations");
class PathAutocomplete {
    provideCompletionItems(document, position, token) {
        try {
            var documentText = document.getText();
            this.documentText = documentText;
            
            let cItems = this.shouldProvide().map((func) => {
                let completeIt = new vs.CompletionItem(String(func));
                completeIt.kind = vs.CompletionItemKind.Function;
                return completeIt;
            })
            return cItems;            
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    shouldProvide() {
        let constructor = [], abbr = [], startKey = '', endKey = '';
        if (this.documentText.includes("function __construct") && this.documentText.includes(") {")) {
            let lines = this.documentText.split(/\r?\n/);
            lines.every((line, index) => {
                if (line.includes("use")) {
                    let n = line.split(" ");
                    if (n.length == 2) {
                        let val = n[1].slice(0, -1), c = n[1].split('\\'),
                        key = c[c.length - 1].slice(0, -1);
                        abbr[key] = val;  
                    } else if (n.length == 4) {
                        abbr[n[3].slice(0, -1)] = n[1];
                    }
                }

                if (line.includes("function __construct")) {
                    startKey = index;
                }

                if (line.includes(") {")) {
                    endKey = index;
                }

                if (endKey === '') {
                    if (startKey !== '') {
                        constructor.push(line);
                    }
                    return true;
                } else {
                    return false;
                }
            })
        }	    
        constructor.shift();
        if (constructor.length) {
            let objects = this.manageClassVariables(constructor, abbr);
            objects = this.getFilePaths(objects);
            return objects;
        }
        return false;
    }
    manageClassVariables(constructor, abbr) {
        let objects = [];
        constructor.forEach(element => {
            let cn = element.split(" "),
            classname = cn[cn.length - 2];
            if (abbr[classname] !== undefined) {
                if (abbr[classname].charAt(0) === "\\") {
                    objects.push(abbr[classname].substring(1));
                } else {
                    objects.push(abbr[classname]);
                }
            } else {
                if (classname.charAt(0) === "\\") {
                    objects.push(classname.substring(1));
                } else {
                    objects.push(classname);
                }
            }
        });

        return objects;
    }
    getFilePaths(objects) {
        let filee = [], arranged = [], self = this;
        let data = fs.readFileSync(__dirname + '/files/mapping.json');
        data = JSON.parse(data);
        objects.forEach(element => {
            if (element.includes('Factory')) element = element.replace('Factory', '');
            if (data[element] !== undefined) filee.push(self.getClassMethods(String(data[element])));
        });
        filee.forEach(element => {
            element.forEach(e => {
                arranged.push(e);
            });
        });
        return arranged;
    }
    getClassMethods (filepath) {
        let data = fs.readFileSync(filepath, 'utf8'), lines = data.split(/\r?\n/), functionsArray = [];
        lines.every((line) => {
            if (line.includes('public function') || line.includes('protected function') || line.includes('abstract function')) {
                let lineArray = line.split(" ");
                lineArray = lineArray.filter((ele) => {
                    return ele !== '' && ele !== 'public' && ele !== 'protected' && ele !== 'abstract' && ele !== 'function' && ele !== '__construct(';
                });

                if (lineArray.length) {
                    functionsArray.push(lineArray.join(' '));
                }
            }
            return true;
        });
        return functionsArray;
    }
    getNamespace(fileName)
    {
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
}
class EventsAutocomplete {
    provideCompletionItems(document, position) {
        try {
            let currentLine = document.getText(document.lineAt(position).range), el = [];
            
            if (currentLine.includes('event')) {
                el = eventsList.getList().map((event) => {
                    let completeIt = new vs.CompletionItem(String(event));
                    completeIt.kind = vs.CompletionItemKind.Event;
                    return completeIt;
                })
            }
            return el;            
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}
class DbschemaAutocomplete {
    provideCompletionItems(document, position) {
        try {
            let fileName = document.fileName,
            currentLine = document.getText(document.lineAt(position).range), el = [];
            
            if (fileName.includes('db_schema.xml')) {
                if (currentLine.includes('column')) {
                    el = schemaList.getColumns().map((obj) => {
                        let completeIt = new vs.CompletionItem(String(obj.name));
                        completeIt.kind = vs.CompletionItemKind.Field;
                        completeIt.insertText = obj.value;
                        return completeIt;
                    })
                } else if (currentLine.includes('constraint')) {
                    el = schemaList.getConstraints().map((obj) => {
                        let completeIt = new vs.CompletionItem(String(obj.name));
                        completeIt.kind = vs.CompletionItemKind.Field;
                        completeIt.insertText = obj.value;
                        return completeIt;
                    })
                } else if (currentLine.includes('table')) {
                    el = schemaList.getTable().map((obj) => {
                        let completeIt = new vs.CompletionItem(String(obj.name));
                        completeIt.kind = vs.CompletionItemKind.Field;
                        completeIt.insertText = obj.value;
                        return completeIt;
                    })
                } else {
                    el = schemaList.getTypes().map((type) => {
                        let completeIt = new vs.CompletionItem(String(type));
                        completeIt.kind = vs.CompletionItemKind.Keyword;
                        return completeIt;
                    })
                }
            }
            return el;            
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}
class LayoutAutocomplete {
    provideCompletionItems(document, position) {
        try {
            let fileName = document.fileName, el = [];
            
            if (fileName.includes('layout')) {
                el = layoutList.getTypes().map((obj) => {
                    let completeIt = new vs.CompletionItem(String(obj.name));
                    completeIt.kind = vs.CompletionItemKind.Snippet;
                    completeIt.insertText = obj.value;
                    return completeIt;
                })
            }
            return el;            
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}
class ConfigurationAutocomplete {
    provideCompletionItems(document, position) {
        try {
            let fileName = document.fileName,
            currentLine = document.getText(document.lineAt(position).range), el = [];
            
            if (fileName.includes('system.xml')) {
                if (currentLine.includes('validate')) {
                    el = configList.getValidations().map((validatn) => {
                        let completeIt = new vs.CompletionItem(String(validatn));
                        completeIt.kind = vs.CompletionItemKind.Value;
                        return completeIt;
                    })
                } else {
                    el = configList.getTypes().map((obj) => {
                        let completeIt = new vs.CompletionItem(String(obj.name));
                        completeIt.kind = vs.CompletionItemKind.Snippet;
                        completeIt.insertText = obj.value;
                        return completeIt;
                    })
                }
            }
            return el;            
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}
exports.PathAutocomplete = PathAutocomplete;
exports.EventsAutocomplete = EventsAutocomplete;
exports.DbschemaAutocomplete = DbschemaAutocomplete;
exports.ConfigurationAutocomplete = ConfigurationAutocomplete;
exports.LayoutAutocomplete = LayoutAutocomplete;