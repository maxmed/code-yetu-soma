# Session 2: Web App Scaffold

## Goal

Teams create a working HTML/CSS/JS app shell.

## Students Build

- page layout
- setup form for year/class, learning area, and study need
- topic/question input, with mode/setup controls visible in starter or advanced in the reference app
- output/results area
- revision plan area
- topic tutor or help area
- JavaScript connected to the page

## Starter Option

Use `starter/` as the base. Teams can rename headings, data, and questions.

The reference app shows the fuller Soma Study Coach flow. Students do not need to copy every feature on day one; they should first make the page sections and one button work.

## Concept: Web App Flow

```text
HTML = structure
CSS = appearance
JavaScript = behavior
Data = what the app reasons over
```

## Activity 1: Run The Starter

Open `starter/index.html` in a browser.

Check:

- page loads
- setup/topic controls appear
- button works
- result area displays
- empty states are visible for context/plan/progress/coach sections

## Activity 2: Customize The App

Teams change:

- app name
- target user
- colors
- intro text
- topic/question fields and any setup controls your project needs
- setup fields for grade, learning area, topic, and support type
- section names for plan, resources, progress, or coach

## Activity 3: Connect One Button

Students should identify:

- button ID
- event listener
- function that runs on click
- output element updated by JavaScript

## Debug Checklist

- Is `app.js` loaded after `data.js`?
- Are IDs spelled the same in HTML and JS?
- Is there an error in browser console?
- Did the function run? Add `console.log("clicked")`.

## Team Output

A working page where a user can enter or select information and see at least one result area update.

## Homework

Replace the starter questions/data with your project data.
