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
        if (area !== 'adminhtml' && area !== 'frontend') vscode_1.window.showInformationMessage('Invalid areacode.');
        else {
            let moduleDir = getModuleBasePath(wsPath, moduleName);
            if (fs.existsSync(moduleDir)) createControllerFile(moduleDir, moduleName, area, route.trim(), capitalize(controller), capitalize(action));
            else vscode_1.window.showInformationMessage('Invalid module name.');
        }
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
                                    .replaceAll('%controller%', controller.replace('/', '\\'))
                                    .replaceAll('%class_name%', action);
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

/**
 * create shipping method files
 */
 async function createShippingMethod() {
    const wsPath = getWsPath(), userInput = await vscode_1.window.showInputBox({
        value: 'Vendor_Module: shipping_code: Shipping Label',
        placeHolder: 'Enter module name with shipping method code (e.g., table_rate) and label (e.g., Table Rate Shipping)'
    });

    if (userInput !== undefined) {
        let input = userInput.split(':'), moduleName = input[0], shippingCode = input[1].trim(),
        name = input[2].trim();
        let moduleDir = getModuleBasePath(wsPath, moduleName);
        if (fs.existsSync(moduleDir)) createShippingFile(moduleDir, moduleName, shippingCode, name);
        else vscode_1.window.showInformationMessage('Invalid module name.');
    } else vscode_1.window.showInformationMessage('Invalid input.');
}

/**
 * create all files for shipping method
 */
function createShippingFile(moduleDir, moduleName, shippingCode, name) {
    var fileName = capitalize(name.replace(/\s/, ''));
    let dir = [
        '/Model',
        '/Model/' + fileName,
        '/etc/adminhtml'
    ], systemXmlTemplate = ft.systemXmlTemplate,
    configXmlTemplate = ft.configXmlTemplate,
    carrierTemplate = ft.carrierFileTemplate;
    systemXmlTemplate = systemXmlTemplate.replace('%shipping_code%', shippingCode)
                                    .replace('%name%', capitalize(name));
    configXmlTemplate = configXmlTemplate.replace('%moduleName%', moduleName.replace('_', '\\'))
                                            .replace(/%shipping_code%/g, shippingCode)
                                            .replace(/%name%/g, fileName);
    carrierTemplate = carrierTemplate.replace('%moduleName%', moduleName.replace('_', '\\'))
                                        .replace(/%shipping_code%/g, shippingCode)
                                        .replace(/%name%/g, fileName);
    let data = [
        new Uint8Array(str2ab_1.str2ab(systemXmlTemplate)),
        new Uint8Array(str2ab_1.str2ab(configXmlTemplate)),
        new Uint8Array(str2ab_1.str2ab(carrierTemplate))
    ],
    uri = [
        vscode_1.Uri.file(moduleDir + '/etc/adminhtml/system.xml'),
        vscode_1.Uri.file(moduleDir + '/etc/config.xml'),
        vscode_1.Uri.file(moduleDir + '/Model/'+fileName+'/Carrier.php')
    ];
    dir.map(fn => {
        vscode_1.workspace.fs.createDirectory(moduleDir + fn);
    });
    data.map((dt, index) => {
        vscode_1.workspace.fs.writeFile(uri[index], dt);
    });
}

/**
 * generate payment method default files
 */
async function createPaymentMethod() {
    const wsPath = getWsPath(), userInput = await vscode_1.window.showInputBox({
        value: 'Vendor_Module: payment_code: Payment Label',
        placeHolder: 'Enter module name with payment method code (e.g., cash_on_delivery) and label (e.g., Cash On Delivery)'
    });

    if (userInput !== undefined) {
        let input = userInput.split(':'), moduleName = input[0], paymentCode = input[1].trim(),
        name = input[2].trim();
        let moduleDir = getModuleBasePath(wsPath, moduleName);
        // createPaymentFiles(moduleDir, moduleName, paymentCode, name);
        if (fs.existsSync(moduleDir)) createPaymentFiles(moduleDir, moduleName, paymentCode, name);
        else vscode_1.window.showInformationMessage('Invalid module name.');
    } else vscode_1.window.showInformationMessage('Invalid input.');
}

