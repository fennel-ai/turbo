# Fennel Docs

!TODO

## Contributing

## Local Development w/ Symlinked Content

First if you're in VS Code (can maybe do similar with other editors?) I'd recommend opening the turborepo, then going to `File > Add Folder to Workspace` and opening the `docs` directory in the [`client`](https://github.com/fennel-ai/client) repo from wherever it is locally on your machine.

> You can now do `File > Save Workspace As...` to save the workspace setup as-is so you can come back to it.

> **NOTE**: 
> You don't have to do any of this if you just want to edit the content and not work on any code for the UI of the docs. See the [`docs`](https://github.com/fennel-ai/client/docs) source files in the client repo for more information. 
> This setup can be useful though if, for example, you're working on a new markdown block component and want to test it out with hot-reloading.

Now open your terminal, `cd` to the turborepo and run:

```sh
# From the root of the turborepo: 
cd apps/docs && \
ln -sFf ~/Code/fennel/client/docs _content/main
```
> Note:
> replace `~/Code/fennel/client/docs` with the path to the `client` repo on your machine

**Make sure you don't already have a `_content` folder in `./apps/docs` first!**

This will symlink your local copy of the documentation content into the `_content` folder, and any updates made will trigger Next to hot-reload.

Finally, in your `.env` set `MODE=EDIT` so that we skip the network fetch for content. If there is a branch on the client repo that you want to view the content for, you can checkout said branch locally from the client dir on your machine, and it will be used for the previews 
