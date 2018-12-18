# HAR

README 

S.P.U.D (Specialty Productivity Utility Directive) is a web browser plug-in that in a comedic, but also educative way, notifies you of your daily internet procrastination. In other words, It tracks usage of different websites, which you, as the user, have the ability to add and/or remove. Then the extension sends you notifications based on the amount of time you spend procrastinating. 

Through handcrafted notifications, we hope these notification messages convey a sense of authenticity towards users. The chrome popup interface includes a “home” page which has the two main buttons: “add”, which adds the website the user is currently on to the list of website that S.P.U.D will track, and “remove”, which removes the website that the user is currently on from the list. It also includes a “Site List” page which displays all the sites that the user has added. 

It tracks time spent on the website as of the current day, as well as an all-time time tracker. Any user can get this extension from the Google Chrome Store and automatically download, install and add it to their Chrome completely for free.

Interested developers can get the main folder, “S.P.U.D Main”, for our extension by accessing our Github repository and downloading the aforementioned file. Afterwards, they need to go into their Google Chrome and: 

Open “More Tools” 

Go to “Extensions

Turn on “Developer Mode”

Click “Load unpacked” 

After clicking “Load unpacked” they will need to load the “S.P.U.D Main” file into Chrome and run it. This would allow them to build and run the extension into Chrome and then they can enjoy timing their online procrastination. A description of what our main files do:

background.js -> Deals with the timing and storage saving

notifications.js -> Contains functions that run the notification system, all functions are shared between background.js and visa versa

popup.js -> Runs the functionality for popup.html

siteList.js -> Runs the functionality for siteList.html

popup.html & siteList.html -> Contains html for setting up popup pages

popup.css -> Styles the two popup pages

manifest.json -> links certain files to be used by chrome correctly


NOTE: Chrome API calls run asynchronous, all usage of its callback function need to be inside of the api call itself. There is no ability to return values from the callback to be used in other functions.
