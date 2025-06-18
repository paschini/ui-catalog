# Ubiquiti Catalog

## Our catalog tool!
### Tech Stack
- Node.js: v23.11.0 or later
- React: 19.1.0
- TypeScript: 5.8.3
- Package Manager: npm

## Development
### How to run:
- Run `npm install`

- Then run: `npm run dev`

### Tests
- Run: `npm test`

### Build for production
- Run `npm run build`

## Web broswer support:
- Chrome (supported)
- Safari (supported, has some differences in scrollbar appearaance)
- Firefox (supported, untested)
- Edge (unsupported, has restrictions)


#### Rendered list view:
![List View page](/src/assets/listview.png)

#### Rendered grid view:
![Grid View page](/src/assets/gridview.png)

## Features:
- The search input accepts text and will find devices based on a product name or abbreviation.
- Clicking an item in the search list will navigate to the device's details page.
- The filter button will show options to filter the devices from a single or many chosen product lines.
- Search will work while the views are filtered, allowing to search only in the filtered items.
- Changing views from list to grid and vice-versa has no effect on filters.
- Clicking the U logo sends you back to the list view and clears all filters.
- The data is cached locally, and the app will only call the server once per day to obtain a list of devices.
- Images are also cached locally.
- the search list and filter list will close themselves when the user clicks outside of their frames.

## Layout and Responsiveness
- The layout is responsive and resilient. I do not recommend tiny screens, though. Not tested on phones. Tested on Chrome.
- Errors, if any happens, will be listed at the bottom at a footer panel that is invisible otherwise. Important errors are also logged to the console.
- All icons have been exported from the Figma file included.
- The app uses the "Lato" font, since it was the closest to the Ubiquiti font I could find, and I could not extract the original font from the Figma file.

## Caveats:
- There is no router, so it is not possible to bookmark a single device page, or save the filters between sessions.
- Adding a router is easy to do, but wouldn't bring any advantages besides bookmarking to the app at the moment. When expanding the app beyond current features,
I'd consider adding a router given that navigation gets complex.
- I don't care about Edge. I will care about Edge if explicitly told to care about Edge.

My reason to not care about edge for this project is that Edge has weird content width, height and window shapes, so styles behave weirdly at the edges.
Given that we MUST support edge, it would probably require special styles in certain places, going beyond the css annotations like `&::-webkit-scrollbar'`.

# CoreVitals
The app has been optimised for balanced Core Vitals. Even with all the images we are loding, the paint times are very good:

![Grid View page](/src/assets/corevitals.png)

# Improvements proposed with help of backenders:
- BE based cursor navigation, recommended when the total number of devices exceeds the thousands.
- FE infinite loading - only if the DB is capable of providing cursor based navigation.

