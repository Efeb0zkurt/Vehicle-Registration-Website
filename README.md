# COMP1004 Coursework – Extra Work Summary

## Student Info
- Name: Efe Bozkurt
- Student ID: 20675226

---

## HTML

I made three pages for this coursework: `index.html`, `vehicle-search.html`, and `add-vehicle.html`.  
Each page uses semantic tags like `<header>`, `<main>`, `<aside>`, and `<footer>`, and the navigation menu is a `<ul>` inside the header.

Every page has a different `<h1>` heading, and there's at least one image in each sidebar.

To improve accessibility, I used labels for all inputs and made sure all images have alt text.  
I ran Lighthouse on all pages and got a 100 accessibility score. Screenshot is included (`lighthouse-accessibility.png`).

---

## CSS

All pages use one CSS file (`style.css`).

I used flexbox to display the nav links horizontally and removed bullet points using `list-style: none`.  
For the layout, I used CSS Grid with a sidebar-to-main ratio of 1:4. Header and footer go full width.

Each section (header, main, aside, footer) has padding, margin, and a 1px black border.

I added a media query to make the layout responsive when the screen is under 500px wide — in that case, the nav becomes vertical and the sidebar moves under the main section.

Screenshot: `responsive-screenshot.png`.

---

## JavaScript & Database

### People Search
- Function: `searchPeople()`
- Lets you search by name (partial and case-insensitive) or license number.
- Shows matching people or error messages if input is missing or wrong.

### Vehicle Search
- Function: `searchVehicle()`
- Lets you search by registration plate.
- It shows the vehicle info and also the owner’s name and license (if they exist).

### Add Vehicle
- Functions: `checkOwner()`, `addOwner()`, and `addVehicle()`
- You can fill in vehicle details and check if the owner exists.
- If a matching owner is found, you can select them.
- If not, you can fill out a small form to create a new one.
- It checks for duplicates and missing fields before saving.

---

## Playwright Testing

I tested the site using the sample `coursework-sample.spec.js` file.  
I ran it using Live Server at: `http://127.0.0.1:5500/index.html`.

All the required parts passed:
- Page headings, links, and structure
- People search worked with multiple results
- Vehicle search showed the right car and owner
- Add vehicle worked (with both existing and new owners)

No issues came up. Everything returned the expected results.  
Optional screenshot: `playwright-test.png`

---

## Final Notes

I kept the Supabase database exactly the same as the original data — no changes to the people or vehicle tables.

I used real sample values from the CSVs to test things, like “Rachel” for people and “KWK24JI” for vehicles.

