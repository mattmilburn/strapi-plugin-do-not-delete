<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo-2x.png" alt="Logo for Strapi do not delete plugin" />
  <h1>Strapi "Do Not Delete"</h1>
  <p>A plugin for Strapi CMS that protects certain entries from being deleted.</p>
  <img style="width: 960px; height: auto;" src="public/screenshot.png" alt="Screenshot for Strapi do not delete plugin" />
</div>

## Get Started

* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [User Guide](#user-guide)
* [Troubleshooting](#troubleshooting)
* [Support or Donate](#donate)
* [Roadmap](#roadmap)

## <a id="features"></a>✨ Features
* Protect certain entries from being deleted.
* Use various comparators to match against protection rules.

## <a id="installation"></a>💎 Installation
```bash
yarn add strapi-plugin-do-not-delete@latest
```

## <a id="configuration"></a>🔧 Configuration
| property | type (default) | description |
| - | - | - |
| contentTypes | object (`null`) | A config object that describes protection rules for content types. |

### `contentTypes`
A config object that describes protection rules for content types using the model UID and an array of comparators.

The object keys for `contentTypes` should be a valid model UID and the value should be an array or arrays which describe the comparison rules.

#### Example
Below, the comparison rule is querying if the `slug` value for `Page` is equal to `home`, and if this condition is true, the delete operation is cancelled.

```js
// ./config/plugins.js`
'use strict';

module.exports = {
  'do-not-delete': {
    config: {
      contentTypes: {
        'api::page.page': [
          [ 'slug', 'is', 'home' ],
        ],
      },
    },
  },
};
```

#### Comparators
The items in each comparison array must follow the format:

```js
[ 'attribute', 'comparator', 'value or pattern' ]
```

| Comparator | Description |
| -- | -- |
| `has` | Does the string `attribute` contain `value`?  |
| `in` | Does the `value` array include `attribute`? |
| `is` | Strict equality with `===` |
| `matches` | RegExp test against `pattern` (do not include outer slashes) |

```js
// ./config/plugins.js`
'use strict';

module.exports = {
  'do-not-delete': {
    config: {
      contentTypes: {
        'api::page.page': [
          [ 'slug', 'is', 'home' ],
          [ 'slug', 'in', [ 'home', 'blog', '404' ] ],
          [ 'slug', 'has', 'admin' ],
          [ 'slug', 'matches', '^foobar' ], // same as "starts with"
          [ 'slug', 'matches', 'foobar$' ], // same as "ends with"
        ],
      },
    },
  },
};
```

## <a id="user-guide"></a>📘 User Guide

### Attempting to delete a protected entry
When attempting to delete a protected entry, a validation error will display at the top of the screen that reads:

> This protected entry cannot be deleted.

### Deleting an entry that is currently protected
If you find yourself in a scenario where a protected entry actually does need to be deleted, you must first update the plugin config to remove the protection rule that applies to that entry.

## <a id="troubleshooting"></a>💩 Troubleshooting

#### In general
Remember to **rebuild your app** after making changes to some config or other code.

```bash
yarn build
# OR
yarn develop
```

## <a id="donate"></a>❤️ Support or Donate
If you are enjoying this plugin and feel extra appreciative, you can [buy me a beer or 3 🍺🍺🍺](https://www.buymeacoffee.com/mattmilburn).

## <a id="roadmap"></a>🚧 Roadmap
* Settings page to visually manage protected entries and their applicable rules.
* Custom validation error messages.
* More comparators for protection rules.
