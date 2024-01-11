# REACT PRACTICE ONE

## Description:

- Getting started with react hooks and Storybook

## Targets:

- Apply Storybook into practice
- Apply learned hooks: useState, useEffect, useRef
- Apply JSON Server into practice

## Features:

- Render UI
- Call API
- Show users
- Search users
- Add user
- Remove user
- Update user
- Form validation

## Design on site:

[Design](<https://webix.com/demos/user-manager/>)

## Requirments:

[Link](https://docs.google.com/document/d/1GxT1csc-IOA16DXKXj0ncksQ4t2IlDAXXQ097_CHqrc/edit?usp=sharing)

## Deploy:

- App: [Here](https://react-training-swart-tau.vercel.app/)

## Information:

- Time line: 21/12/2023 -> 09/01/2024
- Editor: Visual Studio Code
- Supported browser: Chrome lasted

## Environments:

- Node: v18.16.0
- Vite: Vite requires Node.js version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

## .env:

- VITE_API_BASE_URL=http://localhost:3000

## Folder structure

practice-one

```
|-- json-server
    |-- db.json
|-- src
    |-- assets
        |-- fonts
        |-- icons
        |-- images
        |-- logo
    |-- components
        |-- DataDisplay
            |-- Avatar
            |-- Drawer
                |-- DrawerItem
            |-- Icon
            |-- Modal
                |-- ModalBody
                |-- ModalFooter
                |-- ModalHeader
            |-- Panel
                |-- EditorProfile
                |-- Tabs
                |-- TextView
            |-- Status
            |-- Table
                |-- TableHeader
                    |-- TableHeaderCell
                |-- TableRow
                    |-- TableRowCell
                    |-- TableRowItem
            |-- index.ts
        |-- FeedBack
            |-- Progress
        |-- Inputs
            |-- Button
            |-- SearchBar
            |-- TextArea
            |-- TextField
            |-- ToggleSwitch
            |-- UploadImage
            |-- index.ts
        |-- Surfaces
            |-- Card
                |-- ViewDetails
                    |-- InfoItem
            |-- index.ts
        |-- index.ts
    |-- constants
        |-- config.ts
        |-- data.ts
        |-- index.ts
        |-- message.ts
        |-- users.ts
    |-- helpers
        |-- date.ts
        |-- delay.ts
        |-- extract.ts
        |-- generate.ts
        |-- highlight.ts
        |-- index.ts
        |-- validation.ts
    |-- hooks
        |-- useFilterUsers
        |-- useSpinnerToast
        |-- index.ts
    |-- interfaces
        |-- column
        |-- data
        |-- response
        |-- user
        |-- index.ts
    |-- services
        |-- index.ts
    |-- styles
        |-- base
        |-- components
        |-- layout
        |-- pages
            |-- home
        |-- utilities
        |-- index.scss
    |-- App.tsx
    |-- main.tsx
    |-- App.tsx
    |-- main.tsx
|-- .env  
|-- .eslintrc.cjs
|-- .gitignore
|-- .prettierrc
|-- index.html
|-- package.json
|-- pnpm-lock.yaml
|-- README.md
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
```

## Getting started:

- Step 01: Clone repository with HTTPS:

```
git clone https://github.com/LinhNguyen2606/react-training.git
```

- Step 02: Change to branch feature/practice-one:

```
git checkout feature/practice-one
```

- Step 03: Move to practice-one folder which just cloned in your computer:

```
cd practice-one
```

- Step 04: Install packages:

```
pnpm install
```

- Step 05: Finally run with:

```
pnpm run dev
```

- Step 06: Open browser:

```
Open http://localhost:5173/ in browser.
```

## Run the storybook
- Step 01:  Open the folder practice-one
~~~
cd practice-one
~~~

- Step 02: Run the storybook
~~~
pnpm run storybook
~~~

## Run the storybook
- Step 01:  Open the folder practice-one
~~~
cd practice-one
~~~

- Step 02: Run the storybook
~~~
pnpm run storybook
~~~

## Run the server
- Step 01:  Open the folder practice-one
~~~
cd practice-one
~~~

- Step 02: Run the server
~~~
pnpm run server
~~~