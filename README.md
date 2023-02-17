# User Management

This is an example Angular project which I use for experimenting with different techniques.

It uses [nx](https://nx.dev), [Angular](https://angular.io), [Daisy UI](https://daisyui.com) and [PocketBase](https://pocketbase.io).

## Requirements

- docker & docker compose
- Node.js
- [pnpm](https://pnpm.io)
- [make](https://www.gnu.org/software/make/)

The project was only tested with macOs.

## Installation

1. git clone the project
2. `pnpm i`
3. `make pb && make seed`
4. `make run`

Rename the `.env.example` file to `.env` and replace the values.

Open the PocketBase instance at at `http://0.0.0.0:8080/`.  
Create a admin user that corresponds to the `.env` file.

## Usage

Open a browser window on `http://localhost:4200/`.

PocketBase is available at `http://0.0.0.0:8080/`.

## Testing

Run tests with `make test`.

## Roadmap

This project is in active development.

## License

[MIT](LICENSE)
