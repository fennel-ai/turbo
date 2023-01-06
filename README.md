# Fennel "Turbo"
One-stop shop for developing, deploying and managing our frontend touch-points and related modules.

Includes:
- Statically Generated Website, Blog and Documentation site
	- Developed as separate applications, and deployed as a single site via [Next.js Multi-Zones](https://nextjs.org/docs/advanced-features/multi-zones)
- Shared Component Libraries
- Shared Styles Libraries
- Shared Configuration Files
- Storybook (Isolated [Component / Design System] Development Environment)

## Getting Started
Once you have PNPM installed locally, you can run `pnpm install` in the root of the repo to get everything installed. 

After this you can run `pnpm dev` to spin up the Site@`http://localhost:3000` and Storybook@`http://localhost:6006` and start coding! 🧑‍💻

Check out [Turborepo](https://turbo.build/repo) & [Next.js Multi-Zones](https://nextjs.org/docs/advanced-features/multi-zones) for more info on how & why the repo is setup this way.

## Contents
### Applications
- **Web**: Fennel Website
- **Docs**: Our documentation site, as a ["zone"](https://nextjs.org/docs/advanced-features/multi-zones) within the website
- **Blog**: Our blog, as a ["zone"](https://nextjs.org/docs/advanced-features/multi-zones) within the website

### Packages
- **UI**: Shared UI Library
- **Styles**: Shared Styles Library
- **eslint-config-fennel**: Shared ESLint Configuration Files
- **tsconfig**: Shared TypeScript Configuration Files

## Why?
Similar to traditional monorepos, this setup gives us a one-stop shop for our front-end applications. Developers can pull this one repo and contribute to any aspect of our website, blog, documentation and eventually more. Turborepo also gives us superpowers when it comes to package management and deployment.

- Handles hoisting, deduplication and collision avoidance with dependencies for all apps & packages within the repo.
- Allows us to easily create shared libraries that can be consumed by our Website, Blog, Docs etc.
- Provides helpers for managing & deploying all of the above, without turning us insane.

We also leverage [Next.js Multi-Zones](https://nextjs.org/docs/advanced-features/multi-zones) so we can develop the blog, docs, etc. in isolation as separate applications, but then in production deploy as one site. We don't need any additional proxy setups to have the blog at `/blog`, or the docs at `/docs`. Same goes for building - if we need to recompile the blog, we can do so without having to also rebuild the website, docs and shared libraries. This avoids any `O(n)` issues with build times as the amount of content increases.

Each app remains independent and can be deployed both individually, and as part of a larger whole - there is no restriction on spinning up some other web application, having it live here in the repo, but deploy it completely separately to the rest of the website.

Each package can be consumed and shared between apps internally within the repo, but also deployed to NPM and included in any other completely unrelated project.

> As an example, right now the console lives in another repo. We can publish our `styles` and `ui` packages to NPM so that the console can also install them, even though it lives in a completely separate repository.

### TL:DR
We get ultimate flexibility, compose-ability and modularity. (plus some magic for super easy deployments and CI/CD if we deploy to Vercel.) 
> Deploying the apps in here to Vercel also means we only have the one hosting bill to worry about, even if we want to split everything up and deploy them as distinct websites on unique domains. 