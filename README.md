# What You Looking App?

What You Looking App? is a mobile app for Android created using React Native and ViroReact. It allows the user to see an augmented reality (AR) view of their surroundings. Points of interest (POIs) in the vicinity are overlaid with an icon, which can be tapped to display more detailed information about this specific POI.

This app was developed as part of the Northcoders Software Engineering Bootcamp in May 2024.

## Table of contents

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

1. Open the app.
2. Raise your device and turn to face a local POI
3. Icons will appear in the AR scene relating to POIs in the vicinity
4. Tap an icon to display information about the POI
5. Tap 'Back' to return to the AR view
