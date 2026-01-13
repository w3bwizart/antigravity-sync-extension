"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const path = require("path");
const os = require("os");
function activate(context) {
    // 1. Create a Status Bar Button for easy access
    // This creates the item in the bottom purple/blue bar
    const syncButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    syncButton.command = 'antigravity.repoSync';
    syncButton.text = `$(sync) Sync Workspaces`;
    syncButton.tooltip = 'Click to pull latest Agent rules and workflows';
    // CRITICAL: Ensure the button is shown immediately upon activation
    syncButton.show();
    // 2. Register the Sync Command
    let disposable = vscode.commands.registerCommand('antigravity.repoSync', async () => {
        const targetDir = path.join(os.homedir(), 'Antigravity_AI');
        // Show a loading notification in the bottom-right for the user
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Updating Agent Fleet...",
            cancellable: false
        }, async (progress) => {
            // Define your fleet of repositories
            const fleetRepos = [
                "https://github.com/company/finance-office.git",
                "https://github.com/company/company-office.git"
            ];
            for (const repo of fleetRepos) {
                const folderName = path.basename(repo, '.git');
                const fullPath = path.join(targetDir, folderName);
                progress.report({ message: `Syncing ${folderName}...` });
                // Command: Clone if missing, Pull if it already exists
                const gitCmd = `git clone ${repo} ${fullPath} || (cd ${fullPath} && git pull)`;
                await new Promise((resolve) => {
                    (0, child_process_1.exec)(gitCmd, (err) => {
                        if (err)
                            vscode.window.showErrorMessage(`Sync failed for ${folderName}: ${err.message}`);
                        resolve(true);
                    });
                });
            }
            vscode.window.showInformationMessage('🚀 Fleet Sync Complete! Your Agents are up to date.');
        });
    });
    // Add to subscriptions so resources are cleaned up on deactivate
    context.subscriptions.push(disposable, syncButton);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map