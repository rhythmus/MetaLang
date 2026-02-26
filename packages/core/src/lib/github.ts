import { Octokit } from 'octokit';

export interface GitHubConfig {
    owner: string;
    repo: string;
    auth: string;
}

export interface PRRequest {
    title: string;
    body: string;
    branchName: string;
    filePath: string;
    content: string;
    commitMessage: string;
}

/**
 * Service to handle GitHub integration (PR creation).
 */
export class GitHubService {
    private octokit: Octokit;
    private owner: string;
    private repo: string;

    constructor(config: GitHubConfig) {
        this.octokit = new Octokit({ auth: config.auth });
        this.owner = config.owner;
        this.repo = config.repo;
    }

    /**
     * Creates a Pull Request with the specified file changes.
     */
    async createPullRequest(request: PRRequest): Promise<string> {
        // 1. Get the default branch (usually 'main')
        const { data: repoData } = await this.octokit.rest.repos.get({
            owner: this.owner,
            repo: this.repo,
        });
        const defaultBranch = repoData.default_branch;

        // 2. Get the SHA of the latest commit on the default branch
        const { data: refData } = await this.octokit.rest.git.getRef({
            owner: this.owner,
            repo: this.repo,
            ref: `heads/${defaultBranch}`,
        });
        const baseSha = refData.object.sha;

        // 3. Create a new branch
        await this.octokit.rest.git.createRef({
            owner: this.owner,
            repo: this.repo,
            ref: `refs/heads/${request.branchName}`,
            sha: baseSha,
        });

        // 4. Get the file's current SHA (if it exists) to update it
        let fileSha: string | undefined;
        try {
            const { data: fileData } = await this.octokit.rest.repos.getContent({
                owner: this.owner,
                repo: this.repo,
                path: request.filePath,
                ref: request.branchName,
            });
            if (!Array.isArray(fileData)) {
                fileSha = fileData.sha;
            }
        } catch (e) {
            // File might not exist yet
        }

        // 5. Create or update the file
        const params: any = {
            owner: this.owner,
            repo: this.repo,
            path: request.filePath,
            message: request.commitMessage,
            content: btoa(unescape(encodeURIComponent(request.content))),
            branch: request.branchName,
        };
        if (fileSha) params.sha = fileSha;

        await this.octokit.rest.repos.createOrUpdateFileContents(params);

        // 6. Create the Pull Request
        const { data: pr } = await this.octokit.rest.pulls.create({
            owner: this.owner,
            repo: this.repo,
            title: request.title,
            body: request.body,
            head: request.branchName,
            base: defaultBranch,
        });

        return pr.html_url;
    }
}
