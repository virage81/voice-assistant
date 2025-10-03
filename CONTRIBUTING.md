# Contributing Guide

Thank you for contributing to the Voice Meeting Assistant project! This guide will help you get started.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Documentation](#documentation)

---

## Code of Conduct

### Our Standards

- **Professional**: Write professional, business-quality code
- **Respectful**: Respect all team members
- **Collaborative**: Help others learn and grow
- **Quality-focused**: Prioritize code quality over speed

---

## Getting Started

### Prerequisites

Before contributing:

1. **Read Documentation**

   - [README.md](./README.md) - Project overview
   - [SETUP.md](./SETUP.md) - Development setup
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture

2. **Set Up Development Environment**

   ```bash
   git clone <repository-url>
   cd voice-assistant
   npm install
   cp .env.example .env.local
   # Configure .env.local with your credentials
   npm run dev
   ```

3. **Understand the Codebase**
   - Review existing code patterns
   - Check [DOCUMENTATION.md](./DOCUMENTATION.md) for guides

---

## Development Workflow

### Gitflow Branching Model

We follow [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):

```
main          ← Production-ready code
  ↑
develop       ← Integration branch
  ↑
feature/*     ← New features
release/*     ← Release preparation
hotfix/*      ← Production fixes
```

### Creating a Feature

1. **Create Feature Branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Follow coding standards (see below)
   - Write tests if applicable
   - Update documentation

3. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR to develop branch
   ```

### Creating a Hotfix

```bash
git checkout main
git checkout -b hotfix/fix-description
# Make fix
git commit -m "fix: description of fix"
# Create PR to main AND develop
```

---

## Coding Standards

### Language Rules

1. **Code in English**

   - All code, comments, and documentation in English
   - Variable names, function names, comments

2. **UI in Russian**
   - User-facing text in Russian
   - Error messages for users in Russian
   - AI prompts in Russian

### TypeScript

```typescript
// ✅ Good
interface UserData {
	name: string;
	meetingTime: Date;
}

function bookMeeting(data: UserData): Promise<Event> {
	// Implementation
}

// ❌ Bad
function bookMeeting(data: any) {
	// Missing types
}
```

### React/Next.js

```typescript
// ✅ Good - Functional component with proper typing
interface PageProps {
	params: { id: string };
}

export default function Page({ params }: PageProps) {
	return <div>Content</div>;
}

// ✅ Good - Custom hook
export function useCustomHook() {
	const [state, setState] = useState<Type>(initial);
	return { state, setState };
}
```

### File Organization

```typescript
// ✅ Good - Organized imports
import { useEffect, useState } from 'react'; // External
import { Button } from '@/components'; // Internal
import type { User } from '@/types'; // Types
import { formatDate } from '@/lib/utils'; // Utils

// Component code...
```

### Naming Conventions

```typescript
// Components: PascalCase
export default function VoiceAssistant() {}

// Functions: camelCase
function handleClick() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Types/Interfaces: PascalCase
interface MeetingData {}
type StatusType = 'active' | 'idle';

// Files: kebab-case
// use-vapi.ts, create-event.ts
```

---

## Commit Guidelines

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(vapi): add support for multiple languages"

# Bug fix
git commit -m "fix(calendar): correct time zone conversion"

# Documentation
git commit -m "docs(readme): update setup instructions"

# Refactor
git commit -m "refactor(hooks): extract calendar logic to custom hook"

# Multiple changes
git commit -m "feat(api): add rate limiting

- Add rate limiter middleware
- Update API documentation
- Add tests for rate limiting

Closes #123"
```

### Commit Best Practices

- ✅ Write clear, descriptive messages
- ✅ Use present tense ("add" not "added")
- ✅ Reference issues/PRs when applicable
- ✅ Keep commits atomic (one logical change)
- ❌ Don't commit commented-out code
- ❌ Don't commit sensitive data
- ❌ Don't use generic messages ("fix stuff")

---

## Pull Request Process

### Before Creating PR

1. **Update Your Branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout your-feature-branch
   git rebase develop
   ```

2. **Run Checks**

   ```bash
   npm run lint        # Check for linting errors
   npm run build       # Ensure it builds
   npx tsc --noEmit    # Type check
   ```

3. **Update Documentation**
   - Update README.md if needed
   - Update ARCHITECTURE.md for structural changes
   - Update API.md for API changes
   - Add/update comments in code

### Creating the PR

1. **Use PR Template** (if available)

2. **Write Clear Description**

   ```markdown
   ## What

   Brief description of changes

   ## Why

   Why this change is needed

   ## How

   How it was implemented

   ## Testing

   How to test the changes

   ## Screenshots (if UI changes)

   [Add screenshots]

   ## Checklist

   - [ ] Code follows style guidelines
   - [ ] Documentation updated
   - [ ] Tests added/updated
   - [ ] No console errors
   ```

3. **Link Related Issues**
   - Use "Closes #123" in description
   - Reference related PRs

### PR Review Process

1. **Wait for Review** (1-2 reviewers required)
2. **Address Feedback**
   - Respond to all comments
   - Make requested changes
   - Push updates to same branch
3. **Get Approval**
4. **Merge** (squash and merge preferred)

### After Merge

```bash
git checkout develop
git pull origin develop
git branch -d feature/your-feature  # Delete local branch
```

---

## Documentation

### When to Update Docs

Update documentation when:

- ✅ Adding new features
- ✅ Changing API endpoints
- ✅ Modifying architecture
- ✅ Fixing bugs (update troubleshooting)
- ✅ Changing setup process
- ✅ Adding dependencies

### Documentation Files

| File            | Update When                        |
| --------------- | ---------------------------------- |
| README.md       | Adding features, changing overview |
| SETUP.md        | Changing setup process             |
| ARCHITECTURE.md | Structural/architectural changes   |
| API.md          | API endpoint changes               |

### Documentation Standards

```markdown
# ✅ Good - Clear, structured

## Feature Name

Brief description of what it does.

### Usage

\`\`\`typescript // Code example const result = useFeature(); \`\`\`

### Parameters

- `param1` (string): Description
- `param2` (number): Description

### Returns

Returns a `Type` with properties...
```

---

## Code Review Checklist

### For Authors

Before requesting review:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Commits are clean and logical
- [ ] No console.log() left in code
- [ ] No commented-out code
- [ ] Environment variables documented

### For Reviewers

When reviewing:

- [ ] Code is understandable
- [ ] No security issues
- [ ] Performance considerations
- [ ] Error handling is proper
- [ ] Types are correct
- [ ] Documentation is adequate
- [ ] Tests are sufficient

---

## Testing

### Manual Testing

Before submitting PR:

1. **Test locally**

   ```bash
   npm run dev
   # Test all affected features
   ```

2. **Test edge cases**

   - Error scenarios
   - Empty states
   - Loading states

3. **Test in different browsers**
   - Chrome
   - Firefox
   - Safari (if possible)

### Automated Testing (Future)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

---

## Common Tasks

### Adding a New API Endpoint

1. Create route file: `src/app/api/new-endpoint/route.ts`
2. Implement handler with proper types
3. Update `API.md` documentation
4. Test endpoint manually
5. Add to ARCHITECTURE.md if significant

### Adding a New Feature

1. Create feature branch
2. Implement feature with types
3. Update relevant components
4. Add to README.md features list
5. Update documentation
6. Create PR

### Fixing a Bug

1. Create hotfix/fix branch
2. Identify root cause
3. Implement fix
4. Add to TROUBLESHOOTING.md
5. Test thoroughly
6. Create PR

---

## Questions?

- **Documentation**: Check [DOCUMENTATION.md](./DOCUMENTATION.md)
- **Setup Issues**: See [SETUP.md](./SETUP.md)
- **Architecture**: Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Bugs**: Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

Thank you for contributing! 🚀
