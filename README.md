<div align="center">

<img src="./logo.png" width="400" />

# unproject

Understand and manage all JavaScript/TypeScript projects with one panel.

</div>

## How to start

`unproject` is designed to be very simple and easy to use. Create a `uncli.yml` file in your project root, and add the following content:

```yaml
plugins:
  - specifier: unproject/plugin-home
```

The run the following command:

```bash
npx unproject
```

or if you using `pnpm`, you can run:

```bash
pnpx unproject
```

It will start a local server. Open your browser and navigate to the address shown in the terminal.
