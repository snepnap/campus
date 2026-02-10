# Guru Ghasidas Vishwavidyalaya (GGU) Connect App
An enhanced version of the College Connect student portal, specifically tailored for Guru Ghasidas Vishwavidyalaya (Central University).

## DESIGN SYSTEM (REQUIRED)
- **Platform:** Web, Desktop-first (responsive)
- **Theme:** Academic, Prestigious, Central University Vibe
- **Typography:** Inter or Roboto (Clean, readable)
- **Color Palette:**
  - **Primary:** Royal Blue (#1e3a8a) - Representing depth and stability.
  - **Secondary:** Saffron Orange (#ea580c) - Accent color, often associated with Indian institutions.
  - **Neutral:** Slate Grays (#64748B) and White (#FFFFFF).
  - **Background:** Light warm gray (#f8fafc) for readability.

## Functional Requirements & Missing Features
The following features are MISSING or need enhancement based on the university context:

1.  **University Identity:**
    *   Update all branding to "Guru Ghasidas Vishwavidyalaya".
    *   Use GGU-specific imagery or placeholders (e.g., Campus main gate, Administrative building vibe).

2.  **Syllabus Repository (New Feature):**
    *   **Dedicated Page:** `/syllabus`
    *   **Structure:** Categorized by School/Department (e.g., School of Engineering & Technology, School of CS & IT).
    *   **Data:** Include mock syllabus data for:
        *   **B.Tech CSE:** Data Structures, OS, AI, Networks.
        *   **MCA:** Advanced Java, Python, Soft Computing.
        *   **Mechanical:** Thermodynamics, Fluid Mechanics.
    *   **Action:** Ability to "View" or "Download PDF" (mock button).

3.  **Enhanced Dashboard:**
    *   **Academic Calendar Widget:** Show current semester status (e.g., "Odd Semester - Mid Terms approaching").
    *   **Department News:** Specific notices (e.g., "Scholarship forms due", "Techfest registration").

4.  **Login/Registration:**
    *   **Fields:** Ensure "Enrollment Number" format matches GGU style (e.g., `GGV/19/0123`).
    *   **Role Selection:** Student vs Faculty (for future proofing, keep UI simple for now).

## Execution Plan
1.  **Refine UI:** Update `globals.css` (if needed) and component styles to match the new palette.
2.  **Update Pages:**
    *   `src/app/page.tsx` (Login): Rebrand to GGU.
    *   `src/app/layout.tsx`: Update metadata.
    *   `src/app/dashboard/page.tsx`: Add branded header, update mock data.
3.  **Create Syllabus Page:**
    *   `src/app/syllabus/page.tsx`: Implement the course/subject tree view.
