document.addEventListener('DOMContentLoaded', function() {
  var startButton = document.getElementById('start');
  var stopButton = document.getElementById('stop');

  let isCapturing=false;
  let tabId;


  startButton.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabId = tabs[0].id;
    
      chrome.tabCapture.getCapturedTabs((ci) => {
        if(!isCapturing)ci=[];
        if (!ci.some(e => e.tabId == tabId) && !isCapturing) {
          isCapturing=true;
          chrome.tabCapture.getMediaStreamId({ consumerTabId: tabId }, (streamId) => {
            streamKey=streamId;
            chrome.tabs.sendMessage(tabId, { action: 'startRecording', streamId: streamId,ci:ci });
          });
        }
        else{
          // console.log("BRUH");
        }
      });
    });
  });
  
  stopButton.addEventListener('click', function() {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'stopRecording' });
      });
    });
    isCapturing=false;
  });

});


