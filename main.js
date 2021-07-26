let theinput = document.querySelector('.get-repos input'),
    getButton = document.querySelector('.get-repos .get-button'),
    reposData = document.querySelector('.show-data');

// get repos function

getButton.onclick = getRepos;

function getRepos() {
    if (theinput.value == '') {
        reposData.innerHTML = "<span>Please Write Github User Name</span>";
    } else {
        fetch(`https://api.github.com/users/${theinput.value}/repos`)
            .then(
                response => response.json()
            )
            .then(
                repositries => {
                    reposData.innerHTML = '';
                    repositries.forEach(repo => {
                        let mainDiv = document.createElement('div'),
                            mainDivText = document.createTextNode(repo.name),
                            theUrl = document.createElement('a'),
                            urlText = document.createTextNode('Visit'),
                            starsSpan = document.createElement('span'),
                            starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                        mainDiv.appendChild(mainDivText);
                        theUrl.appendChild(urlText);
                        theUrl.href = `https://www.github.com/${theinput.value}/${repo.name}`;
                        theUrl.setAttribute('target', '_blank');
                        mainDiv.appendChild(theUrl);
                        starsSpan.appendChild(starsText);
                        mainDiv.appendChild(starsSpan);
                        mainDiv.className = 'repo-box';
                        reposData.appendChild(mainDiv);

                    });
                }
            );
    }
}