# Clone frontend repository
git clone [https://github.com/tlim414/yoripe-frontend.git](https://github.com/tlim414/yoripe-frontend.git)
cd yoripe-frontend

# Install dependencies
pnpm install

# Set up environment variables (.env.local)
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
VITE_API_BASE_URL="http://localhost:5050"

# Start Vite development server
pnpm  dev
