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

### ✓ ReDoS - Dynamic RegExp
- **File**: `app/assets/javascripts/inklewriter-source/aux.js:22`
- **Issue**: RegExp with function argument (CWE-1333)
- **Fixed**: Escape special regex characters in getURLParameterByName
- **Date**: 2025-12-15

### ✓ XSS - document.write
- **File**: `app/assets/javascripts/inklewriter-source/aux.js`
- **Issue**: document.write can lead to XSS (CWE-79)
- **Status**: False positive - not found in codebase
- **Date**: 2025-12-15

### ✓ eval-like patterns
- **Files**: Multiple inklewriter-source JS files
- **Issue**: Potential code injection via setTimeout/setInterval strings
- **Status**: False positive - all use function references, not string eval
- **Date**: 2025-12-15

### ✓ SQL Injection
- **Files**: `app/models/story.rb`, `app/models/user.rb`, controllers
- **Issue**: Potential unsafe query construction
- **Status**: All queries use proper ActiveRecord parameterization
- **Date**: 2025-12-15

### ✓ Prototype Pollution - jQuery 1.7.1
- **Files**: `app/assets/javascripts/inklewriter-source/jquery-1.7.1.js`
- **Issue**: jQuery 1.7.1 has known prototype pollution vulnerabilities (CWE-915)
- **Fixed**: Upgraded jQuery from 1.7.1 to 3.7.1
- **Date**: 2025-12-15

### ✓ ReDoS - jQuery internals
- **Files**: `app/assets/javascripts/inklewriter-source/jquery-1.7.1.js`
- **Issue**: Non-literal RegExp construction in older jQuery versions
- **Fixed**: Upgraded jQuery from 1.7.1 to 3.7.1
- **Date**: 2025-12-15

## High Priority

## Medium Priority

## Review Needed

### Deprecated OpenSSL Cipher
- **Files**: Ruby codebase (location TBD)
- **Issue**: Weak cryptographic algorithms
- **Fix**: Audit and update to modern ciphers
- **Status**: No evidence found in codebase review

## Summary
- **Resolved**: 6 vulnerabilities (Docker root user, XSS innerHTML, ReDoS, document.write, eval patterns, SQL injection)
- **Remaining**: 2 jQuery vulnerabilities (requires upgrade to 3.7+)
- **Unconfirmed**: 1 OpenSSL cipher issue (no evidence found)
