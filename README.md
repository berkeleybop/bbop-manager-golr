[![Build Status](https://travis-ci.org/berkeleybop/bbop-manager-golr.svg)](https://travis-ci.org/berkeleybop/bbop-manager-golr)

# bbop-manager-golr

## Overview

This package is a system for coherently and abstractly managing
communication (callbacks, promises, etc.) with GOlr instances (Solr
servers with a structured schema).

This is a subclass of [bbop-rest-manager](https://github.com/berkeleybop/bbop-rest-manager). The suggested reading list for understanding this package, in order, is:

* [bbop-rest-manager](https://github.com/berkeleybop/bbop-rest-manager) (superclass of bbop-manager-golr)
* [bbop-rest-response](https://github.com/berkeleybop/bbop-rest-response) (superclass of bbop-reponse-golr)
* [golr-conf](https://github.com/berkeleybop/golr-conf) (configuration for bbop-manager-golr)
* this document (subclass of bbop-rest-manager)
* [bbop-response-golr](https://github.com/berkeleybop/bbop-response-golr) (subclass of bbop-rest-response)

The bbop-mananger-golr is an object and API for making queries to, and
getting responses from, a GOlr server. The API allows you to: change
the parameters, add and remove query fields, operate on facets, and
search terms of the query; to make multiple queries; and to handle
different types of responses in different ways. Using this
abstraction, you can use almost identical code on the client or
server, or using promise or callback styles.

By way of introduction, the constructor takes four arguments:

* the target GOlr URL
* a JSON-ified YAML configuration object (see [golr-conf](https://github.com/berkeleybop/golr-conf))
* the "engine" type (jquery, node)
* _optional_ mode (asynchronous or synchronous, not always available)

If using the callback mode, users can also "register" functions to run
in various pre-set orders against various internal events, such as
"prerun", "search", and "error".

For more detailed information, please see
the [unit tests](https://github.com/berkeleybop/bbop-manager-golr/tree/master/tests).

## Documentation

This is a very recent port to a new set of modern managers (able to be used in Node and the browser, in both synchronous and asynchronous modes). While the initializations are a little different (please see the unit tests), the API is pretty much the same. Until we can update the documentation, please see the API docs of the pre-port version [here](https://github.com/berkeleybop/bbop-js).

## Availability

[GitHub](https://github.com/berkeleybop/bbop-manager-golr)

[NPM](https://www.npmjs.com/package/bbop-manager-golr)

## API

[index](https://berkeleybop.github.io/bbop-manager-golr/doc/index.html)
