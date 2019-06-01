function searchKeyPress(event) {
  event = event || window.event;
    //enter key
  if (event.keyCode == 13) {
    document.getElementById('search_button').click();
    return false;
  }
  return true;
}


function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos?per_page=100`);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoListStr = `${repos
    .map(
      r =>
        '<div class="row repo-name">' +
        '<span class="prompt">~></span>&nbsp' +
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
  const username = document.getElementById("username").value;
  const reponame = htmlElement.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${reponame}/commits`);
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  debugger;
  const commitsListStr = `<div class="row commit-header">Commit History</div>${commits
    .map(
      commit =>
        '<div class="row commit-message">' +
        commit.commit.message +
        '</div>' +
        '<div class="row">' +
        '<span class="author-name">' + commit.commit.author.name + '</span>' +
        '&nbsp' +
        'committed on' +
        '&nbsp' +
        '<span class="commit-date">' + commit.commit.author.date + '</span>' +
        '</div>'
    )
    .join('')}`;
  document.getElementById('commits').innerHTML = commitsListStr;
}
