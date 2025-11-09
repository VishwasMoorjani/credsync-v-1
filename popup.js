document.addEventListener('DOMContentLoaded', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = new URL(tab.url).hostname;
  document.getElementById('domain').textContent = `Client: ${domain}`;

  chrome.storage.local.get([domain], (result) => {
    if (result[domain]) {
      document.getElementById('notes').value = result[domain].notes || '';
      document.getElementById('status').value = result[domain].status || '';
      document.getElementById('adminLink').value = result[domain].adminLink || '';
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const data = {
      notes: document.getElementById('notes').value,
      status: document.getElementById('status').value,
      adminLink: document.getElementById('adminLink').value
    };
    chrome.storage.local.set({ [domain]: data }, () => {
      document.getElementById('message').textContent = 'Saved successfully!';
      setTimeout(() => (document.getElementById('message').textContent = ''), 1500);
    });
  });
});