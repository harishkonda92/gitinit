const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquire = require('./lib/inquirer');
const file = require('./lib/file');
const github = require('./lib/github');
console.log(
    chalk.yellow(
        figlet.textSync('gitinit', { horizontalLayout: 'full' })
    )
)

const run = async () => {
    try {
        let token = github.getStoredGithubToken()
        // const credentials = await inquire.askGitHubCredentials();
        if (!token) {
            await github.setGithubCredentials();
            token = await github.registerNewToken();
        }
        console.log(token);
    } catch (error) {
        console.log(error);
    }
}

run()