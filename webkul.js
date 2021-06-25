const vscode = require('vscode');
const GenerateSnippets = require("./features/GenerateSnippets");
const PathAutocompleteProvider = require("./features/PathAutocompleteProvider");
const GenerateFile = require("./features/GenerateFile");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	var phpselector = { scheme: 'file', language: 'php' };
	var xmlselector = { scheme: 'file', language: 'xml' };

	GenerateSnippets.createNameSnippets();
	let snips = vscode.commands.registerCommand('automagedev.m2autoSuggest', () => {
		GenerateSnippets.createNameSnippets();
	});
	let generateFiles = vscode.commands.registerCommand('automagedev.generateModule', async () => {
        const options = {
            BasicModule: GenerateFile.createModule,
            Helper: GenerateFile.createHelper,
            Controller: GenerateFile.createController
        };
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = Object.keys(options).map(label => ({ label }));
        quickPick.onDidChangeSelection(selection => {
            if (selection[0]) {
                options[selection[0].label](context)
                    .catch(console.error);
            }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    })
	
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(phpselector, new PathAutocompleteProvider.PathAutocomplete(), '->'));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(xmlselector, new PathAutocompleteProvider.EventsAutocomplete(), '"'));
	context.subscriptions.push(snips);
	context.subscriptions.push(generateFiles);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
