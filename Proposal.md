DRAFT

# Motivation

Provide set of the SDK's that can be used for Cordova based development.
Provide best performance and user experience on the platform.

# Solution

Pure javascript solution for the mobile configuration and orchiestraction that will allow cooperability between JavaScript and Native. Mixing both existing Native plugins and pure JavaScript based solutions was identified as the most reasonable aproach. 

# Advantages of the solution 

- Significantly reduced effort to develop and maintain Cordova Support by reusing available components.
- Aligned with the way cordova works (single plugin to do specific *native* job, integrated with others in JavaScript)
- Ability to reuse existing cordova plugins that perform native tasks (push notifications, sync, auth)
- Ability to wrap existing JavaScript solutions and use them without 
- Ability to select and use only elements that are needed in the app.

All points were confirmed by investigations bellow!

# Unanswered questions

## Collecting all plugins into single repository

Since some of the plugins like push are already in separate repository this can be seen as additional effort. 
It may also complicate distribution as community preffers to have 1 plugin per repository and cordova cmd is optimized.
I do not have strong opinions about this one but it feels like leaving things separate and having some aggregator repository with example application that links to all plugins and have parser code will be the best way.

# Architecture

## Config parsing 

Cordova config plugin not needed. 
Due to trivial implementation no need for core module like in Android and IOS.
Configuration can be parsed by pure JavaScript library:

```
var config = require('mobile-config.json')
var ConfigLib = require('aerogear-services')

var keycloak = ConfigLib(config).getKeyCloakConfig()
```

## Individual SDK's

Using existing cordova plugins or creating new cordova plugins for services that do not have it.
Example:

```
// TODO build option without using browserify (require)
var config = require('mobile-config.json')
var ConfigLib = require('aerogear-services')

var keycloakConfig = ConfigLib(config).getKeyCloakConfig()

cordova.auth.init(keycloak)
```

This is typically how cordova based solutions work and it will be intiutive for developers to 

# Investigation process

All investigations and different variations of architecture will be available in following repository:
https://github.com/wtrocki/CordovaSandbox

## POC for Core

1. Wrapping core into plugin. 
1. Writing pure JS helper.

Wrapping core into plugin was proven impossible and innefective:
- Core android IOS providing helpers that are available on cordova/javascript
- Only parser needed to be extended.
- The way Android instantiates service will not be compatibile with Cordova 
- Wrapping core into cordova plugin will put some limitations on native implementation we want to avoid.
Providing native objects was not possible etc. because we needed to instantiate them in JavaScript.
IOS worked fine but it still included lots of code that is not needed.
JavaScript configuration parser/processor was implemented using plain JavaScript.
This was proven to be the most efficient way to resolve configuration parsing problem.

## Interactions between services (binding)

TODO Link github example

## Investigating individual services

### Push
TODO - describe what was done

### Auth
TODO - describe what was done

### Feedhenry Sync
Feedhenry Sync was picked as sync solution.

### Metrics
TODO - describe what was done

# Possible limitations

*Outdated*

Solution will be able to reuse existing cordova plugins like push, however to effective manage and build cordova plugins, both IOS and Android AeroGear Services SDK should not contain any SDK business specific related code.
Instead it should just link to the library that can be then also wrapped to the Cordova plugin on different repository.

I identified a couple solutions to extract existing code from SDK, but it will be best to apply this aproach across the board, as in most cases code for the actuall solution will be comming as dependency to individual module in AeroGear Services SDK.

