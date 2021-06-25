"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
const vscode_1 = require("vscode");
const fs = require("fs");
const str2ab_1 = require("./str2ab");
const ft = require("./templates/FileTemplates");
async function createModule() {
    const wsPath = getWsPath(), moduleName = await vscode_1.window.showInputBox({
        value: 'Vendor_Module',
        placeHolder: 'For example: Vendor and Module Name'
    });
    if (moduleName !== undefined) {
        let moduleDir = getModuleBasePath(wsPath);
        if(fs.existsSync(moduleDir)) {
            moduleDir = createModuleDirectory(moduleDir, moduleName);
            createModuleXmlFile(moduleDir, moduleName);
            createModuleRegistrationFile(moduleDir, moduleName);
        }
    } else vscode_1.window.showInformationMessage('Invalid module name');
}
function getWsPath() {
    let modulePath = '';
    if (vscode_1.workspace.workspaceFolders !== undefined) {
        modulePath = vscode_1.workspace.workspaceFolders[0].uri.fsPath;
    }
    return modulePath;
}
function getModuleBasePath(modulePath, moduleName = "") {
    modulePath += "/app/code";
    return (moduleName === "") ? modulePath : modulePath + '/' + moduleName.replace('_', '/');
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    let moduleXmlTemplate = ft.moduleXml;
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
    let moduleRegistrationTemplate = ft.registrationPhp;
    moduleRegistrationTemplate = moduleRegistrationTemplate.replace('%moduleName%', moduleName);
    let registrationFile = moduleDir + '/registration.php';
    let moduleRegistrationFileUri = vscode_1.Uri.file(registrationFile);
    var uint8array = new Uint8Array(str2ab_1.str2ab(moduleRegistrationTemplate));
    vscode_1.workspace.fs.writeFile(moduleRegistrationFileUri, uint8array);
}
async function createController() {
    const wsPath = getWsPath(), userInput = await vscode_1.window.showInputBox({
        value: 'Vendor_Module: areacode: route/controller/action',
        placeHolder: 'Enter full controllerpath with module name and area'
    });
    if (userInput !== undefined) {
        let input = userInput.split(':'), moduleName = input[0], area = input[1].trim(),
        [route, controller, action] = input[2].split('/');
        let moduleDir = getModuleBasePath(wsPath, moduleName);
        if (fs.existsSync(moduleDir)) createControllerFile(moduleDir, moduleName, area, route.trim(), capitalize(controller), capitalize(action));
        else vscode_1.window.showInformationMessage('Invalid module name.');
    } else vscode_1.window.showInformationMessage('Invalid input.');
}
function createControllerFile(moduleDir, moduleName, area, route, controller, action) {
    if (area === 'adminhtml') controller = 'Adminhtml/' + controller;
    let dir = [
        '/Controller',
        '/Controller/' + controller,
        '/etc',
        '/etc/' + area
    ], actionTemplate = (area === "adminhtml") ? ft.adminActionTemplate : ft.frontActionTemplate,
    routeTemplate = (area === "adminhtml") ? ft.adminRouteTemplate : ft.frontRouteTemplate;
    actionTemplate = actionTemplate.replace('%module_name%', moduleName.replace('_', '\\'))
                                    .replace('%controller%', controller.replace('/', '\\'))
                                    .replace('%class_name%', action);
    routeTemplate = routeTemplate.replace('%module_name%', moduleName).replaceAll('%route%', route);
    let data = [
        new Uint8Array(str2ab_1.str2ab(actionTemplate)),
        new Uint8Array(str2ab_1.str2ab(routeTemplate))
    ],
    uri = [
        vscode_1.Uri.file(moduleDir + '/Controller/' + controller + '/' + action + '.php'),
        vscode_1.Uri.file(moduleDir + '/etc/' + area + '/routes.xml')
    ];
    if (fs.existsSync(moduleDir + '/etc/' + area + '/routes.xml')) {
        data.pop();
        uri.pop();
    }
    dir.map(fn => {
        vscode_1.workspace.fs.createDirectory(moduleDir + fn);
    });
    data.map((dt, index) => {
        vscode_1.workspace.fs.writeFile(uri[index], dt);
    });
}
async function createHelper() {
    const wsPath = getWsPath(), moduleName = await vscode_1.window.showInputBox({
        value: 'Vendor_Module',
        placeHolder: 'Enter module name for which you want to create helper file'
    });
    if (moduleName !== undefined) {
        let moduleDir = getModuleBasePath(wsPath, moduleName);
        if (fs.existsSync(moduleDir)) createHelperFile(moduleDir, moduleName);
        else vscode_1.window.showInformationMessage('Invalid module name.');
    } else vscode_1.window.showInformationMessage('Invalid input.');
}
function createHelperFile(moduleDir, moduleName) {
    let helperTemplate = ft.helperData, helperUri = vscode_1.Uri.file(moduleDir + '/Helper/Data.php');
    helperTemplate = helperTemplate.replace('%moduleName%', moduleName.replace('_', '\\'));
    vscode_1.workspace.fs.createDirectory(moduleDir + '/Helper');
    let data = new Uint8Array(str2ab_1.str2ab(helperTemplate));
    vscode_1.workspace.fs.writeFile(helperUri, data);
}
exports.createModule = createModule;
exports.createController = createController;
exports.createHelper = createHelper;