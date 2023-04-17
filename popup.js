document.addEventListener('DOMContentLoaded', function() {
  var startButton = document.getElementById('start');
  var stopButton = document.getElementById('stop');

  startButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startRecording' ,tab:tab}, function(response) {
      });
    });
  });

  stopButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopRecording' });
    });
  });
});

