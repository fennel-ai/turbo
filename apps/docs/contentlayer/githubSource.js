import runBashCommand from "./runBashCommand";

// Returns a sync function that pulls content from a GitHub repo, and optionally polls for changes.
const githubSource = 
	(REPO_URL, CONTENT_DIR, POLL) => 
	async () => {
		let cancelled = false;
		let syncInterval;

		const syncLoop = async () => {
			console.log(`Pulling content from ${REPO_URL}`);

			await runBashCommand(`
			if [ -d  "${CONTENT_DIR}" ];
				then
				cd "${CONTENT_DIR}"; git pull;
				else
				git clone --depth 1 --single-branch ${REPO_URL} ${CONTENT_DIR};
			fi
			`);

			if (cancelled || !POLL) return;

			syncInterval = setTimeout(syncLoop, 3000);
		};

		await syncLoop();

		return () => {
			cancelled = true;
			clearTimeout(syncInterval);
		};
	};

export default githubSource