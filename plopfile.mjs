import inflection from 'inflection';

export default function (plop) {
  // 1. Register the "pluralize" helper
  // This allows you to use {{pluralize (kebabCase name)}} in your .hbs files
  plop.setHelper('pluralize', (text) => {
    return inflection.pluralize(text);
  });

  plop.setGenerator('resource', {
    description: 'Create a new Zod + Wretch + SWR feature module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name (e.g. User Profile)?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{camelCase name}}/use{{pascalCase name}}.ts',
        templateFile: 'stamps/hook.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{camelCase name}}/{{camelCase name}}.service.ts',
        templateFile: 'stamps/service.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{camelCase name}}/{{camelCase name}}.schema.ts',
        templateFile: 'stamps/schema.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{camelCase name}}/index.ts',
        template: 'export * from "./use{{pascalCase name}}";\nexport * from "./{{camelCase name}}.schema";\nexport * from "./{{camelCase name}}.service";'
      }
    ]
  });
}