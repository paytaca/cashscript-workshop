# CashScript Workshop

A comprehensive 2-day workshop covering Bitcoin Cash smart contracts using CashScript, from blockchain fundamentals to practical implementation with Quasar Framework.

## Overview

This repository contains all materials needed to run the CashScript workshop, including presentation slides, smart contract examples, and complete Quasar applications. The workshop takes participants from blockchain basics to building real-world applications with CashScript.

## Workshop Structure

### Day 1: Foundations & Smart Contracts

#### Morning Session: Blockchain Basics
**File**: `presentations/day1/morning/01-blockchain-basics.html`

- **Evolution of Cash**: CASH 1.0, 2.0, and 3.0 progression
- **Transition to CASH 3.0**: Satoshi's whitepaper and Bitcoin launch
- **What is Blockchain?**: Distributed ledger technology and main components
- **Digital Signatures**: Ownership proof, creation process, and verification
- **Hash Functions**: Message hashing and integrity
- **Proof-of-Work & Sybil Prevention**: Consensus mechanism and attack prevention
- **Consensus Rules**: Four categories of miner validation rules
- **Bitcoin Creation**: Mining process and coinbase transactions
- **Bitcoin Addresses**: Virtual vaults and address types (P2PKH, P2SH)
- **UTXO Model**: Unspent outputs, combination, and transfer flow
- **Transaction Anatomy**: Inputs, outputs, fees, and network propagation

#### Afternoon Session: CashScript Language
**File**: `presentations/day1/afternoon/01-cashscript-language.html`

- **CashScript Overview**: Introduction, language capabilities, and IDE
- **Basic Syntax**: Contract structure, data types, and operators
- **Transaction Constraints**: Inputs/outputs, transaction data, and validation rules
- **Signature & Wallet Constraints**: Cryptographic verification and address-based spending
- **Address Types**: P2PKH and P2SH transactions
- **Contract Interactions**: Contract-to-contract and time-locked contracts
- **Tokens & NFTs**: CashTokens and non-fungible token categories
- **Global Functions & Variables**: Built-in utility functions and system variables
- **Coding Demo**: Live coding demonstration

### Day 2: Framework Integration & Applications

#### Morning Session: From Playground to JavaScript
**File**: `presentations/day2/morning/01-playground-to-js.html`

- **Goal**: Moving from CashScript Playground to local development
- **Compiler**: CashScript compilation process (6 slides)
- **Contract Instantiation**: Creating contract instances (8 slides)
  - Constructor Args, Network Providers, Contract Properties, Contract Methods
- **Transaction Builder**: Building and sending transactions (6 slides)
  - Examples and Completing the Transaction
- **More information**: Additional resources and documentation

#### Morning Session: Quasar Framework
**File**: `presentations/day2/morning/02-quasar-framework.html`

- **Goal & Why We Need a UI**: Building blockchain app interfaces
- **Architecture & Development Workflow**: Frontend-backend integration
- **Quasar Framework Overview**: Vue.js framework and cross-platform benefits
- **Vue JS Basics and App Structure**: Core concepts and project file structure
- **Components & Props**: Reusable components and data passing
- **Form Handling**: v-model bindings and validation
- **Component Events**: Event communication
- **Quasar Components**: UI component library
- **State Management**: Pinia store integration
- **Blockchain Integration**: Contract instantiation

## Repository Structure

