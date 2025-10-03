# Prettier Setup with Tailwind CSS Class Sorting

## Installation

To complete the setup, install the required dependencies:

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss eslint-config-prettier eslint-plugin-prettier
```

## Configuration

The project is configured with:

- **`.prettierrc`** - Prettier configuration with Tailwind CSS plugin
- **`.prettierignore`** - Files to exclude from formatting
- **`.vscode/settings.json`** - VS Code settings for automatic formatting
- **`eslint.config.mjs`** - ESLint configuration with Prettier integration

## Features

### Tailwind CSS Class Sorting
The `prettier-plugin-tailwindcss` automatically sorts Tailwind CSS classes according to the official Tailwind CSS class order:

1. Layout (position, display, etc.)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (text, font)
5. Backgrounds
6. Borders
7. Effects (shadows, opacity)
8. Transforms and transitions

### Example
Before formatting:
```jsx
<div className="flex bg-white flex-col rounded-lg border-2 border-blue-300 shadow-2xl py-8 px-4 min-w-[500px]">
```

After formatting:
```jsx
<div className="flex min-w-[500px] flex-col rounded-lg border-2 border-blue-300 bg-white px-4 py-8 shadow-2xl">
```

## Usage

### Format all files:
```bash
npm run format
```

### Check formatting without changing files:
```bash
npm run format:check
```

### VS Code Integration
- Install the "Prettier - Code formatter" extension
- Format on save is enabled
- ESLint integration is configured

## Scripts

- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted
- `npm run lint` - Run ESLint 