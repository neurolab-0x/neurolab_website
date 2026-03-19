#!/bin/bash

# Configuration (Edit these once)
GITLAB_REPO="git@gitlab.com:neurolab.inc/neurolab_webapp"
# It is better to store your token in a separate file or environment variable
GITLAB_TOKEN="glpat-xl5pPe9aN2PsGE3pSa8vYm86MQp1OmpxbG92Cw.01.120ukp5xj"

if [ -z "$GITLAB_TOKEN" ]; then
    echo "Error: GITLAB_TOKEN environment variable is not set."
    echo "Usage: GITLAB_TOKEN=glpat-... ./sync-gitlab.sh"
    exit 1
fi

# 1. Clean up Repo URL
CLEAN_REPO=${GITLAB_REPO#https://}
CLEAN_REPO=${CLEAN_REPO#git@}
CLEAN_REPO=${CLEAN_REPO/:/\/}
CLEAN_REPO=${CLEAN_REPO%.git}.git

# 2. Construct Auth URL
AUTH_URL="https://oauth2:${GITLAB_TOKEN}@${CLEAN_REPO}"

echo "🚀 Synchronizing main branch to GitLab..."

# 3. Add/Update Remote
git remote add lab "$AUTH_URL" 2>/dev/null || git remote set-url lab "$AUTH_URL"

# 4. Push main branch
# We try standard push first, then force if it fails.
if git push lab main:main; then
    echo "✅ Sync Successful!"
else
    echo "⚠️  Standard push failed. Attempting Force Push..."
    if git push lab main:main --force; then
        echo "✅ Force Sync Successful!"
    else
        echo "❌ Sync Failed. Check your GitLab branch protection settings."
        exit 1
    fi
fi
