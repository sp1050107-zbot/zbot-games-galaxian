# 🎮 Galaxian - Classic Arcade Game Recreation

A faithful recreation of the classic **Galaxian** arcade game built with **HTML5 Canvas**, **TypeScript**, and deployed on **Cloudflare Pages**.

## 🎯 Features

- **Classic Arcade Gameplay**: Experience the timeless Galaxian mechanics
- **Player Controls**: Move with arrow keys, fire with spacebar
- **Enemy AI**: Intelligent enemy formations with dive attacks
- **Collision Detection**: Accurate hitbox system
- **Score System**: Track your high scores
- **Responsive Design**: Playable on desktop and tablet devices
- **Optimized Performance**: 60 FPS smooth gameplay

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18.0.0
- npm or yarn
- Cloudflare account (for deployment)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Format code
npm run format

# Lint check
npm run lint
```

### Deployment

```bash
# Deploy to Cloudflare Pages (requires authentication)
npm run deploy

# Or use GitHub Actions (automatic on push to main)
git push origin main
```

## 📁 Project Structure

```
zbot-games-galaxian/
├── .claude/                    # Claude Code configuration
│   ├── agents/                # Subagents for specific tasks
│   │   ├── game-dev.md
│   │   └── deploy-engineer.md
│   ├── commands/              # Custom slash commands
│   │   ├── start-feature.md
│   │   └── game-verify.md
│   ├── skills/                # Reusable skill packages
│   │   └── cloudflare-deploy/SKILL.md
│   └── hooks/                 # Post-tool automation hooks
│       └── post-tool-use.json
├── .github/
│   └── workflows/             # GitHub Actions CI/CD
│       └── deploy.yml
├── src/
│   ├── game/                  # Game engine and logic
│   │   ├── entities/          # Player, enemies, bullets
│   │   ├── systems/           # Game systems
│   │   ├── GameEngine.ts      # Main game loop
│   │   └── constants.ts       # Game constants
│   ├── __tests__/             # Test files
│   ├── index.html             # Game HTML
│   └── index.ts               # Entry point
├── CLAUDE.md                  # Project documentation
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── vitest.config.ts           # Test configuration
├── wrangler.toml              # Cloudflare configuration
├── .eslintrc.json             # ESLint configuration
├── .prettierrc.json           # Prettier configuration
└── README.md                  # This file
```

## 🎮 How to Play

### Controls
- **← Arrow Left / Right →**: Move your ship
- **Spacebar**: Fire
- **P**: Pause/Resume
- **R**: Restart game

### Objective
- Shoot down all enemies before they reach the bottom
- Dodge enemy fire
- Earn high scores
- Complete levels

## 🏗️ Architecture

### Game Engine
The game is built around a main `GameEngine` class that manages:
- Game loop (60 FPS)
- State management (menu, playing, paused, game over)
- Canvas rendering
- Input handling

### Systems
- **CollisionSystem**: Detects collisions between entities
- **AISystem**: Controls enemy behavior and dive attacks
- **ScoreSystem**: Tracks and manages player scores

### Entities
- **Player**: Controllable ship with firing capability
- **Enemy**: Formation-based enemies with AI behavior
- **Bullet**: Projectiles from player and enemies

## 📊 Development Workflow

### Creating a New Feature

```bash
# Start new feature branch (creates isolated worktree)
/start-feature my-awesome-feature

# Make changes, then verify
/game-verify

# Complete and merge
git checkout main
git merge feature/my-awesome-feature
```

### Code Quality

All code is automatically:
- Formatted with Prettier
- Linted with ESLint
- Type-checked with TypeScript (strict mode)
- Tested with Vitest (≥ 80% coverage)

### Before Committing

```bash
# Run complete verification
/game-verify

# Or manually:
npm run format
npm run lint
npm run test
npm run build
```

## 🌐 Deployment

### Manual Deployment
```bash
npm run build
wrangler pages deploy dist
```

### Automatic Deployment (GitHub Actions)
Push to `main` branch triggers automatic deployment:
1. Lint & test code
2. Build for production
3. Deploy to Cloudflare Pages
4. Create PR previews on feature branches

## 🔧 Configuration

### Cloudflare
- **Account ID**: Set in `wrangler.toml`
- **API Token**: Set in GitHub Secrets (`CLOUDFLARE_API_TOKEN`)
- **Project Name**: `zbot-games-galaxian`

### Game Constants
Edit `src/game/constants.ts` to adjust:
- Canvas size
- Player/enemy speeds
- Fire rates
- Difficulty levels
- Scoring

## 🐛 Troubleshooting

### Build Fails
```bash
npm ci
npm run build
```

### Tests Fail
```bash
npm run test -- --reporter=verbose
```

### Deployment Issues
See `.claude/agents/deploy-engineer.md` for detailed troubleshooting guide.

## 📚 Documentation

- **CLAUDE.md**: Project overview and conventions
- **.claude/agents/**: Subagent documentation
- **.claude/skills/**: Skill documentation
- **src/game/**: Inline code documentation

## 🤝 Contributing

1. Create a feature branch: `/start-feature feature-name`
2. Make changes following the code style
3. Run tests: `npm run test`
4. Verify: `/game-verify`
5. Commit with clear messages
6. Push and create a pull request

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Original Galaxian by Namco (1979)
- Built with modern web technologies
- Deployed on Cloudflare Pages

## 📞 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Check existing documentation in `.claude/`
- Review test files for usage examples

---

**Happy Gaming! 🎮✨**
