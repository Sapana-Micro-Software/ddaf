# GitHub Pages Setup Guide

This repository is configured for GitHub Pages using **GitHub Actions** for automated builds and deployments.

## Making the Repository Public

1. Go to your repository settings on GitHub
2. Scroll down to the "Danger Zone" section
3. Click "Change visibility"
4. Select "Make public"
5. Confirm the change

## Enabling GitHub Pages with GitHub Actions

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
4. Click "Save"

The GitHub Actions workflow (`.github/workflows/pages.yml`) will automatically:
- Build your site with Jekyll on every push to the `main` branch
- Deploy the built site to GitHub Pages
- Process Jekyll variables and generate the final static site

**Note:** The first deployment may take a few minutes. You can monitor the progress in the "Actions" tab of your repository.

## Updating GitHub Links

Before deploying, update the GitHub repository information in `_config.yml`:

1. Open `_config.yml`
2. Replace `yourusername` with your actual GitHub username in the `github_username` field
3. Update `github_repo` if your repository has a different name (default is `ddaf`)

The site uses Jekyll variables, so all GitHub links will automatically update throughout the site.

## Site URL

Once enabled, your site will be available at:
- `https://yourusername.github.io/ddaf/`

Or if you've set up a custom domain:
- Your custom domain URL

## Local Testing

To test the site locally before deploying:

```bash
# Install Ruby and Bundler (if not already installed)
# macOS: brew install ruby
# Linux: sudo apt-get install ruby-full
# Windows: Use RubyInstaller

# Navigate to repository root
cd /path/to/ddaf

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

Alternatively, you can install Jekyll directly:

```bash
gem install bundler jekyll jekyll-feed jekyll-seo-tag
jekyll serve
```

## File Structure

The GitHub Pages site uses:
- `.github/workflows/pages.yml` - GitHub Actions workflow for automated deployment
- `Gemfile` - Ruby dependencies for Jekyll
- `_config.yml` - Jekyll configuration
- `index.html` - Main page
- `assets/css/style.css` - Stylesheet
- `assets/js/main.js` - JavaScript
- `docs/*.pdf` - PDF documents (paper, presentation, reference manual)

## How It Works

1. **On Push**: When you push to the `main` branch, GitHub Actions automatically triggers
2. **Build**: The workflow installs Jekyll and builds your site, processing all Jekyll variables
3. **Deploy**: The built site is deployed to GitHub Pages
4. **Result**: Your site is live at `https://yourusername.github.io/ddaf/`

You can also manually trigger a deployment by:
- Going to the "Actions" tab in your repository
- Selecting "Deploy GitHub Pages" workflow
- Clicking "Run workflow"

All files are automatically processed by Jekyll during the build process.
