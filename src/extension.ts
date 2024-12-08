// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {handleBeforeFileSaved, handleFileClosed, handleFileOpened} from "./activations";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "tea-vscode" is now active!');

    // Process all opened files on extension first activation
    vscode.workspace.textDocuments.forEach(handleFileOpened);

    const onOpenDisposable = vscode.workspace.onDidOpenTextDocument(handleFileOpened);
    const onCloseDisposable = vscode.workspace.onDidCloseTextDocument(handleFileClosed);

    const beforeSaveDisposable = vscode.workspace.onWillSaveTextDocument(handleBeforeFileSaved);

    context.subscriptions.push(onOpenDisposable);
    context.subscriptions.push(onCloseDisposable);
    context.subscriptions.push(beforeSaveDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
}
