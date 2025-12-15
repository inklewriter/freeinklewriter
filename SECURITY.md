# Security Issues

## Resolved

### ✓ Dockerfile - Missing non-root USER
- **File**: `Dockerfile`
- **Issue**: Container runs as root (CWE-269, CWE-250)
- **Fixed**: Added `USER inkle` (UID 1000) with proper permissions
- **Date**: 2025-12-13

### ✓ XSS - Insecure innerHTML
- **File**: `app/assets/javascripts/admin/adminpages/index.js:50-78`
- **Issue**: User-controlled data in innerHTML (CWE-79)
- **Fixed**: Replaced template literals with createElement/textContent
- **Date**: 2025-12-13

## High Priority

### XSS - document.write
- **File**: `app/assets/javascripts/inklewriter-source/aux.js:3`
- **Issue**: document.write can lead to XSS (CWE-79)
- **Fix**: Replace with DOM manipulation
- **Status**: Not found in current codebase - may be false positive

## Medium Priority

### ReDoS - Dynamic RegExp
- **File**: `app/assets/javascripts/inklewriter-source/aux.js:22`
- **Issue**: RegExp with function argument (CWE-1333)
- **Fix**: Use hardcoded regex or validate input

### Prototype Pollution - jQuery 1.7.1
- **Files**: `app/assets/javascripts/inklewriter-source/jquery-1.7.1.js`
- **Issue**: jQuery 1.7.1 has known prototype pollution vulnerabilities (CWE-915)
- **Fix**: Upgrade jQuery from 1.7.1 to latest (3.7+)
- **Note**: Requires compatibility testing with inklewriter codebase

### ReDoS - jQuery internals
- **Files**: `app/assets/javascripts/inklewriter-source/jquery-1.7.1.js`
- **Issue**: Non-literal RegExp construction in older jQuery versions
- **Fix**: Upgrade jQuery to modern version (3.7+)

### eval-like patterns
- **Files**: Multiple inklewriter-source JS files
- **Issue**: Potential code injection via setTimeout/setInterval strings
- **Fix**: Use function references instead of string eval

## Review Needed

### Deprecated OpenSSL Cipher
- **Files**: Ruby codebase (location TBD)
- **Issue**: Weak cryptographic algorithms
- **Fix**: Audit and update to modern ciphers

### SQL Injection
- **Files**: `app/models/story.rb`, `app/models/user.rb`, controllers
- **Issue**: Potential unsafe query construction
- **Fix**: Audit all ActiveRecord queries, ensure parameterization

## Summary
- 2 critical XSS vulnerabilities
- 1 critical privilege escalation (Docker)
- 5+ medium ReDoS/prototype pollution issues
- 2 areas requiring manual audit
