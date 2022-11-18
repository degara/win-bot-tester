// Github Token
const ghtoken = 'ghp_jUq07qnLqgTMqjTqkiqbKigBX28hgA2YxkxU';
// URL from the repository. ...repos/'owner'/'projectname'/contents/'path'
const urlfile = "https://api.github.com/repos/degara/winbot-tester/contents/testo.json"


const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
  auth: ghtoken
})

const get = () => {
  return octokit.request('GET ' + urlfile, {
  })
}

const put = async (fileContent, message = "testing telegram bot") => {
  const sha = (await get()).data.sha
  return octokit.request('PUT ' + urlfile, {
    message: message,
    committer: {
      name: 'degara',
      email: 'degara@degara.com'
    },
    content: btoa(fileContent),
    sha: sha
  })
}

exports.get = get
exports.put = put