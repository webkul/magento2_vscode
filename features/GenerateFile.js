"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
const vscode_1 = require("vscode");
const fs = require("fs");
const str2ab_1 = require("./str2ab");
const module_xml_1 = require("./templates/module.xml");
const registration_php_1 = require("./templates/registration.php");
async function createModule() {
    let modulePath = '';
    if (vscode_1.workspace.workspaceFolders !== undefined) {
        modulePath = vscode_1.workspace.workspaceFolders[0].uri.fsPath;
    }
    const moduleName = await vscode_1.window.showInputBox({
        value: 'Vendor_Module',
        placeHolder: 'For example: Vendor and Module Name'
    });
    if (moduleName !== undefined) {
        let moduleDir = getModuleBasePath();
        if (moduleName !== undefined) {
            moduleDir = createModuleDirectory(moduleDir, moduleName);
            createModuleXmlFile(moduleDir, moduleName);
            createModuleRegistrationFile(moduleDir, moduleName);
        }
    }
    else {
        vscode_1.window.showInformationMessage(`Invalid Input`);
    }
    function getModuleBasePath() {
        return modulePath + "/app/code";
    }
    function createModuleDirectory(moduleDir, moduleName) {
        let dirNames = moduleName.split("_");
        let vendorPath = moduleDir + '/' + dirNames[0];
        if (!fs.existsSync(vendorPath)) vscode_1.workspace.fs.createDirectory(vendorPath);
        let modulePath = vendorPath + '/' + dirNames[1];
        if (!fs.existsSync(modulePath)) vscode_1.workspace.fs.createDirectory(modulePath);
        return modulePath;
    }
    function createModuleXmlFile(moduleDir, moduleName) {
        let moduleXmlTemplate = getModuleXmlTemplate();
        moduleXmlTemplate = moduleXmlTemplate.replace('%moduleName%', moduleName);
        let moduleEtcDir = moduleDir + '/etc';
        let moduleEtcDirUri = vscode_1.Uri.file(moduleEtcDir);
        if (!fs.existsSync(moduleEtcDir)) vscode_1.workspace.fs.createDirectory(moduleEtcDirUri);
        let moduleXmlFile = moduleEtcDir + '/module.xml';
        let moduleXmlFileUri = vscode_1.Uri.file(moduleXmlFile);
        var uint8array = new Uint8Array(str2ab_1.str2ab(moduleXmlTemplate));
        vscode_1.workspace.fs.writeFile(moduleXmlFileUri, uint8array);
    }
    function createModuleRegistrationFile(moduleDir, moduleName) {
        let moduleRegistrationTemplate = getModuleRegistrationTemplate();
        moduleRegistrationTemplate = moduleRegistrationTemplate.replace('%moduleName%', moduleName);
        let registrationFile = moduleDir + '/registration.php';
        let moduleRegistrationFileUri = vscode_1.Uri.file(registrationFile);
        var uint8array = new Uint8Array(str2ab_1.str2ab(moduleRegistrationTemplate));
        vscode_1.workspace.fs.writeFile(moduleRegistrationFileUri, uint8array);
    }
    function getModuleXmlTemplate() {
        return module_xml_1.moduleXml;
    }
    function getModuleRegistrationTemplate() {
        return registration_php_1.registrationPhp;
    }
}
exports.createModule = createModule;