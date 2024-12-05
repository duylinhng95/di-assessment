# Detector Inspector Software Engineer Challenge

## Pre-requisites

- Node.js (v20+)
- NPM (v6+)
- Puppeteer (installed as part of the dependencies)

## Installation

```bash
npm install
```

## Running the program

Run the CLI with a Wikipedia page URL:

```bash
npm start -- <url> [options]
```

Options:

- `--output` or `-o`: Output file name (default: `output.png`)
- `--help` or `-h`: Show help message
- `--version` or `-V`: Show version number

Example:

```bash
npm start -- https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
```

## Testing

```bash
npm test
```
