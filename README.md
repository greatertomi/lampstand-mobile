# Lampstand Mobile

This is a mobile application project built with React Native. The project uses TypeScript and Yarn for package management, and it also includes Storybook for component development and testing. The project enforces conventional commit rules using Commitlint.

## Prerequisites

- Node.js
- Yarn
- Expo CLI

## Setup

1. Clone the repository:

```bash
git clone https://github.com/greatertomi/lampstand-mobile.git
```

2. Navigate to the project directory:

```bash
cd lampstand-mobile
```

3. Install the dependencies:

```bash
yarn install
```

## Running the Project

To start the project, you can run:

```bash
yarn start
```

This will start the Expo developer tools in your browser. From there, you can run the app on an Android or iOS simulator, or on a physical device.

## Storybook

Storybook is a tool for developing UI components in isolation. To start Storybook, run:

```bash
yarn storybook
```

## Commit Message Guidelines

This project uses Commitlint to enforce [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) rules. This means that all commit messages should follow the Conventional Commits specification. The commit message should be structured as follows:

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

For example:

```bash
feat(button): add a 'disabled' state
```

## Building the Project

To build the project on expo, you can run:

```bash
eas build --profile=development | production --platform=android | ios | all
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
