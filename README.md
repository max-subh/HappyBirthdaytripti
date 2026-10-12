# Birthday Memories

A React birthday page with a countdown, a personal letter, a photo album, and confetti.

## Run on Windows with VS Code

### One-time setup on this computer

1. Install [Bun](https://bun.sh/) if it is not already installed. In Windows PowerShell, you can use:

   ```powershell
   winget install --id Oven-sh.Bun --exact
   ```

2. Close and reopen VS Code so its terminal can find Bun.
3. In VS Code, select **File > Open Folder...** and open this project folder.
4. Open **Terminal > New Terminal** and install the project packages:

   ```powershell
   bun install --frozen-lockfile
   ```

   This project does not need a Gemini API key, Node.js, or a separate global React/Vite install.

### Start the app

1. Open a VS Code terminal in the project folder.
2. Run:

   ```powershell
   bun run dev
   ```
4
3. Open **http://localhost:3000** in your browser.
4. To stop the server, focus the terminal and press **Ctrl+C**.

You can also open **Terminal > Run Task...** and select **Start dev server**.

### Verify or build

Run these in the VS Code terminal whenever you want to check the project:

```powershell
bun run lint
bun run build
```

The **Build project** and **Type-check project** tasks are also available in **Terminal > Run Task...**.

### Moving the project to another computer

Copy the whole project folder, including `package.json` and `bun.lock`. Install Bun on the other computer, open the folder in VS Code, run `bun install --frozen-lockfile` once, then follow **Start the app** above. The first install needs an internet connection. The `node_modules` and `dist` folders are generated locally and do not need to be copied.