```
cashscript-workshop/
├── README.md                    # This file - workshop overview
├── package.json                 # Node.js dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
│
├── presentations/               # RevealJS presentation files
│   ├── index.html              # Main presentation entry point
│   ├── css/                    # Custom styles and Tailwind CSS
│   │   ├── style.css           # Compiled Tailwind CSS
│   │   └── tailwind.css        # Tailwind source file
│   ├── day1/                   # Day 1 presentation content
│   │   ├── morning/            # Morning session slides
│   │   │   └── 01-blockchain-basics.html
│   │   └── afternoon/          # Afternoon session slides
│   │       ├── 01-cashscript-language.html
│   │       ├── 01-cashscript-languagev2.html
│   │       └── slides/         # Individual slide components
│   │           ├── about-cashscript.html
│   │           ├── cashscript-ide.html
│   │           ├── contract-structure.html
│   │           ├── exercises.html
│   │           ├── global-functions.html
│   │           ├── global-variables-*.html
│   │           ├── introduction.html
│   │           ├── types-and-operators.html
│   │           └── what-is-a-smart-contract.html
│   ├── day2/                   # Day 2 presentation content
│   │   └── morning/            # Morning session slides
│   │       ├── 01-playground-to-js.html
│   │       └── 02-quasar-framework.html
│   └── images/                 # Presentation images and assets
│       ├── day1/afternoon/     # Day 1 afternoon images
│       └── logos/              # Framework and tool logos
│
├── contracts/                  # CashScript smart contract examples
│   ├── answers/                # Exercise solutions
│   │   └── faucet_answer.cash
│   ├── examples/               # Learning examples
│   │   ├── 1_password.cash to 4_password.cash
│   │   ├── AbsoluteLockTimeDemo.cash
│   │   ├── CheckDataSigDemo.cash
│   │   ├── CheckSigDemo.cash
│   │   ├── IntrospectionVariablesDemo.cash
│   │   ├── LockCreatorDemo.cash
│   │   ├── MinMaxDemo.cash
│   │   ├── RequireFunctionDemo.cash
│   │   └── Sha256Demo.cash
│   ├── exercises/              # Hands-on exercises
│   │   ├── faucet.cash
│   │   ├── FundRaiserSimpleExercise.cash
│   │   ├── SecretNumberExercise.cash
│   │   └── SimpleLottery.cash
│   └── scripts/                # JavaScript integration examples
│       ├── check-data-sig-demo.js
│       ├── faucet.js
│       ├── secret-number-exercise.js
│       └── simple-lottery-exercise.js
│
└── quasar-apps/                # Complete Quasar applications
    ├── paluwagan-ui/           # Paluwagan (group savings) application
    │   ├── src/
    │   │   ├── components/     # Vue components
    │   │   │   ├── buttons/    # Custom button components
    │   │   │   ├── cards/      # Card components
    │   │   │   └── dialogs/    # Dialog components
    │   │   ├── contracts/      # CashScript contracts
    │   │   ├── lib/            # Utility libraries
    │   │   ├── pages/          # Application pages
    │   │   ├── stores/         # Pinia state management
    │   │   └── layouts/        # Layout components
    │   └── package.json
    └── password-vault-ui/      # Password vault application
        ├── src/
        │   ├── components/     # Vue components
        │   ├── contracts/      # CashScript contracts
        │   ├── lib/            # Utility libraries
        │   ├── pages/          # Application pages
        │   └── stores/         # Pinia state management
        └── package.json
```

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

### 3. Build CSS (if making changes)

```bash
npm run build:css
```

### 4. Start the Presentation Server

```bash
npm run present
```

This will start a local server at `http://localhost:8080` with the RevealJS presentations.

### 5. Development Mode (with live reload)

```bash
npm run dev
```

### 6. Setup Development Environment

```bash
npm run setup
```

This script will install CashScript CLI and Quasar CLI globally.

## Available Scripts

- `npm run present` - Start presentation server
- `npm run dev` - Start development server with live reload
- `npm run setup` - Install all dependencies and tools
- `npm run build` - Build all projects (CSS, contracts, Quasar apps)
- `npm run build:css` - Build Tailwind CSS
- `npm run watch:css` - Watch and rebuild CSS on changes
- `npm run test` - Run contract tests
- `npm run clean` - Clean all node_modules

## Workshop Materials

### Presentations
- **Day 1 Morning**: Blockchain fundamentals with interactive Mermaid.js diagrams
- **Day 1 Afternoon**: CashScript language with live coding examples
- **Day 2 Morning**: JavaScript integration and Quasar framework

### Smart Contract Examples
- **Basic Examples**: Password contracts, signature validation, time locks
- **Intermediate**: Multi-signature, escrow, voting systems
- **Advanced**: DeFi protocols, NFT marketplace, DAO governance

### Complete Applications
- **Paluwagan UI**: Group savings application with CashScript integration
- **Password Vault UI**: Secure password management with smart contracts

## Key Features

- **Interactive Presentations**: RevealJS with Mermaid.js diagrams and Tailwind CSS
- **Progressive Learning**: From blockchain basics to advanced smart contracts
- **Hands-on Exercises**: Practical coding exercises with solutions
- **Complete Applications**: Full-stack Quasar applications with CashScript
- **Modern Tooling**: Tailwind CSS, Pinia state management, Vue 3 composition API

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

*This workshop empowers developers to build the future of programmable money on Bitcoin Cash.*