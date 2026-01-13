This README provides the official documentation for the **Antigravity Workspace Management System**. This system is designed to allow developers to scaffold agentic workspaces and allow end-users (PMs and Finance) to keep their local environments updated via a custom Antigravity extension.

---

# 🚀 Antigravity Workspace Management

This project consists of two core components:

1. **The Scaffolder**: A CLI tool for developers to initialize new client workspaces.
2. **The Sync Extension**: A custom Antigravity UI button that pulls the latest Git updates for all workspaces.

---

## 🛠 Part 1: Developer Scaffolder

The `antigravity-create-workspace` script sets up the "Agent Brain" and the "User Dashboard" in any new directory.

### **Installation**

1. Save the scaffolding script as `antigravity-create-workspace.sh`.
2. Move it to your global path:
```bash
sudo mv antigravity-create-workspace.sh /usr/local/bin/antigravity-create-workspace
sudo chmod +x /usr/local/bin/antigravity-create-workspace

```



### **Usage**

Navigate to a new client folder and run:

```bash
antigravity-create-workspace

```

### **What it Creates**

* **`.agent/rules/global.md`**: Sets the agent's persona and safety guardrails.
* **`.agent/workflows/init.md`**: Defines the `/init` command that triggers the dashboard.
* **`AGENT_CONTROL_DASHBOARD.md`**: The readable manual for the end-user.

---

## 🛰 Part 2: Fleet Sync Extension

The extension provides a non-technical UI to sync their local files with your master GitHub repos.

### **Compiling and Packaging (.VSIX)**

To create the installable file for your team, follow these steps in the extension folder:

1. **Install Dependencies**:
`npm install`
2. **Install Packaging Tool**:
`npm install -g @vscode/vsce`
3. **Compile TypeScript**:
`npm run compile`
4. **Package**:
`vsce package`
*This generates a file named `antigravity.repoSync-1.0.0.vsix`.*

---

## 🎮 Part 3: User Onboarding (The PM Experience)

Once the system is deployed, your employees follow this simplified workflow:

### **1. Install the Extension**

1. Open Antigravity and go to the **Extensions** view (Cmd+Shift+X).
2. Click **...** -> **Install from VSIX...**.
3. Select the `antigravity.repoSync` file you provided.

### **2. Daily Sync**

* Click the **$(sync) Sync Fleet** button in the bottom status bar.
* The extension will automatically pull updates for every client office folder.

### **3. Workspace Activation**

* Open a client folder (e.g., "CLIENT Office").
* Open the Agent Manager (**Cmd + L**).
* Type **`/init`** and press Enter.
* The **Agent Control Dashboard** will pop out on the right, showing available skills for that specific client.

---

## 🏗 Maintenance for Developers

* **To add a new skill**: Create a new `.md` file in the `.agent/workflows/` folder of a client repo and push to GitHub.
* **To add a new client repo**: Update the `FLEET_REPOS` array in the extension's `extension.ts`, re-package, and distribute the new VSIX.

**Would you like me to create the "Update Script" for the extension that allows it to update its own repo list from a remote JSON file?**
