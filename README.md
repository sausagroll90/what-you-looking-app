# What You Looking App?

_What You Looking App?_ is a mobile app for Android created using React Native and ViroReact. It allows the user to see an augmented reality (AR) view of their surroundings. Points of interest (POIs) in the vicinity are overlaid with an AR object, which can be tapped to display more detailed information about this specific POI.

This app was developed as part of the Northcoders Software Engineering Bootcamp in May 2024.

The details displayed on clicking a POI include Google rating, opening hours (where applicable), POI's website link and an embedded map showing the POI's location relative to the user's current location.

Further functionality is supplied:

- a filter to only display POIs related to specific categories, eg museums, restaurants, etc.
- a map page, displaying all POIs matching the current filters within 1km along with the user's current position
- an alternative AR view displaying locations of nearby upcoming events (from Ticketmaster)
- button to save details of "favourite" POIs
- button to save current location as a custom POI

## Try it out

You can download the app [here](https://www.dropbox.com/scl/fi/mob2ngrmvm3vnyrh7n4us/app-debug.apk?rlkey=z6dnnnzztx09hd8ykigk2o93e&st=tn4r1zl3&dl=0). You will need to enable developer options on your device and turn USB debugging on.

## Installation

Minimum required software versions:

- Node: **21.6.2**
- React: **18.2.0**
- React Native: **0.74.1**
- Android: **11 (Red Velvet Cake) with ARCore**

To install this project locally:

1. Clone the repository:

```bash
git clone https://github.com/sausagroll90/what-you-looking-app.git
```

2. Install dependencies:

```bash
npm install
```

## How to run

Follow the instructions [here](https://reactnative.dev/docs/set-up-your-environment?os=linux&platform=android) to set up your development environment.

To run the project on a connected Android device:

```bash
   npm start
```

## User guide

1. Open the app on your mobile device, holding the device flat as instructed.
2. Raise your device and turn to face a nearby POI
3. Objects will appear in the AR scene relating to POIs in the vicinity
4. Tap an object to display information about the POI
5. Tap 'Home' to return to the AR view
6. Other features can be accessed from the "burger" menu at top left of home screen
