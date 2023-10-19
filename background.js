// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'stay_hydrated.png',
    title: 'You Can Procrastinate again',
    message: "Thats enough work for now!",
    buttons: [{ title: 'Get Back To Work' }],
    priority: 0
  });
});

chrome.notifications.onButtonClicked.addListener(async () => {
  const item = await chrome.storage.sync.get(['minutes']);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: item.minutes });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === "tab_close_msg") {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    }
});
