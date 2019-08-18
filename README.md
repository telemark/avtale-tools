# avtale-tools

A collection of scripts for avtaler

## Usage

Add a local `.env`

```
NODE_ENV=development
MONGODB_CONNECTION=connection-string
MONGODB_COLLECTION=avtaler
MONGODB_NAME=minelev
AVTALE_SERVICE_URL=avtale-service-url
AVTALE_SERVICE_SECRET=avtale-service-secret
```

Run your selected script

## Scripts

### `get-fresh-avtaler`

Retrieves all avtaler for student that is not manual and not signed or cancelled.

Saves result to `data/fresh-avtaler.json`

```
$ node utils/get-fresh-avtaler.js
```

### `check-fresh-avtaler`

Do a get for every avtale in `data/fresh-avtaler.json`

Can be use to force update statistics

```
$ node utils/check-fresh-avtaler.js
```

### `get-avtaler-template`

Template for doing custom queries

Saves result to `data/avtaler-query.json`

```
$ node utils/get-avtaler-template.js
```

### `check-avtaler-template`

Do a get for every avtale in `data/avtaler-query.json`

Saves result to `data/avtaler-downloaded.json`

```
$ node utils/check-avtaler-template.js
```

# License

[MIT](LICENSE)
