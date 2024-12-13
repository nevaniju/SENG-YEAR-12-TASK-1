COMMIT MESSAGES
23.10.24
Added the base HTML structure and CSS for the Task Management App, including a welcome section, task cards with priority labels, a daily focus section, a floating "Add Task" button, and a navigation bar. Initial CSS was applied for layout with a neutral background, modern fonts, and a centred container for content. These changes set up the foundation for the app's user interface, providing a clean and simple layout to build on for future features.

24.10.24
Implemented user name input functionality and dynamic task management. Added a name input section that prompts the user to enter their name on the first visit and stores it using localStorage. Once the name is entered, the app displays a welcome message and main app content, including the task cards and daily focus section. Introduced an "Add Task" modal where users can create tasks with priority levels, and these tasks are dynamically added to the task cards and daily focus sections. Included a floating "Add Task" button that triggers the modal and displays it when appropriate. Implemented basic task-handling features such as adding and displaying tasks.

29.10.24
I implemented the user authentication system for the app, allowing users to either sign up or log in. The sign-up form captures the user's first name, last name, display name, and password, storing the display name in localStorage. Upon logging in, the app checks the entered display name against the stored one and displays a personalised welcome message. I also added the main container with task controls, including buttons for adding tasks, categorising tasks, and starting the Pomodoro timer. The "Add Task" functionality is connected to a modal, enabling users to input new tasks with categories and priority levels, which are displayed in the task cards section. Additionally, I implemented the Pomodoro timer, with features to start, pause, and reset the timer.

02.11.24
Updates were made to improve the authentication flow and UI. The Sign-Up and Login pages were redesigned for clarity and ease of navigation, featuring separate sections for each form. The CSS styling was updated to enhance visual appeal with a clean, centred layout and a cohesive colour scheme. JavaScript functions were adjusted to handle transitions between pages, store user data in local storage, and personalise the welcome message based on the user's Display Name. 

03.11.24
Updates were made to the HTML structure of TaskNest, enhancing functionality and user experience. A new "Today's Top 5 Goals" section with an interactive goal-adding feature was added to the homepage, alongside an updated Pomodoro Timer section with a sleek timer display and start button. A Task Modal was introduced to streamline task creation, featuring input fields for task name, due date, priority, and category, along with a responsive pop-up design. The welcome message was also refined for personalisation, dynamically displaying the user's name. These updates improve interactivity and usability across the platform.

04.11.24
On 04.11.24, I reorganised the structure by creating a separate Home Page for better code organisation and easier navigation. I implemented the "Add Task" section, allowing users to input task details such as name, due date, and priority levels. Additionally, I added a functional Pomodoro Timer set to 25 minutes. However, some issues arose: the timer only starts after a task is added, the homepage layout appears cluttered, and tasks are being displayed in the wrong sections. Further adjustments are needed to refine functionality and improve design consistency.

05.11.24
I enhanced the user interface by adding a title bar that remains fixed during scrolling for improved navigation. The goals section was refined, allowing users to properly add up to five goals per day, with a restriction after the fifth goal. I also began implementing a task sorting feature, enabling users to organise tasks by priority, due date, or category. Additionally, I updated the Pomodoro Timer to include a 5-minute break option, enhancing its functionality for productivity cycles.

10.11.24
I changed the interface layout to make it more visually appealing, user-friendly, and organised, ensuring easier navigation and accessibility. I also reinforced the goals section by setting a clear limit of five goals per day. While attempting to improve the Pomodoro Timer, I encountered some issues that disrupted its functionality, but I will resolve these soon.

20.11.24
I remodelled the home page layout, focusing on improving the overall aesthetic and user interface by reorganising elements for better visual balance and accessibility. While the existing features like task management, goals, and the Pomodoro timer remain functional, I worked on enhancing their design for a more cohesive and appealing look. Additionally, I began integrating a calendar feature to provide users with a more comprehensive tool for managing their schedules directly within the app.

21.11.24
I removed the login and sign-up pages to streamline the user experience and focus on core functionality. I added a new HTML structure featuring a side navigation bar with buttons for "Home," "Pomodoro," and "Calendar" to improve navigation. The main content section was redesigned with a header for sorting tasks and a new task input modal, which allows users to add tasks with a name, due date, category, and priority level. The updated layout ensures better organisation and readability, while the simplified structure enhances usability.

