# Cashscript Workshop

A comprehensive 2-day workshop covering Bitcoin Cash smart contracts using Cashscript, from fundamentals to practical implementation with Quasar Framework.

## Overview

This repository contains all the materials needed to run the Cashscript workshop, including presentation slides, media files, smart contract examples, and implementation scripts. The workshop is designed to take participants from blockchain basics to building real-world applications with Cashscript.

## Workshop Structure

### Day 1: Foundations & Smart Contracts

#### Morning Session: Introduction
- **Blockchain Fundamentals**: Understanding distributed ledgers and consensus
- **Cryptography Basics**: Public/private keys, digital signatures, and hashing
- **Bitcoin Cash**: History, features, and advantages
- **UTXO Model**: Understanding unspent transaction outputs
- **Smart Contracts**: Introduction to programmable money

#### Afternoon Session: Cashscript Development
- **Cashscript Language**: Syntax, operators, and data types
- **Contract Structure**: Input/output validation and conditions
- **Practical Examples**: Building basic smart contracts
- **Testing & Deployment**: Tools and best practices

### Day 2: Framework Integration & Group Projects

#### Morning Session: Quasar Framework
- **Quasar Overview**: Introduction to the framework
- **Cashscript Integration**: Using smart contracts in Quasar applications
- **Frontend Development**: Building user interfaces for smart contracts
- **State Management**: Handling contract interactions and wallet connections

#### Afternoon Session: Group Projects
- **Team Formation**: Students self-organize into groups
- **Project Selection**: Choose from provided application templates or propose custom ideas
- **Development Time**: Hands-on building with instructor support
- **Presentations**: Groups showcase their applications

## Repository Structure

```
cashscript-workshop/
├── README.md                 # This file - workshop overview and setup
├── package.json              # Node.js dependencies and scripts
├── .gitignore               # Git ignore patterns
│
├── presentations/            # RevealJS presentation files
│   ├── index.html           # Main presentation entry point
│   ├── css/                 # Custom styles and themes
│   │   ├── theme.css        # Workshop-specific theme
│   │   └── custom.css       # Additional custom styles
│   ├── js/                  # Presentation scripts and plugins
│   ├── day1/                # Day 1 presentation content
│   │   ├── morning/         # Morning session slides
│   │   │   ├── 01-blockchain-basics.html
│   │   │   ├── 02-cryptography.html
│   │   │   ├── 03-bitcoin-cash.html
│   │   │   ├── 04-utxo-model.html
│   │   │   └── 05-smart-contracts-intro.html
│   │   └── afternoon/       # Afternoon session slides
│   │       ├── 01-cashscript-language.html
│   │       ├── 02-contract-structure.html
│   │       ├── 03-practical-examples.html
│   │       └── 04-testing-deployment.html
│   └── day2/                # Day 2 presentation content
│       ├── morning/          # Morning session slides
│       │   ├── 01-quasar-overview.html
│       │   ├── 02-cashscript-integration.html
│       │   ├── 03-frontend-development.html
│       │   └── 04-state-management.html
│       └── afternoon/        # Afternoon session slides
│           ├── 01-project-guidelines.html
│           ├── 02-available-templates.html
│           └── 03-group-work-instructions.html
│
├── contracts/                # Cashscript smart contract examples
│   ├── basic/               # Fundamental contract examples
│   │   ├── hello-world/     # Simple "Hello World" contract
│   │   │   ├── contract.cash
│   │   │   ├── test.js
│   │   │   └── README.md
│   │   ├── simple-payment/  # Basic payment contract
│   │   │   ├── contract.cash
│   │   │   ├── test.js
│   │   │   └── README.md
│   │   └── time-lock/       # Time-based locking contract
│   │       ├── contract.cash
│   │       ├── test.js
│   │       └── README.md
│   ├── intermediate/         # More complex contracts
│   │   ├── multi-sig/       # Multi-signature wallet
│   │   ├── escrow/          # Escrow service contract
│   │   └── voting/          # Simple voting system
│   └── advanced/            # Advanced use cases
│       ├── defi-protocols/  # DeFi-style contracts
│       ├── nft-marketplace/ # NFT trading contracts
│       └── dao-governance/  # DAO governance contracts
│
├── quasar-apps/             # Quasar Framework application examples
│   ├── basic-wallet/        # Simple wallet application
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   ├── contract-builder/    # Contract creation interface
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   └── dapp-template/       # Complete DApp template
│       ├── src/
│       ├── package.json
│       └── README.md
```

### Key Organizational Principles:

1. **Progressive Complexity**: Contracts are organized from basic to advanced
2. **Session-Based Structure**: Presentations follow the workshop timeline
3. **Self-Contained Examples**: Each contract/example has its own directory with all related files
4. **Clear Separation**: Different types of content (presentations, code, docs) are clearly separated
5. **Instructor-Friendly**: Solutions and advanced materials are organized for easy access
6. **Participant-Ready**: Clear paths for participants to follow during hands-on sessions

## Prerequisites

Before attending the workshop, participants should have:

- Basic understanding of JavaScript/TypeScript
- Familiarity with command-line tools
- Node.js (v16 or higher) installed
- Git installed
- A code editor (VS Code recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/cashscript-workshop.git
cd cashscript-workshop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Presentation Server

```bash
npm run present
```

This will start a local server with the RevealJS presentations accessible in your browser.

### 4. Setup Development Environment

```bash
npm run setup
```

This script will install all necessary tools and dependencies for the workshop.

## Running the Workshop

### Starting Presentations

The workshop uses RevealJS for presentations. Each day's content is organized in separate directories:

- **Day 1**: `presentations/day1/`
- **Day 2**: `presentations/day2/`

### Smart Contract Development

All contract examples are located in the `contracts/` directory, organized by complexity level. Each contract includes:

- Source code in Cashscript
- Test cases
- Usage examples
- Documentation

### Quasar Applications

Sample Quasar applications demonstrating Cashscript integration are located in `quasar-apps/`. Each app includes:

- Complete application structure
- Smart contract integration examples
- UI components for contract interaction
- Wallet connection handling

## Workshop Materials

### Presentations
- **Day 1 Morning**: Introduction slides with embedded media and interactive elements
- **Day 1 Afternoon**: Cashscript development slides with live coding examples
- **Day 2 Morning**: Quasar integration slides with framework overview
- **Day 2 Afternoon**: Project guidelines and group work instructions

### Hands-on Exercises
- Basic smart contract writing
- Contract testing and deployment
- Quasar app development
- Group project implementation

### Reference Materials
- Cashscript language reference
- Bitcoin Cash development resources
- Quasar Framework documentation
- Best practices and design patterns

## Contributing

This workshop is designed to be collaborative and improve over time. Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## License

This workshop content is provided under the [MIT License](LICENSE) for educational purposes.

---

**Happy coding! 🚀**

*This workshop is designed to empower developers to build the future of programmable money on Bitcoin Cash.*

