# Reaction Browser UI

### Directory Layout

```shell
.
├── /e2e/                            # spec and config files related to e2e testing
├── /node_modules/                   # 3rd-party libraries and utilities
├── /src/                            # Source  directory
│   ├── /app/                        # angular components and all
│   ├── /assets/                     # Static assets and MarvinJS related assets
│   |    ├── /css/                   # Marvin JS related css
│   |    ├── /gui/                   # Marvin JS related GUI
|   |    ├── /images/                # Images
│   |    └── /...                    # etc.
│   ├── /environments/               # Configurations for each environment
│   |    ├── /environments.pod.ts    # Production  environment
│   |    └── /environments.ts        # Development environment
│   ├── index.html                   # application entry point
│   ├── package.json                 # The list of project dependencies and NPM scripts
│   ├── main.ts                      # angular starting point
│   ├── marvin4js-licence.cxl        # MarvinJS licence file
│   ├── polyfills.ts                 # Polyfills needed by Angular
│   ├── style.scss                   # Starting point for styles
│   ├── test.ts                      # initialize the Angular testing environment
│   ├── tsconfig.app.json            # TS configuration for the Angular app
│   ├── tsconfig.spec.json           # TS configuration for the unit tests
│   └── typings.d.ts                 # Typings reference file
├── .editorconfig                    # To define and maintain consistent coding styles
├── angular-cli.json                 # configurations related to angular-cli
├── package.json                     # The list of project dependencies and NPM scripts
├── .gitignore                       # specifies the files that Git should ignore
├── karma.conf.js                    # karma configuration file
├── protractor.conf.js               # configuration information to run the tests
├── tsconfig.json                    # options and flags that guide the TS compiler
└── tslint.json                      # used to configure which rules TSLint should run
```
   ### Prerequisites
 This is [angular CLI](https://cli.angular.io/) generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.
   ### CLI Installation
 ```bash
npm install -g @angular/cli
```
### Installation of dependencies required for project
 ```bash
npm install
```
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
