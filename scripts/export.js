const fs = require("fs")
const {execSync} = require("child_process")

const DOTFILES = "https://github.com/bradgarropy/dotfiles.git"
const EXTENSIONS = "extensions.txt"

const shell = (command, options) => {
    const buffer = execSync(command, options)
    const output = buffer.toString()

    return output
}

const extensions = shell("code --list-extensions")
fs.writeFileSync(EXTENSIONS, extensions)

shell(`git clone ${DOTFILES}`)
shell(`mv ${EXTENSIONS} dotfiles/vscode`)

const status = shell("git status", {cwd: "./dotfiles"})
const diff = shell("git diff", {cwd: "./dotfiles"})

console.log(status)
console.log(diff)
