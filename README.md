TARUMT Intranet Session Refresher
=================================

A **Chrome extension** to save you clicks ~~and annoyance~~ from logging in again after the session has expired.

Installation
------------

### Before installing

⚠️ This extension stores password as plaintext and is vulnerable to credentials stealer. Exercise caution and change your password if you have run any malicious programs. \
Related stack overflow https://stackoverflow.com/questions/17280390/can-local-storage-ever-be-considered-secure.

## Installing

### From packed

Install the latest .crx from [release](https://github.com/makan-kencing/tarumt-intranet-session-refresher/releases/latest) and drag it into Chrome to install.

### From source code

1. Install the latest source code from [release](https://github.com/makan-kencing/tarumt-intranet-session-refresher/releases/latest) in .zip (or any format that you can extract), and extract it into a folder.
2. Navigate to `chrome://extensions/` in Chrome.
   - Make sure `Developer mode` is enabled. (Top right corner)
3. Click `Load unpacked` and select the folder with the source code.

Usage
-----

1. Install and enable the extension. [Installation](#installation)
2. Click on the extension icon (beside url bar) and click Intranet Session Refresher to open the menu.
3. Fill in the username and password and save.
4. Done.

Developing
----------

- Have git

1. Clone the repository.
   ```shell
   git clone https://github.com/makan-kencing/tarumt-intranet-session-refresher.git
   ```
2. Install the extension [from source](#from-source-code).

Implementation
--------------

- The programs inject a script into TARUMT intranet webpage and checks for a response for session expiry.
- When found, the page is blocked from redirects to the session expired page.
- A call is made to the extension to refresh the session.
- The session is then refreshed using the provided username and password.
- After refreshing, the page is reloaded.
  - If an error occurred and is not able to relog, the page is then normally redirected to the session expired page.

Ending notes<i>?</i>
--------------------

This extension is NOT affiliated with Tunku Abdul Rahman University of Management and Technology (TARUMT) or any similar entities.