22.11.24
I updated the HTML structure to improve task management and user interaction. The sidebar now includes the logo with a text label ("TaskNest") for a more personalised touch. The main content section was enhanced with a "Sort By" button that reveals sorting options for tasks (Due Date, Priority, Category) via a dropdown. Additionally, the task modal was restructured with clearly labelled fields for task name, due date, category, and priority level to improve the user experience. These updates enhance the overall aesthetic and functionality of the page while maintaining the focus on task management. I also added all the files inside the backend folder needed but they are not connected. 

23.11.24
I successfully connected the backend and front end of the app, allowing data entered on the front end to be saved and updated in the back end. This integration ensures that tasks added via the user interface are now reflected in the backend, creating a seamless workflow between the two. This update marks a significant milestone, as it allows for dynamic data management across the app, enhancing its functionality.

27.11.24
I redesigned the TaskNest app's homepage and task modal. The homepage now features a streamlined design with a task section that encourages users to add their first task, complemented by a floating "Add Task" button. The task creation modal has been enhanced with fields for task name, due date, priority, and category, offering dropdown menus for selection. A footer with buttons for sorting tasks and displaying fun facts has also been added. To simplify the layout, the sidebar navigation and task sorting dropdown were removed, creating a cleaner, more focused user interface.

29.11.24
I added the "Edit" and "Delete" buttons to the front end of TaskNest, allowing users to modify or remove tasks. I also reconnected the front and back, fixing issues caused by accidentally changing some class names. This ensures that the task actions are now correctly reflected in both the user interface and the backend database.



01.12.24
I created the Pomodoro timer page, but I'm facing a few issues. My pages aren't properly connected, so the buttons don't work to switch between the Pomodoro and Break pages. The timer also starts slow, which seems to be a problem with the JavaScript functions. Plus, the interface isn't fully complete yet, and some elements are missing. I need to fix the button functionality, improve the timer's speed, and finish styling the interface to make everything work smoothly.

03.12.24
I added a "Done" button to the interface, allowing users to mark tasks as completed. I also implemented alerts for both the "Delete" and "Done" buttons to confirm the actions, ensuring users are notified before performing these tasks. This should help improve the user experience by preventing accidental actions.

05.12.24
I started working on making the PWA downloadable by adding the manifest.json file. This is an important step toward making the app installable on users' devices. Additionally, I updated the colour scheme to improve the visual aesthetics, giving the app a refreshed and more cohesive look.

07.12.24
I improved the Pomodoro timer page by matching it to the app's colour scheme for a more cohesive look. I also attempted to add the manifest.json and service worker files to make the app downloadable as a PWA. The manifest.json includes the app name, icons, and theme, while the service worker is set to cache assets for offline use. However, the implementation faced issues: the service worker didn't register correctly, meaning the caching functionality didn’t work, and the app wasn’t being recognised as a PWA. Despite these errors, I was able to make design improvements.

09.12.24
I figured out why my pages weren’t connecting properly and successfully linked them together. After troubleshooting, I resolved the issue and ensured that the pages now work as intended, allowing for smooth navigation across the app.

10.12.24
I managed to get my manifest file working by fixing some issues. The app now has the correct icons, start URL, and other configuration details in the manifest. However, the service worker still isn't functioning correctly. I tried to set it up, but it seems there's still an issue preventing it from working as intended.

11.12.24
I continued troubleshooting my service worker, but it is still not functioning correctly. Additionally, I added a sorting feature to my project, which works fine, but I'm encountering an issue: it only works when I press "Run and Debug" instead of "Go Live." The sorting functionality is set up in the dropdown, where users can sort by due date, priority level, or category (such as school, work, personal, and other). However, this issue with "Go Live" prevents it from working consistently in the browser.

12.12.24
First, I changed the quote that is displayed in the footer. Second, I fixed a small error where the "Add Your First Task" widget wasn't removed after the first task was added, ensuring the user interface was cleaner once a task had been created.
