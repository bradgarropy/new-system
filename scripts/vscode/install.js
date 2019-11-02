const fs = require("fs")
const {execSync} = require("child_process")

const REPO_NAME = "dotfiles"
const REPO_URL = `https://github.com/bradgarropy/${REPO_NAME}.git`
const EXTENSIONS = "extensions.txt"

const shell = (command, options) => {
    const buffer = execSync(command, options)
    const output = buffer.toString()
    console.log(output)

    return output
}

shell(`git clone ${REPO_URL}`)

const text = fs.readFileSync(`${REPO_NAME}/vscode/${EXTENSIONS}`, "utf8")
const extensions = text.split("\n").filter(line => line)

extensions.forEach(extension => shell(`code --install-extension ${extension}`))

shell(`rm -rf ${REPO_NAME}`)
