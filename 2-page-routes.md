Set up the page structure according to the following prompt:
   
<page-structure-prompt>
Next.js route structure based on navigation menu items (excluding main route). Make sure to wrap all routes with the component:

Routes:
- /home
- /analytics
- /banking
- /messages
- /video
- /team
- /documents
- /settings
- /calendar
- /sync
- /notifications
- /profile

Page Implementations:
/home:
Core Purpose: Dashboard overview and quick access to key features
Key Components
- Activity feed
- Quick action buttons
- Summary statistics
- Recent items widget
Layout Structure
- Grid-based dashboard layout
- Responsive cards that stack on mobile
- Sidebar with navigation

/analytics:
Core Purpose: Data visualization and reporting
Key Components
- Interactive charts

/graphs
- Data filters
- Export functionality
- Date range selector
Layout Structure:
- Full-width charts
- Filterable data tables
- Sticky header with controls

/banking:
Core Purpose: Financial management and transactions
Key Components
- Transaction list
- Balance overview
- Payment forms
- Account selector
Layout Structure
- Split view (accounts

/messages:
Core Purpose: Internal communication hub
Key Components
- Message list
- Conversation view
- Contact sidebar
- Message composer
Layout Structure
- Three-column layout (contacts

/video:
Core Purpose: Video conferencing and recordings
Key Components
- Video player
- Meeting controls
- Participant list
- Recording manager
Layout Structure
- Full-screen video layout
- Floating controls
- Side panel for participants

/team:
Core Purpose: Team management and collaboration
Key Components
- Team member directory
- Role management
- Team chat
- Project assignments
Layout Structure
- Grid of team members
- Detail panels
- Action sidebar

/documents:
Core Purpose: Document management and sharing
Key Components
- File browser
- Upload interface
- Search functionality
- Sharing controls
Layout Structure
- File explorer layout
- Preview pane
- List

/settings:
Core Purpose: Application configuration
Key Components
- Settings forms
- Profile editor
- Notification preferences
- Security settings
Layout Structure
- Tabbed interface
- Form sections
- Save

/calendar:
Core Purpose: Event scheduling and management
Key Components
- Calendar grid
- Event creator
- Schedule viewer
- Time zone selector
Layout Structure
- Monthly

/sync:
Core Purpose: Data synchronization management
Key Components
- Sync status
- Progress indicators
- Error logs
- Manual sync controls
Layout Structure
- Status dashboard
- Log viewer
- Action buttons

/notifications:
Core Purpose: Notification center
Key Components
- Notification list
- Filter controls
- Read

/unread toggle
- Action buttons
Layout Structure:
- Chronological list
- Quick actions
- Filter sidebar

/profile:
Core Purpose: User profile management
Key Components
- Profile editor
- Activity history
- Preference settings
- Account details
Layout Structure
- Profile header
- Tab-based sections
- Mobile-first design

Layouts:
DefaultLayout:
- Applicable routes: All except /video
- Core components
  - Navigation sidebar
  - Header with search
  - User menu
  - Content area
- Responsive behavior
  - Collapsible sidebar
  - Stack navigation on mobile
  - Adjustable content width

VideoLayout
- Applicable routes: /video
- Core components
  - Minimal header
  - Full-screen content
  - Floating controls
- Responsive behavior
  - Adaptive video sizing
  - Touch-friendly controls
  - Picture-in-picture support
</page-structure-prompt>