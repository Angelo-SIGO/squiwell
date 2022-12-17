# SQUIWELL

![](https://img.shields.io/github/license/Angelo-SIGO/squiwell)
![](https://img.shields.io/npm/v/squiwell?label=version)

Squiwell is command line tool that store your project templates to save time when starting a new project.

## Contents

- [Getting started](#getting-started)
    - [Add template](#add-template)
    - [Use template](#)
    - [Edit template](#)
    - [Delete template](#)
- [How does it work](#how-does-it-work)

## Getting started

```bash
# Install squiwell globally
npm add -G squiwell
```

### Add template

```bash
squiwell --store 'path/of/the/template' ...
```

### Use template

```bash
squiwell --seed
```

### Edit template

```bash
squiwell --modify
```

### Delete template

```bash
squiwell --forgot
```

## How does it work

First, squiwell stores user-provided folders in a storage directory (by default is a folder called ***templates***). When at least one template is stored, the user will be able to create a new project from a chosen template and edit it, or remove it.

Any of the options above will show a form in the terminal / CLI. When creating a new project, squiwell will use the current working directory in the terminal to create the project.

## License

© 2022, Angelo Silva. All files are relesead under the MIT license.