# kraken-deno

GitKraken cli for Windows and Mac

## Install

```sh
deno install --quiet --allow-run --allow-env --allow-read --name kraken https://denopkg.com/yuta0801/kraken-deno/index.ts
```

Need permissions

- `--allow-run` for open GitKraken
- `--allow-env` for generate filepath to GitKraken
- `--allow-read` for resolve relative path

## Usage

```sh
# Just start GitKraken
kraken
# Open GitKraken with repo
kraken path/to/repo
# or current directory repo
kraken .
```
