let chunks = [];
let mediaRecorder;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startRecording') {
    console.log('start_Recording');
    // console.log(message.ci);
    navigator.mediaDevices.getUserMedia({
      audio: false,//{
      //   mandatory: {
      //     chromeMediaSource: 'tab',
      //     chromeMediaSourceId: message.streamId
      //   }
      // },
      video: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: message.streamId
        }
      }
    })  
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorded-video.webm';
        a.click();
        chunks = [];
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
    });
  } else if (message.action === 'stopRecording') {
    console.log('stop_Recording');
    mediaRecorder.stop();
  }
});

