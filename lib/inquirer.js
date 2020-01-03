const inquirer = require('inquirer');
const files = require('./file');

module.exports = {
    askGitHubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your Github username or email address',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'please enter your password';
                    }
                },
            },
            {
                name: 'password',
                value: 'password',
                message: 'Enter your password',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    } else {
                        return 'please enter your password'
                    }
                }
            }
        ];

        return inquirer.prompt(questions)
    },


    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        const questions = [
            {
                type: 'input'
            }
        ]
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'enter a name for the repository: ',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "please enter a name for the repository";
                    }
                }
            }, {
                type: 'input',
                name: 'description',
                
            }
        ])
    }
}