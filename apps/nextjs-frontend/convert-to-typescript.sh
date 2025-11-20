#!/bin/bash

# TypeScript Conversion Script
# This script helps convert JavaScript files to TypeScript

echo "Starting TypeScript conversion..."

# Convert .js files in hooks directory
find src/hooks -name "*.js" -type f | while read file; do
    ts_file="${file%.js}.ts"
    echo "Converting $file to $ts_file"
    # Add "use client" if it's a hook file
    if grep -q "use client" "$file" 2>/dev/null || grep -q "useState\|useEffect" "$file"; then
        # Keep use client directive
        sed 's/\.js$/\.ts/' "$file" > "$ts_file" 2>/dev/null || cp "$file" "$ts_file"
    else
        cp "$file" "$ts_file"
    fi
done

# Convert .jsx files to .tsx
find src/components src/app -name "*.jsx" -type f | while read file; do
    tsx_file="${file%.jsx}.tsx"
    echo "Converting $file to $tsx_file"
    cp "$file" "$tsx_file"
done

# Convert .js files in components/app to .ts or .tsx (based on JSX content)
find src/components src/app -name "*.js" -type f ! -path "*/node_modules/*" | while read file; do
    if grep -q "import.*from.*react\|<[A-Z]" "$file" 2>/dev/null; then
        tsx_file="${file%.js}.tsx"
        echo "Converting $file to $tsx_file (has JSX)"
        cp "$file" "$tsx_file"
    else
        ts_file="${file%.js}.ts"
        echo "Converting $file to $ts_file"
        cp "$file" "$ts_file"
    fi
done

echo "Conversion complete! Note: You'll need to manually add types to the converted files."

