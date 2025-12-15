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

### Prototype Pollution - jQuery
- **Files**: `app/assets/javascripts/inklewriter-source/jquery-1.5.js:4518, 4536, 4551, 4577`
- **Issue**: Object prototype modification (CWE-915)
- **Fix**: Upgrade jQuery from 1.5 to latest (3.7+)

### ReDoS - jQuery internals
- **Files**: `app/assets/javascripts/inklewriter-source/jquery-1.5.js:2295, 2507, 3163`
- **Issue**: Non-literal RegExp construction
- **Fix**: Upgrade jQuery to modern version

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
