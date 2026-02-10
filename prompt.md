# College Connect - Student Portal

A modern, responsive web application designed for college students to access academic resources and campus updates.

## DESIGN SYSTEM (REQUIRED)
- **Platform:** Web, Desktop-first (responsive)
- **Theme:** Clean, Academic, Trustworthy
- **Typography:** Sans-serif (Inter/System), legible and modern.
- **Color Palette:**
  - **Primary:** Scholastic Blue (#2563EB) for buttons, links, and accents.
  - **Secondary:** Slate Gray (#64748B) for secondary text and borders.
  - **Background:** Off-White / Slate 50 (#F8FAFC) for the main canvas.
  - **Surface:** Pure White (#FFFFFF) for cards and modals.
  - **Success:** Emerald Green (#10B981) for positive feedback.
  - **Error:** Rose Red (#E11D48) for alerts.
- **Components:**
  - **Buttons:** Rounded-md (6px), medium weight.
  - **Cards:** White background, subtle shadow-sm, rounded-lg.
  - **Inputs:** Gray-200 border, focus ring-2 ring-blue-500.

## Page Structure

### 1. Landing / Login Page
- **Header:** Simple logo "College Connect" (top left).
- **Hero Section:** Two-column layout (on desktop).
  - Left: Welcome message "Your Campus, Connected."
  - Right: Login/Register Card.
- **Login Card:**
  - Toggle between Login and Register.
  - **Login:** Enrollment No, Password. "Login" button.
  - **Register:** Name, Enrollment No, Course, Password. "Register" button.
- **Footer:** Simple copyright and "Help" link.

### 2. Student Dashboard
- **Sidebar:** Navigation (Home, Notes, PYQs, Events, Profile).
- **Header:** User greeting ("Welcome back, Anand"), Search bar, Notification bell.
- **Main Content:**
  - **Upcoming Events:** Horizontal scroll or grid of event cards (Date, Title, Location).
  - **Recent Notes:** Grid of note cards (Subject, Topic, Author, Download icon).
  - **Quick Actions:** FAB or Button to "Upload Note" or "Ask Question".

### 3. Notes Repository
- **Filter/Search:** By Subject, Year, Type (Note/PYQ).
- **List/Grid View:** Display of resources.
- **Upload Modal:** Form to contribute content.
