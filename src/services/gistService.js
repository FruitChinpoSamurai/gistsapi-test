import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    // Replace personal access token for auth with your own for better rate limit.
    auth: process.env.REACT_APP_HUB,
    userAgent: 'gistsAPITest'
})

// These could have been merged into one function so that code in <GistList/> could be cleaner.
export const getPublicGists = () => octokit.gists.listPublic();
export const getGistForUser = username =>  octokit.gists.listForUser({ username });
