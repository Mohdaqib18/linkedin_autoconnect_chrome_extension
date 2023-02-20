//constants declaration
const connectButton =
	"li.reusable-search__result-container div.entity-result__actions > div > button.ember-view:enabled:not(.artdeco-button--muted)";
const sendButton = "div.send-invite button.artdeco-button--primary";
let loop;
let buttonClickCount = 0;

// wait a random amount of time between 5-10 seconds and press the Connect button.
// const randomInterval = Math.floor(Math.random() * (10000 - 5000 + 1) + 5000);

/******* NOTE: I have done a random wait between 3-5 secs for a swift experience, 
you can comment below randomInterval statement and uncomment above for a wait between 5-10 secs as required in the assignment**********/
const randomInterval = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000);

//receiving start/stop connnecting button click info from popup.js
//if start connecting button clicked, fetching  connect buttons from linkedIn search page, looping over them and clicking after a setInterval

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	/* Content script action */
	if (request) {
		if (request.msg === "true") {
			console.log("started");

			const connectButtons = document.querySelectorAll(connectButton);

			setTimeout(() => {
				connectButtons[0].click();
				buttonClickCount++;
				chrome.runtime.sendMessage({ msg: buttonClickCount });
			}, 800);

			let index = 0;

			loop = setInterval(() => {
				if (index === connectButtons.length - 1) {
					clearInterval(loop);
				}

				connectButtons[index].focus();

				setTimeout(() => {
					if (index > 0) {
						connectButtons[index].click();
						buttonClickCount++;
						chrome.runtime.sendMessage({ msg: buttonClickCount });
					}
				}, 1000);

				connectButtons[index].setAttribute("disabled", "disabled");

				const sendInvite = document.querySelector(sendButton);
				if (sendInvite) {
					sendInvite.click();
				}
				index++;
			}, randomInterval);
		} else {
			clearInterval(loop);
			buttonClickCount = 0;
		}
	}

	chrome.runtime.sendMessage({ msg: buttonClickCount });
});
