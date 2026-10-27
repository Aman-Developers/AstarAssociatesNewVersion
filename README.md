# Astar Associates — Website

**A Complete Construction Revolution**

A six-page static website built with plain HTML5, CSS3 and vanilla JavaScript. It has no frameworks and no build step. To view it, open `index.html` in a browser.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero slider, Why Choose Us, Our Services |
| `services.html` | Services: descriptions and image cards for all six service areas |
| `about.html` | About: Who We Are, Mission and Vision, Why Choose Us, company facts, CTA |
| `gallery.html` | Gallery: category filters, project grid, lightbox with photos and videos, CTA |
| `team.html` | Team: 12 team members, Chief Organiser feature, CTA |
| `contact.html` | Contact: contact details, enquiry form, map, company facts |
| `our-team.html` | Redirects to `team.html` so the old team URL keeps working |

## Structure

```
css/style.css     all styles (variables, layout, components, responsive rules)
js/script.js      icons, navigation, hero slider, gallery filter and lightbox,
                  form validation, counters, scroll reveal
assets/logo/      logo and favicon
assets/home/      hero slides, Why Choose Us image, service card images
assets/about/     About page images and CTA background
assets/gallery/   gallery photos, walkthrough videos and their poster frames
assets/team/      team portraits and team hero
assets/contact/   contact hero
images1/          original image files from the previous site (kept for reference)
```

Most files in `assets/` are resized, renamed copies of the originals in `images1/`. The restored gallery photos use their original files and descriptive names.

## Editing notes

- **Company facts** (`about.html`, `contact.html`): displayed figures are 10+ years, 6 services, 13 team professionals and the 2016 firm registration. The 13 people count is based on the old team roster, including the Chief Organiser. Figures such as projects completed, clients or awards are left out until the company confirms them. To add one, copy a `.stat` block.
- **Gallery categories**: each item's `data-category` holds category keys such as `residential commercial`. A filter button with no matching items is hidden automatically. The Industrial and Structural Work filters are currently hidden because no photos are tagged with those categories yet.
- **Enquiry form**: no server is connected. After the form passes validation, it prepares an email to `astarassociates@yahoo.in` and gives the visitor a link to send it from their email app. To deliver messages directly, connect a form backend.
- **Social links**: only the existing Instagram and WhatsApp links are included. If the company has Facebook, LinkedIn or YouTube accounts, add them to `.social-list` in each page's footer.
- **Icons**: add icons with `<span data-icon="name"></span>`. The available icon names are in `ICONS` in `js/script.js`.
