const CLI = require('clui');
const ConfigStrore = require('configstore');
const Octokit = require('@octokit/rest');
const Spinner = CLI.Spinner;

const inqirer = require('./inquirer');
const pkg = require('../package.json');

const conf = new ConfigStrore(pkg.name);

let octokit
module.exports = {
    getInstance: () => {
        return Octokit;
    },

    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    setGithubCredentials: async () => {
        const credentials = await inqirer.askGitHubCredentials();
        octokit = new Octokit({
            auth: {
                username: credentials.username,
                password: credentials.password
            }
        });
    },

    registerNewToken: async () => {
        const status = new Spinner('Authenticating you please wait ...');
        status.start();

        try {
            const response = await octokit.oauthAuthorizations.createAuthorization({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginit, the command-line tool for initalizing Git repos',
            })
            const token = response.data.token;
            if (token) {
                conf.set('github.token', token);
                return token
            } else {
                throw new Error("Missing token, Github token was not found in the response!")
            }
        } catch (error) {
            throw error;
        } finally {
            status.stop();
        }
    }
}