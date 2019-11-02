const fs = require("fs")
const {execSync} = require("child_process")

const DOTFILES = "https://github.com/bradgarropy/dotfiles.git"
const EXTENSIONS = "extensions.txt"

const shell = (command, options) => {
    const buffer = execSync(command, options)
    const output = buffer.toString()
    console.log(output)

    return output
}

const extensions = shell("code --list-extensions")
fs.writeFileSync(EXTENSIONS, extensions)

shell(`git clone ${DOTFILES}`)
shell(`mv ${EXTENSIONS} dotfiles/vscode`)

shell("git status", {cwd: "./dotfiles"})
shell("git diff", {cwd: "./dotfiles"})

shell(`git add vscode/${EXTENSIONS}`, {cwd: "./dotfiles"})
shell('git commit -m "update vscode extensions."', {cwd: "./dotfiles"})
shell("git push", {cwd: "./dotfiles"})
