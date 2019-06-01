function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoListStr = `${repos
    .map(
      r =>
        '<div class="row repo-name">' +
        r.name +
        '</div>' +
        '<div class="row link-line">' +
        ' <a href="#" data-repo="' + r.name + '"' +
        ' onclick="getCommits(this)">Commit History</a>' +
        '</div>'
    )
    .join('')}`;

  document.getElementById('repositories').innerHTML = repoListStr;
}

function getCommits(htmlElement) {
}
