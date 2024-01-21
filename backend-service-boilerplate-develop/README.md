# backend-service-boilerplate

Boilerplate for backend serverless app at AWS.
Serverless framework's config reference: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml

# Local debug
- please uncomment `# customDomain:` code block.
- Running locally, using prod database：`npm run start:prod`

# Custom domain
- If you want to config custom domain, please uncomment `# - serverless-domain-manager` and  `# customDomain:` code block.
- Use `npm run createDomain` to deploy custom config into prod.
- Use `npm run deleteDomain` to remove custom config from prod.
- more: https://github.com/amplify-education/serverless-domain-manager

# Coding Style
- Please create a new feature branch from the develop
- Please run `npm run lint` before commit your changes
- Please submit a merge request to merge feature branch into develop branch.
