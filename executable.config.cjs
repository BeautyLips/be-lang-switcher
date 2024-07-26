// For handle run in terminal:
// chmod +x .husky/pre-commit && chmod +x .husky/commit-msg
const fs = require("fs")
const path = require("path")

const files = [
  path.join(".husky", "pre-commit"),
  path.join(".husky", "commit-msg"),
]

files.forEach((file) => {
  fs.chmod(file, 0o755, (err) => {
    if (err) {
      console.error(`Executable config: set permission failed ${file}:`, err)
    } else {
      console.log(`Executable config: set permission for ${file}`)
    }
  })
})
