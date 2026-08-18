# 🎮 Galaxian - Classic Arcade Game Recreation

A faithful recreation of the classic **Galaxian** arcade game built with **HTML5 Canvas**, **TypeScript**, and deployed on **Cloudflare Pages**.

## 🎯 Features & Development Status

### ✅ Implemented
- **Player Controls**: Move with arrow keys, fire with spacebar
- **Player Entity**: Full player ship with movement & boundaries
- **Bullet System**: Player projectiles with speed control
- **Collision Detection**: AABB hitbox system for all entities
- **Score System**: Points tracking & high score persistence
- **Responsive Design**: Playable on desktop and tablet devices
- **Optimized Performance**: 60 FPS smooth gameplay

### ⏳ In Development
- **Enemy Formation**: Enemy wave patterns and movement
- **Enemy AI**: Intelligent dive attacks and behaviors
- **Game States**: Menu, pause, game over screens
- **Sound Effects**: Audio feedback for actions
- **Visual Effects**: Explosions and screen shake

### 📋 Roadmap
- Level progression system
- Power-ups and special weapons
- Leaderboard integration
- Mobile touch controls

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

### Game Engine (`src/game/GameEngine.ts`)
Core game loop and state management:
- 60 FPS game loop using requestAnimationFrame
- State management (playing, paused, game over)
- Canvas rendering and clearing
- Keyboard input handling (arrow keys, spacebar, P, R)
- Entity management and updates

### Systems (`src/game/systems/`)
- **CollisionSystem.ts**: AABB collision detection for bullets, enemies, player
- **ScoreSystem.ts**: Score tracking, high score persistence via localStorage
- **AISystem.ts**: (Planned) Enemy behavior, formation control, dive attacks

### Entities (`src/game/entities/`)
- **Player.ts**: Controllable ship with movement, firing, boundaries, health
- **Enemy.ts**: Enemy ships with formation movement, dive capability
- **Bullet.ts**: Projectiles with speed, position tracking, auto-cleanup

### Constants (`src/game/constants.ts`)
Centralized game configuration:
- Canvas dimensions (800x600)
- Entity dimensions and speeds
- Fire rates and bullet properties
- Scoring values
- Game state enums
- Input key mappings
- Difficulty levels

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
