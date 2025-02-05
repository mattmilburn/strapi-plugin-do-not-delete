<div align="center">
  <img style="width: 160px; height: auto;" src="public/logo.png" alt="Logo for Strapi do not delete plugin" />
  <h1>Strapi "Do Not Delete" Migration Guides</h1>
  <p>Follow our migration guides to keep your "do not delete" plugin up-to-date.</p>
</div>

## Get Started

* [Migrate from v1 to v2](#migrate-from-v1-to-v2)

---

## <a id="migrate-from-v1-to-v2"></a>Migrate from v1 to v2
This upgrade requires Strapi v5 and is NOT compatible with Strapi v4.

The only breaking change in this version is the plugin configuration has moved from the root-level `config/plugins.ts` to now apply to each content-type's `pluginOptions` defined in `schema.json`.

Previously, configuring delete rules was applied in the root-level `config/plugins.ts`.

```ts
// ./config/plugins.ts`
export default () => ({
  'do-not-delete': {
    config: {
      contentTypes: {
        'api::page.page': [
          ['slug', 'is', 'home'],
        ],
      },
    },
  },
});
```

Going forward, the same configuration will need to be applied to each content-type's `pluginOptions` prop.

```json
// ./api/page/content-types/page/schema.json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": "Generic web page"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "do-not-delete": {
      "rules": [
        ["slug", "is", "home"]
      ]
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    }
  }
}
```
