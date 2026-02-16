# AI Product Development Bootcamp

A self-hosted learning platform for Product Managers & aspiring product builders who want to use AI to build MVPs.

Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Code Quality:** ESLint & Prettier

## 📁 Project Structure

```
├── app/                # Next.js app directory (pages & layouts)
├── components/         # Reusable UI components
│   └── ui/            # shadcn/ui components
├── content/           # Drill content in JSON format
├── lib/               # Utility functions
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd AI-Product-Development-Bootcamp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

Currently included components:
- Button
- Card

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

See [LICENSE](LICENSE) for more information.