/**
 * create payment files
 */
function createPaymentFiles(moduleDir, moduleName, paymentCode, name) {
    var fileName = capitalize(name.replace(/\s/, ''));
    let dir = [
        '/Model',
        '/etc/adminhtml',
        '/view/frontend/layout',
        '/view/frontend/web/template/payment',
        '/view/frontend/web/js/view/payment/method-render'
    ], systemXmlPaymentTemplate = ft.systemXmlPaymentTemplate,
    configXmlPaymentTemplate = ft.configXmlPaymentTemplate,
    paymentModelTemplate = ft.paymentModelTemplate,
    paymentlayoutFileTemplate = ft.paymentlayoutFileTemplate,
    paymentHtmlTemplate = ft.paymentHtmlTemplate,
    methodRenderTemplate = ft.methodRenderTemplate,
    paymentjsTemplate = ft.paymentjsTemplate;
    systemXmlPaymentTemplate = systemXmlPaymentTemplate.replace('%payment_code%', paymentCode)
                                    .replace('%name%', capitalize(name));
    configXmlPaymentTemplate = configXmlPaymentTemplate.replace('%moduleName%', moduleName.replace('_', '\\'))
                                            .replace(/%payment_code%/g, paymentCode)
                                            .replace(/%filename%/g, fileName)
                                            .replace(/%name%/g, name);
    paymentModelTemplate = paymentModelTemplate.replace('%moduleName%', moduleName.replace('_', '\\'))
                                        .replace(/%payment_code%/g, paymentCode)
                                        .replace(/%filename%/g, fileName);

    paymentlayoutFileTemplate = paymentlayoutFileTemplate.replace('%moduleName%', moduleName)
                                        .replace(/%payment_code%/g, paymentCode);
    methodRenderTemplate = methodRenderTemplate.replace('%moduleName%', moduleName)
                                        .replace(/%payment_code%/g, paymentCode);
    paymentjsTemplate = paymentjsTemplate.replace('%moduleName%', moduleName)
                                        .replace(/%payment_code%/g, paymentCode);
    let data = [
        new Uint8Array(str2ab_1.str2ab(systemXmlPaymentTemplate)),
        new Uint8Array(str2ab_1.str2ab(configXmlPaymentTemplate)),
        new Uint8Array(str2ab_1.str2ab(paymentModelTemplate)),
        new Uint8Array(str2ab_1.str2ab(paymentlayoutFileTemplate)),
        new Uint8Array(str2ab_1.str2ab(paymentHtmlTemplate)),
        new Uint8Array(str2ab_1.str2ab(methodRenderTemplate)),
        new Uint8Array(str2ab_1.str2ab(paymentjsTemplate))
    ],
    uri = [
        vscode_1.Uri.file(moduleDir + '/etc/adminhtml/system.xml'),
        vscode_1.Uri.file(moduleDir + '/etc/config.xml'),
        vscode_1.Uri.file(moduleDir + '/Model/'+fileName+'.php'),
        vscode_1.Uri.file(moduleDir + '/view/frontend/layout/'+'checkout_index_index.xml'),
        vscode_1.Uri.file(moduleDir + '/view/frontend/web/template/payment/'+paymentCode+'.html'),
        vscode_1.Uri.file(moduleDir + '/view/frontend/web/js/view/payment/method-render.js'),
        vscode_1.Uri.file(moduleDir + '/view/frontend/web/js/view/payment/method-render/'+paymentCode+'.js')
    ];
    dir.map(fn => {
        vscode_1.workspace.fs.createDirectory(moduleDir + fn);
    });
    data.map((dt, index) => {
        vscode_1.workspace.fs.writeFile(uri[index], dt);
    });
}

exports.createModule = createModule;
exports.createController = createController;
exports.createHelper = createHelper;
exports.createShippingMethod = createShippingMethod;
exports.createPaymentMethod = createPaymentMethod;