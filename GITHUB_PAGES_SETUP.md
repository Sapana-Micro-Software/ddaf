# GitHub Pages Setup Guide

This repository is configured for GitHub Pages using **GitHub Actions** for automated builds and deployments.

## Quick Start

1. **Make Repository Public** (if needed):
   - Go to repository settings → Scroll to "Danger Zone" → "Change visibility" → "Make public"

2. **Enable GitHub Pages**:
   - Go to repository settings → "Pages" in left sidebar
   - Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
   - Click "Save"

3. **Update GitHub Information** (if needed):
   - Open `_config.yml`
   - Update `github_username` and `github_repo` fields

4. **Push to Main Branch**:
   - The workflow will automatically trigger on push to `main`
   - Monitor progress in the "Actions" tab

## GitHub Actions Workflows

### Main Deployment Workflow (`pages.yml`)

The workflow (`.github/workflows/pages.yml`) automatically:

✅ **Builds** your site with Jekyll on every push to `main`  
✅ **Verifies** the build output before deployment  
✅ **Deploys** the built site to GitHub Pages  
✅ **Processes** Jekyll variables (`{{ site.github_username }}`, etc.)  
✅ **Caches** Ruby dependencies for faster builds  
✅ **Reports** build statistics and deployment status  

### Workflow Features

- **Automatic triggers**: Runs on push to `main` branch
- **Manual trigger**: Can be run manually via "Run workflow" in Actions tab
  - Optional: Force rebuild (ignores cache)
- **Build verification**: Comprehensive checks that build output is valid
- **Build statistics**: Reports file counts, sizes, and types
- **Dependency caching**: Ruby gems are cached for faster builds
- **Latest Ruby**: Uses Ruby 3.3 for optimal performance
- **Concurrency control**: Prevents multiple deployments from running simultaneously
- **Timeout protection**: 10-minute timeout prevents hanging builds
- **Detailed logging**: Emoji-enhanced logs for easy monitoring

### Validation Workflow (`validate.yml`)

A separate validation workflow runs on pull requests to:
- ✅ Validate Jekyll configuration
- ✅ Test build without deploying
- ✅ Check for common issues (unresolved variables, etc.)
- ✅ Provide early feedback before merging

**Note:** The first deployment may take 2-3 minutes. Subsequent deployments are faster due to caching.

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
- `.github/workflows/pages.yml` - Main GitHub Actions workflow for automated deployment
- `.github/workflows/validate.yml` - Validation workflow for pull requests
- `Gemfile` - Ruby dependencies for Jekyll
- `_config.yml` - Jekyll configuration
- `index.html` - Main page
- `assets/css/style.css` - Stylesheet
- `assets/js/main.js` - JavaScript
- `docs/*.pdf` - PDF documents (paper, presentation, reference manual)

## How It Works

1. **Trigger**: Push to `main` branch or manual workflow dispatch
2. **Checkout**: Repository code is checked out
3. **Setup Ruby**: Ruby 3.3 and Bundler are configured with dependency caching
4. **Install**: Jekyll and plugins are installed via Bundler
5. **Build**: Jekyll processes all files, resolves variables, and generates static site
6. **Verify**: Build output is verified (checks for `_site` directory and `index.html`)
7. **Upload**: Built site is uploaded as artifact
8. **Deploy**: Site is deployed to GitHub Pages
9. **Result**: Your site is live at `https://yourusername.github.io/ddaf/`

### Manual Deployment

You can manually trigger a deployment:
1. Go to the "Actions" tab in your repository
2. Select "Deploy GitHub Pages" workflow
3. Click "Run workflow" → Select branch
4. (Optional) Check "Force rebuild" to ignore cache
5. Click "Run workflow"

The workflow will show:
- 📦 Installation progress
- 🔧 Jekyll version information
- 🏗️ Build progress
- 📊 Build statistics (file counts, sizes)
- ✅ Verification results
- 🚀 Deployment status with site URL

### Monitoring Deployments

- **Actions Tab**: View workflow runs, logs, and status
- **Pages Settings**: See deployment history and status
- **Workflow Status**: Add badge to README (see below)

All files are automatically processed by Jekyll during the build process.

## Workflow Status Badge

Add this to your README.md to show deployment status:

```markdown
![GitHub Pages](https://github.com/yourusername/ddaf/actions/workflows/pages.yml/badge.svg)
```

Replace `yourusername` with your actual GitHub username.

## Troubleshooting

### Build Fails

1. **Check Actions Logs**: Go to Actions tab → Click on failed workflow → Review error messages
2. **Verify Gemfile**: Ensure all required gems are listed
3. **Check Jekyll Config**: Verify `_config.yml` syntax is correct
4. **Test Locally**: Run `bundle exec jekyll build` locally to catch errors early

### Site Not Updating

1. **Check Deployment Status**: Go to Settings → Pages → Check deployment status
2. **Verify Workflow Ran**: Check Actions tab for successful workflow completion
3. **Clear Cache**: If issues persist, try clearing GitHub Actions cache
4. **Check Permissions**: Ensure GitHub Pages has write permissions (should be automatic)

### Jekyll Variables Not Resolving

- Variables like `{{ site.github_username }}` are processed during build
- Ensure `_config.yml` has correct values
- Check that files using variables have proper front matter or are processed by Jekyll

## Advanced Configuration

### Custom Domain

1. Add `CNAME` file to repository root with your domain
2. Configure DNS settings as per GitHub Pages documentation
3. Update `_config.yml` `url` field if needed

### Environment Variables

The workflow uses `JEKYLL_ENV=production` for optimized builds. You can add custom environment variables in the workflow file if needed.

### Build Optimization

- Dependencies are cached automatically
- Only changed files trigger rebuilds
- Jekyll incremental builds can be enabled if needed
