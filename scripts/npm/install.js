const fs = require("fs")
const {execSync} = require("child_process")

const REPO_NAME = "dotfiles"
const REPO_URL = `https://github.com/bradgarropy/${REPO_NAME}.git`
const PACKAGES = "packages.txt"

const shell = (command, options) => {
    const buffer = execSync(command, options)
    const output = buffer.toString()
    console.log(output)

    return output
}

shell(`git clone ${REPO_URL}`)

const text = fs.readFileSync(`${REPO_NAME}/npm/${PACKAGES}`, "utf8")
const packages = text.split("\n").filter(line => line)

packages.forEach(package => shell(`npm install ${package} --global`))

shell(`rm -rf ${REPO_NAME}`)
