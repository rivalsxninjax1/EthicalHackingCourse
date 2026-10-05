# CYBERLAB: 64-hour ethical hacking program

## Run locally
Open index.html in a browser, or serve the folder: `python3 -m http.server 8000` then visit http://localhost:8000.
Use a local server if your browser keeps separate storage per file:// page.

## Deploy / embed
- Standalone: upload the whole folder to any static host.
- Embedded section: link to chapters/chNN.html from your site.
- iframe: `<iframe src="chapters/ch01.html" style="width:100%;height:90vh;border:0"></iframe>`

## Progress
Stored in your browser (localStorage key `cyberlab`): completed modules, quiz scores, lab checks, notes. No server.

## Customise
- Name and tagline: BRAND in core/course.js.
- Colours and type: variables at the top of core/styles.css.

## Add or deepen a chapter
See PROJECT.md. Each chapter is one HTML file containing one DEEP[N] data script; set STATUS in core/course.js.
