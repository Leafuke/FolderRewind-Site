#!/bin/bash

# Final SEO Implementation Verification Script
# Run this after workflows complete to verify all changes

set -e

echo "=========================================="
echo "FolderRewind SEO Implementation Verification"
echo "=========================================="
echo ""

# Step 1: Source SEO Check
echo "📋 Step 1: Checking source file SEO metadata..."
npm run check:seo
if [ $? -eq 0 ]; then
    echo "✅ Source SEO check PASSED"
else
    echo "❌ Source SEO check FAILED"
    exit 1
fi
echo ""

# Step 2: Type Check
echo "📋 Step 2: Running TypeScript type check..."
npm run typecheck
if [ $? -eq 0 ]; then
    echo "✅ Type check PASSED"
else
    echo "❌ Type check FAILED"
    exit 1
fi
echo ""

# Step 3: i18n Check
echo "📋 Step 3: Checking i18n parity..."
npm run check:i18n
if [ $? -eq 0 ]; then
    echo "✅ i18n check PASSED"
else
    echo "❌ i18n check FAILED"
    exit 1
fi
echo ""

# Step 4: Build
echo "📋 Step 4: Building site..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build PASSED"
else
    echo "❌ Build FAILED"
    exit 1
fi
echo ""

# Step 5: Built SEO Check
echo "📋 Step 5: Checking built HTML SEO..."
npm run check:built-seo
if [ $? -eq 0 ]; then
    echo "✅ Built SEO check PASSED"
else
    echo "❌ Built SEO check FAILED"
    exit 1
fi
echo ""

# Step 6: Verify key files
echo "📋 Step 6: Verifying key configuration files..."

# Check robots.txt
if grep -q "Disallow: /search/" build/robots.txt && grep -q "Disallow: /en/search/" build/robots.txt; then
    echo "✅ robots.txt correctly blocks search routes"
else
    echo "❌ robots.txt missing search route blocks"
    exit 1
fi

# Check sitemap doesn't contain search or superpowers
if grep -q "/search/" build/sitemap.xml; then
    echo "❌ sitemap.xml contains /search/ routes"
    exit 1
else
    echo "✅ sitemap.xml excludes /search/ routes"
fi

if grep -q "superpowers" build/sitemap.xml; then
    echo "❌ sitemap.xml contains superpowers"
    exit 1
else
    echo "✅ sitemap.xml excludes superpowers"
fi

# Check superpowers not in build
if [ -d "build/docs/superpowers" ] || [ -d "build/en/docs/superpowers" ]; then
    echo "❌ superpowers directory exists in build/"
    exit 1
else
    echo "✅ superpowers directory not in build/"
fi

echo ""

# Step 7: Sample HTML verification
echo "📋 Step 7: Sampling HTML meta tags..."

check_html_meta() {
    local file=$1
    local url=$2

    if [ ! -f "$file" ]; then
        echo "❌ File not found: $file"
        return 1
    fi

    # Check for title
    if grep -q "<title>" "$file"; then
        local title=$(grep -o "<title>.*</title>" "$file" | sed 's/<[^>]*>//g' | head -1)
        echo "  Title: $title"
    else
        echo "  ❌ No title found"
        return 1
    fi

    # Check for description
    if grep -q 'meta name="description"' "$file"; then
        local desc=$(grep -o 'meta name="description" content="[^"]*"' "$file" | sed 's/.*content="//;s/".*//' | head -1)
        echo "  Description (${#desc} chars): ${desc:0:80}..."
    else
        echo "  ❌ No description meta tag"
        return 1
    fi

    # Check for canonical
    if grep -q 'link rel="canonical"' "$file"; then
        local canonical=$(grep -o 'link rel="canonical" href="[^"]*"' "$file" | sed 's/.*href="//;s/".*//' | head -1)
        echo "  Canonical: $canonical"
    else
        echo "  ⚠️  No canonical link"
    fi

    # Check for hreflang
    if grep -q 'link rel="alternate" hreflang=' "$file"; then
        echo "  ✅ hreflang alternates present"
    else
        echo "  ⚠️  No hreflang alternates"
    fi

    echo ""
}

echo ""
echo "Checking homepage (Chinese):"
check_html_meta "build/index.html" "/"

echo "Checking homepage (English):"
check_html_meta "build/en/index.html" "/en/"

echo "Checking download page (Chinese):"
check_html_meta "build/download/index.html" "/download/"

echo "Checking download page (English):"
check_html_meta "build/en/download/index.html" "/en/download/"

echo "Checking intro doc (Chinese):"
check_html_meta "build/docs/intro/index.html" "/docs/intro/"

echo "Checking intro doc (English):"
check_html_meta "build/en/docs/intro/index.html" "/en/docs/intro/"

echo "Checking Minecraft overview (Chinese):"
check_html_meta "build/docs/guides/minecraft/overview/index.html" "/docs/guides/minecraft/overview/"

echo "Checking Minecraft overview (English):"
check_html_meta "build/en/docs/guides/minecraft/overview/index.html" "/en/docs/guides/minecraft/overview/"

echo ""
echo "=========================================="
echo "✅ ALL VERIFICATION CHECKS PASSED!"
echo "=========================================="
echo ""
echo "📊 Summary of improvements:"
echo "  - All source descriptions validated"
echo "  - Build completed successfully"
echo "  - HTML output SEO verified"
echo "  - robots.txt blocks search routes"
echo "  - sitemap.xml clean"
echo "  - superpowers excluded"
echo "  - Sample pages have proper meta tags"
echo ""
echo "✅ Ready for deployment!"
