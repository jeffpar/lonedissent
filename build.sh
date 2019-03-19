#!/bin/sh
JEKYLL_ENV=production bundle exec jekyll build
echo nojekyll>docs/.nojekyll
echo running: git status
git status
