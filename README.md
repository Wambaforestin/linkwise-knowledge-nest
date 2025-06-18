
# LinkWise

<p align="center">
  <img src="public/lovable-uploads/80f7fd34-d116-4d5e-8fdc-9992eb6c23ee.png" alt="LinkWise Logo" width="200" />
</p>

<p align="center">
  <strong>Your digital reference library for organizing and discovering links</strong>
</p>

<p align="center">
  <img src="/lovable-uploads/560f2be1-2e3e-4b23-8d59-c6a2e5e84ae6.png" alt="LinkWise Dashboard Screenshot" width="800" />
</p>

---

## 🌟 Overview

LinkWise is a modern, intuitive web application designed to help you organize, categorize, and discover your digital links efficiently. Built with cutting-edge web technologies, it provides a seamless experience for managing your digital reference library.

## ✨ Key Features

### 📊 **Smart Organization**
- **Advanced Categorization**: Organize links with custom categories and tags
- **Priority Management**: Mark important links with priority levels (High, Medium, Low)
- **Intelligent Search**: Find links quickly with our powerful search functionality

### 📈 **Analytics & Insights**
- **Dashboard Overview**: Get insights into your link collection at a glance
- **Usage Statistics**: Track your most accessed categories and links
- **Visual Analytics**: Beautiful charts and metrics to understand your data

### 🎨 **Modern Interface**
- **Dual View Modes**: Switch between table and card layouts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Export Capabilities**: Export your data in JSON and CSV formats
- **Advanced Pagination**: Navigate through large collections effortlessly

### 🔐 **Secure & Reliable**
- **User Authentication**: Secure login and user management
- **Data Persistence**: All your links are safely stored and backed up
- **Real-time Updates**: Changes are reflected instantly across sessions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/linkwise-knowledge-nest.git
   cd linkwise-knowledge-nest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using LinkWise

## 🛠️ Tech Stack

LinkWise is built with modern, industry-standard technologies:

### Frontend
- **React 18** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### UI Components
- **Shadcn/UI** - Beautiful, accessible component library
- **Lucide React** - Comprehensive icon library
- **Recharts** - Responsive chart library for data visualization

### Backend & Database
- **Supabase** - Open source Firebase alternative
  - Real-time database
  - Authentication
  - Row Level Security (RLS)
  - RESTful APIs

### State Management & Data Fetching
- **TanStack Query** - Powerful data synchronization for React
- **React Hook Form** - Performant forms with easy validation

## 📱 Features in Detail

### Link Management
- Add links with titles, descriptions, and metadata
- Categorize links for better organization
- Add custom tags for flexible filtering
- Set priority levels for important links

### Search & Filter
- Full-text search across titles and descriptions
- Filter by categories, tags, and priority levels
- Sort by date added, title, or priority
- Advanced pagination with customizable page sizes

### Data Export
- Export filtered results to CSV format for spreadsheet analysis
- Export to JSON format for data integration
- Maintain data structure and relationships in exports

### User Experience
- Responsive design that works on all devices
- Dark/light mode support (coming soon)
- Keyboard shortcuts for power users
- Intuitive drag-and-drop interfaces

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Customization
LinkWise is highly customizable. You can modify:
- Color schemes in `tailwind.config.ts`
- Default categories in `src/constants/categories.ts`
- Component styles in respective component files

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Ensure responsive design compatibility
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development
- Icons by [Lucide](https://lucide.dev)
- UI components from [Shadcn/UI](https://ui.shadcn.com)
- Database and auth by [Supabase](https://supabase.com)

---

<p align="center">
  Made with ❤️ using modern web technologies
</p>

<p align="center">
  <a href="https://github.com/your-username/linkwise-knowledge-nest/issues">Report Bug</a>
  ·
  <a href="https://github.com/your-username/linkwise-knowledge-nest/issues">Request Feature</a>
  ·
  <a href="https://github.com/your-username/linkwise-knowledge-nest/discussions">Discussions</a>
</p>
