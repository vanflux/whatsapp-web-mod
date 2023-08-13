<base target="_blank">

<h1 align="center">
  Whatsapp Web Mod <img width="32px" src="./docs/images/logo.png" />
</h1>

<p align="center">
  An extension to apply mods on Whatsapp Web
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/vanflux/whatsapp-web-mod" />
  <img src="https://img.shields.io/github/actions/workflow/status/vanflux/whatsapp-web-mod/build-release.yml" />
</p>

## Summary

- [Features](#features)
- [**How to install**](#how-to-install)
- [Default theme](#default-theme)
- [Themes and theme configuration](#themes-and-theme-configuration)
- [300+ gradients available for the background](#300-gradients-available-for-the-background)
- [Themes and theme configuration](#themes-and-theme-configuration)
- [Development](#development)
  - [Chrome](#chrome)
  - [Firefox](#firefox)

## How to install

- Install [Tamper Monkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension ([For Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [For Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))
- Visit [This Link](https://github.com/vanflux/whatsapp-web-mod/releases/download/v1.2.1/wwm-vf.user.js) and click on "install"
- Go to [Whatsapp Web](https://web.whatsapp.com/) and click on the mod button to toggle configurations:
- ![](./docs/images/toggle-button.png)

## Features

- Themer (customization)
  - Use or create your own theme!

## Default theme

![](./docs/images/wp-ui.png)

## Themes and theme configuration

![](./docs/images/mod-ui.png)

## 300+ gradients available for the background

![](./docs/images/gradients.png)

## Development

### **Chrome**

- Run `npm install`
- Run `npm run build`
- Go to url chrome://extensions
- Enable development mode
- Load the uncompressed extension and pick the unzipped directory at `build/dev`

### **Firefox**

- Run `npm install`
- Run `npm run build firefox`
- Go to url about:debugging
- Go to This Firefox
- Load temporary add-ons and pick the .zip at at `build/dev`
