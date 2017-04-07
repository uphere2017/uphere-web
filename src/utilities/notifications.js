import Icon from './uphere1.png';

let isActive = false;

function getNotificationPermission() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function showMessageNotification(name, text) {
  if (!isActive) {
    return;
  }

  const notification = new Notification('A new message from Uphere!', {
    icon: Icon,
    body: `${name}: ${text}`,
  });
}

window.onfocus = () => {
  isActive = false;
};

window.onblur = () => {
  isActive = true;
};

export {
  getNotificationPermission,
  showMessageNotification
};
