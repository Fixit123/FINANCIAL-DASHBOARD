Initialize Next.js in current directory:
```bash
mkdir temp; cd temp; npx create-next-app@latest . -y --typescript --tailwind --eslint --app --use-npm --src-dir --import-alias "@/*" -no --turbo
```

Now let's move back to the parent directory and move all files except prompt.md.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

Set up the frontend according to the following prompt:
<frontend-prompt>
Create detailed components with these requirements:
1. Use 'use client' directive for client-side components
2. Make sure to concatenate strings correctly using backslash
3. Style with Tailwind CSS utility classes for responsive design
4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
7. Create root layout.tsx page that wraps necessary navigation items to all pages
8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
9. Accurately implement necessary grid layouts
10. Follow proper import practices:
   - Use @/ path aliases
   - Keep component imports organized
   - Update current src/app/page.tsx with new comprehensive code
   - Don't forget root route (page.tsx) handling
   - You MUST complete the entire prompt before stopping

<summary_title>
Financial Dashboard with Task Management Interface
</summary_title>

<image_analysis>

1. Navigation Elements:
- Left sidebar with: Home, Analytics, Banking, Messages, Video, Team, Documents, Settings
- Top right with: Calendar, Sync, Notifications, Profile


2. Layout Components:
- Main container: ~1200px width
- Left sidebar: 80px width
- Card grid: 2x2 layout for key metrics
- Chart section: ~800px width
- Email section: ~800px width
- Right sidebar: ~300px width


3. Content Sections:
- Key metrics cards (4 cards)
- Revenue chart
- New clients counter
- Invoices overdue section
- Recent emails list
- Formation status card
- To-do list
- Board meeting card


4. Interactive Controls:
- Chart timeline navigation
- Menu toggles in cards
- View status button
- Profile dropdown
- Navigation icons
- Email list interactions


5. Colors:
- Primary background: #F5F8FA
- Secondary background: #FFFFFF
- Accent: #000000
- Text: #1A1A1A
- Success green: #00B574
- Warning red: #FF4D4D
- Chart colors: #2D7FF9, #E5E5E5


6. Grid/Layout Structure:
- 12-column grid system
- 24px gap between cards
- Responsive breakpoints at 1440px, 1024px, 768px
- Flexible card layouts
</image_analysis>

<development_planning>

1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── Dashboard
│   ├── features/
│   │   ├── MetricsCards
│   │   ├── RevenueChart
│   │   ├── EmailList
│   │   └── TodoList
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```


2. Key Features:
- Real-time metrics updates
- Interactive revenue chart
- Email integration
- Task management
- Formation status tracking
- Team management


3. State Management:
```typescript
interface AppState {
├── dashboard: {
│   ├── metrics: MetricsData
│   ├── revenue: RevenueData
│   ├── emails: EmailsState
│   └── tasks: TasksState
├── }
├── user: {
│   ├── profile: UserProfile
│   ├── preferences: UserPreferences
│   └── notifications: NotificationState
├── }
}
```


4. Routes:
```typescript
const routes = [
├── '/dashboard',
├── '/analytics/*',
├── '/banking/*',
├── '/team/*',
└── '/settings/*'
]
```


5. Component Architecture:
- DashboardLayout (parent)
- MetricsGrid (container)
- RevenueChart (feature)
- EmailList (feature)
- TaskManager (feature)
- StatusCard (shared)


6. Responsive Breakpoints:
```scss
$breakpoints: (
├── 'desktop': 1440px,
├── 'laptop': 1024px,
├── 'tablet': 768px,
└── 'mobile': 375px
);
```
</development_planning>
</frontend-prompt>

IMPORTANT: Please ensure that (1) all KEY COMPONENTS and (2) the LAYOUT STRUCTURE are fully implemented as specified in the requirements. Ensure that the color hex code specified in image_analysis are fully implemented as specified in the requirements.