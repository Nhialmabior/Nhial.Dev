# Nhial Mabior Garang — Developer Portfolio (v2)

A premium multi-page portfolio in plain HTML, CSS and JavaScript. No build step, no dependencies.

## Pages
`index.html` Home · `about.html` About · `skills.html` Skills · `projects.html` Projects · `east-afro-hotel.html` Case study · `journey.html` Journey · `contact.html` Contact

## Design
Three colours, flat, no gradients: Paper `#F4F1EA`, Ink `#121212`, Accent `#1F5C46`. Edit the variables at the top of `styles.css`.

## Add your images (manually)
Drop files into the `assets/` folder using these exact names. Each dark placeholder is replaced automatically, and no code change is needed.

| File | Where it appears | Suggested size |
|---|---|---|
| `portrait.jpg` | Home profile card and About page | 1200 × 1500 (4:5) |
| `east-afro-hotel.jpg` | Projects featured card and case study header | 1600 × 1000 |
| `east-afro-1.jpg`, `east-afro-2.jpg`, `east-afro-3.jpg` | Case study "More screens" (rooms, booking, mobile) | 1600 × 1000 |
| `project-01.jpg` | SpendWise card | 1600 × 1000 |
| `project-02.jpg` | Python projects card | 1600 × 1000 |
| `project-03.jpg` | Community web card | 1600 × 1000 |

Tips: use JPG at about 80% quality and keep each file under 300 KB. Crop screenshots from the top of the page.

## Add your CV
1. Put your PDF in `assets/`, for example `assets/cv.pdf`.
2. In `script.js`, set `cv: "assets/cv.pdf"`.

"Download CV" buttons (Home, About, Contact) stay hidden until you do.

## Contact form
Edit the `CONFIG` block at the top of `script.js`:
```js
const CONFIG = {
  email: "",         // Email link, and fallback if no form service
  linkedin: "",      // LinkedIn link
  cv: "",            // e.g. "assets/cv.pdf"
  formEndpoint: ""   // URL from the form service you choose
};
```
When you pick a form service (Formspree, Web3Forms, Getform, Netlify Forms and similar), paste the endpoint URL into `formEndpoint`. The form posts name, email and message and shows a success or error message. A hidden spam-trap field is already included. If you set only `email`, the form falls back to opening the visitor's email app. If neither is set, visitors see "The form isn't connected yet", so connect one before publishing.

Services differ: some need extra hidden fields, or ask you to enable AJAX or JSON submissions. Check your chosen service's documentation.

## Before publishing
- Replace the East Afro Hotel details with anything more specific you want to say about your role.
- Remove any "verify before publishing" notices from the live East Afro Hotel site, and replace stock photos with the hotel's own.
- Verify education details and add real project screenshots and links.

## Deploy
Netlify, Vercel or GitHub Pages. This is a static site with no build command. After you have a domain, add a sitemap, `robots.txt` and a social share image.
