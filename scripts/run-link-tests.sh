#!/bin/bash

# Example script showing how to run link validation tests
# This demonstrates different ways to check for broken links

echo "🔍 Link Validation Test Examples"
echo "=================================="
echo ""

# Example 1: Run quick link check with reports
echo "Example 1: Quick link check with exported reports"
echo "Command: npm run check-links"
echo "Output: Generates JSON, CSV, and TXT reports in reports/ directory"
echo ""

# Example 2: Run tests in CI/CD
echo "Example 2: Run tests in CI/CD pipeline"
echo "Command: npm run test:links"
echo "Output: Exit code 0 if all links valid, 1 if broken links found"
echo ""

# Example 3: Run tests in watch mode during development
echo "Example 3: Watch mode for development"
echo "Command: npm run test:watch"
echo "Output: Re-runs tests automatically when files change"
echo ""

# Example 4: Interactive UI mode
echo "Example 4: Interactive UI mode"
echo "Command: npm run test:ui"
echo "Output: Opens browser with interactive test UI"
echo ""

echo "=================================="
echo "Choose an option to run:"
echo "1) Quick check with reports (recommended)"
echo "2) Run tests only"
echo "3) Watch mode"
echo "4) Interactive UI"
echo "5) Exit"
echo ""

read -p "Enter choice [1-5]: " choice

case $choice in
  1)
    echo ""
    echo "Running quick link check..."
    npm run check-links
    ;;
  2)
    echo ""
    echo "Running link validation tests..."
    npm run test:links
    ;;
  3)
    echo ""
    echo "Starting watch mode..."
    npm run test:watch
    ;;
  4)
    echo ""
    echo "Opening interactive UI..."
    npm run test:ui
    ;;
  5)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid choice. Exiting..."
    exit 1
    ;;
esac
