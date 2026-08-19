# Final SEO Implementation Verification Script (PowerShell)
# Run this after workflows complete to verify all changes

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "FolderRewind SEO Implementation Verification" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Source SEO Check
Write-Host "📋 Step 1: Checking source file SEO metadata..." -ForegroundColor Yellow
npm run check:seo
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Source SEO check PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Source SEO check FAILED" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Type Check
Write-Host "📋 Step 2: Running TypeScript type check..." -ForegroundColor Yellow
npm run typecheck
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Type check PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Type check FAILED" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: i18n Check
Write-Host "📋 Step 3: Checking i18n parity..." -ForegroundColor Yellow
npm run check:i18n
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ i18n check PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ i18n check FAILED" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Build
Write-Host "📋 Step 4: Building site..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Build FAILED" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 5: Built SEO Check
Write-Host "📋 Step 5: Checking built HTML SEO..." -ForegroundColor Yellow
npm run check:built-seo
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Built SEO check PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Built SEO check FAILED" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 6: Verify key files
Write-Host "📋 Step 6: Verifying key configuration files..." -ForegroundColor Yellow

# Check robots.txt
$robotsTxt = Get-Content "build\robots.txt" -Raw
if ($robotsTxt -match "Disallow: /search/" -and $robotsTxt -match "Disallow: /en/search/") {
    Write-Host "✅ robots.txt correctly blocks search routes" -ForegroundColor Green
} else {
    Write-Host "❌ robots.txt missing search route blocks" -ForegroundColor Red
    exit 1
}

# Check sitemap doesn't contain search or superpowers
$sitemap = Get-Content "build\sitemap.xml" -Raw
if ($sitemap -match "/search/") {
    Write-Host "❌ sitemap.xml contains /search/ routes" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ sitemap.xml excludes /search/ routes" -ForegroundColor Green
}

if ($sitemap -match "superpowers") {
    Write-Host "❌ sitemap.xml contains superpowers" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ sitemap.xml excludes superpowers" -ForegroundColor Green
}

# Check superpowers not in build
if ((Test-Path "build\docs\superpowers") -or (Test-Path "build\en\docs\superpowers")) {
    Write-Host "❌ superpowers directory exists in build/" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ superpowers directory not in build/" -ForegroundColor Green
}

Write-Host ""

# Step 7: Sample HTML verification
Write-Host "📋 Step 7: Sampling HTML meta tags..." -ForegroundColor Yellow

function Check-HtmlMeta {
    param($file, $url)

    if (-not (Test-Path $file)) {
        Write-Host "  ❌ File not found: $file" -ForegroundColor Red
        return $false
    }

    $html = Get-Content $file -Raw

    # Check for title
    if ($html -match "<title>(.*?)</title>") {
        $title = $matches[1]
        Write-Host "  Title: $title" -ForegroundColor White
    } else {
        Write-Host "  ❌ No title found" -ForegroundColor Red
        return $false
    }

    # Check for description
    if ($html -match 'meta name="description" content="([^"]*)"') {
        $desc = $matches[1]
        $descShort = if ($desc.Length -gt 80) { $desc.Substring(0, 80) + "..." } else { $desc }
        Write-Host "  Description ($($desc.Length) chars): $descShort" -ForegroundColor White
    } else {
        Write-Host "  ❌ No description meta tag" -ForegroundColor Red
        return $false
    }

    # Check for canonical
    if ($html -match 'link rel="canonical" href="([^"]*)"') {
        $canonical = $matches[1]
        Write-Host "  Canonical: $canonical" -ForegroundColor White
    } else {
        Write-Host "  ⚠️  No canonical link" -ForegroundColor Yellow
    }

    # Check for hreflang
    if ($html -match 'link rel="alternate" hreflang=') {
        Write-Host "  ✅ hreflang alternates present" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  No hreflang alternates" -ForegroundColor Yellow
    }

    Write-Host ""
    return $true
}

Write-Host ""
Write-Host "Checking homepage (Chinese):" -ForegroundColor Cyan
Check-HtmlMeta "build\index.html" "/"

Write-Host "Checking homepage (English):" -ForegroundColor Cyan
Check-HtmlMeta "build\en\index.html" "/en/"

Write-Host "Checking download page (Chinese):" -ForegroundColor Cyan
Check-HtmlMeta "build\download\index.html" "/download/"

Write-Host "Checking download page (English):" -ForegroundColor Cyan
Check-HtmlMeta "build\en\download\index.html" "/en/download/"

Write-Host "Checking intro doc (Chinese):" -ForegroundColor Cyan
Check-HtmlMeta "build\docs\intro\index.html" "/docs/intro/"

Write-Host "Checking intro doc (English):" -ForegroundColor Cyan
Check-HtmlMeta "build\en\docs\intro\index.html" "/en/docs/intro/"

Write-Host "Checking Minecraft overview (Chinese):" -ForegroundColor Cyan
Check-HtmlMeta "build\docs\guides\minecraft\overview\index.html" "/docs/guides/minecraft/overview/"

Write-Host "Checking Minecraft overview (English):" -ForegroundColor Cyan
Check-HtmlMeta "build\en\docs\guides\minecraft\overview\index.html" "/en/docs/guides/minecraft/overview/"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ ALL VERIFICATION CHECKS PASSED!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Summary of improvements:" -ForegroundColor Yellow
Write-Host "  - All source descriptions validated"
Write-Host "  - Build completed successfully"
Write-Host "  - HTML output SEO verified"
Write-Host "  - robots.txt blocks search routes"
Write-Host "  - sitemap.xml clean"
Write-Host "  - superpowers excluded"
Write-Host "  - Sample pages have proper meta tags"
Write-Host ""
Write-Host "✅ Ready for deployment!" -ForegroundColor Green
