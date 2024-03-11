# REACT PRACTICE TWO

## Description:

- Getting started with react hooks and Storybook

## Targets:

- Known how to state management with useReducer and useContext.
- Understand and know how to use SWR
- Understand and know how to use react-router-dom
- Design the database 

## Features:

- Render UI
- Call API
- Show users
- Search users
- Create user
- Read user
- Update user
- Delete user
- View details user
- Form validation
- Assign rule(s) to user
- Assign role(s) to user
- Navigate to the role, rule, or user when click on the corresponding user or item
- Create role
- Read role
- Update role
- Delete role
- Search role
- View details role
- Assign rule(s) to role
- Assign member(s) to role
- Read rule(s)
- Search rule
- View details rule

## Design on site:

[Design](<https://webix.com/demos/user-manager/>)

## Requirments:

[Link](https://docs.google.com/document/d/1GxT1csc-IOA16DXKXj0ncksQ4t2IlDAXXQ097_CHqrc/edit?usp=sharing)

## Diagram:
![ERD](https://github.com/LinhNguyen2606/react-training/assets/91473355/70aa23d2-c905-40f7-a0b2-1150c942fa64)

## Deploy:

- App: [Here](https://user-role-rule-management.vercel.app/)

## Information:

- Time line: 29/01/2024 -> 06/03/2024
- Editor: Visual Studio Code
- Supported browser: Chrome lasted

## Environments:

- Node: v18.16.0
- Vite: Vite requires Node.js version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

## .env:

- VITE_API_BASE_URL=http://localhost:3000

## Folder structure

practice-two

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
        |-- Avatar
        |-- Button
        |-- ColorField
        |-- DateView
        |-- Drawer
                |-- DrawerItem
        |-- ErrorFallback
        |-- FormGroup
        |-- Icons   
        |-- Modal
            |-- ModalBody
            |-- ModalFooter
            |-- ModalHeader
        |-- Panel
            |-- AssignBody
                |-- AssignItemAvatarText
                |-- AssignItemTextTags
            |-- AssignHeader
            |-- AssignItems
            |-- AssignRoleMembers
            |-- AssignRoleRules
            |-- AssignRoleRules
            |-- AssignUserRules
            |-- AssignUserRules
            |-- EditorProfile
            |-- EditorRole
        |-- Popover
            |-- PopoverContent
        |-- RadioField
        |-- SearchBar
        |-- Sidebar
            |-- AvatarLabelView  
            |-- ListView  
            |-- SidebarHeader  
            |-- SidebarInfo  
        |-- Spin
        |-- Status
        |-- Switch
        |-- Table
            |-- TableHeader
                |-- TableHeaderCell
            |-- TableRow
                |-- TableRowCell
                |-- TableRowItem
        |-- Tabs
        |-- TextArea
        |-- TextField
        |-- TextView
        |-- Toast
        |-- UploadImage
        |-- index.ts
    |-- constants
        |-- config.ts
        |-- index.ts
        |-- message.ts
        |-- path.ts
        |-- type.ts
    |-- helpers
        |-- convert.ts
        |-- date.ts
        |-- extract.ts
        |-- fetcher.ts
        |-- find.ts
        |-- generate.ts
        |-- get.ts
        |-- highlight.ts
        |-- index.ts
        |-- is.ts
        |-- transform.ts
        |-- validate.ts
    |-- hooks
        |-- index.ts
        |-- useClickOutSide.ts
        |-- useDebounce.ts
    |-- interfaces
        |-- data.ts
        |-- enitity.ts
        |-- index.ts
        |-- item.ts
        |-- navigate.ts
        |-- response.ts
        |-- role.ts
        |-- roleRule.ts
        |-- rule.ts
        |-- user.ts
        |-- userRole.ts
        |-- userRule.ts
    |-- pages
        |-- Error.tsx
        |-- Home.tsx
        |-- index.ts
        |-- Layout.tsx
        |-- Role.tsx
        |-- Rule.tsx
    |-- routes.tsx
        |-- index.tsx
    |-- services
        |-- index.ts
        |-- role.ts
        |-- rule.ts
        |-- user.ts
    |-- stores
        |-- context.tsx
        |-- index.ts
        |-- provider.tsx
        |-- reducer.tsx
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
|-- vercel.json
|-- vite.config.ts
```

## Getting started:

- Step 01: Clone repository with HTTPS:

```
git clone https://github.com/LinhNguyen2606/react-training.git
```

- Step 02: Change to branch feature/practice-two:

```
git checkout feature/practice-two
```

- Step 03: Move to practice-two folder which just cloned in your computer:

```
cd practice-two
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
- Step 01:  Open the folder practice-two
~~~
cd practice-two
~~~

- Step 02: Run the storybook
~~~
pnpm run storybook
~~~

## Run the server
- Step 01:  Open the folder practice-two
~~~
cd practice-two
~~~

- Step 02: Run the server
~~~
pnpm run server
~~~
