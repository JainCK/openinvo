# OpenInvo 📄

A modern, responsive, and feature-rich invoice generation application built with Next.js 15, React 19, and TypeScript. Create professional invoices with ease, customize their appearance, and export them as PDF.

![OpenInvo Banner](https://via.placeholder.com/800x300/1e3a8a/ffffff?text=OpenInvo+-+Professional+Invoice+Generator)

## ✨ Features

### 🏢 Business Management

- **Business Details**: Store and manage company information including name, address, contact details, logo, and tax information
- **Client Management**: Manage customer details with billing and shipping addresses
- **GST/Tax Support**: Full support for Indian GST (CGST/SGST) and international tax systems
- **Multi-Currency**: Support for USD, EUR, GBP, INR with automatic currency symbols

### 📋 Invoice Creation

- **Dynamic Item Management**: Add, edit, and remove invoice items with real-time calculations
- **HSN/SAC Codes**: Support for Indian tax classification codes
- **Tax Calculations**: Automatic tax calculations with breakdown for different tax rates
- **Notes & Terms**: Add custom notes and authorized signatory details
- **Draft Management**: Save and manage invoice drafts

### 🎨 Customization & Preview

- **Real-time Preview**: Live preview of invoice as you create it
- **Appearance Customization**: Modify invoice layout and styling
- **Mobile-Responsive Design**: Fully responsive design optimized for all devices
- **Print-Friendly**: Optimized layout for printing

### 📤 Export Options

- **PDF Generation**: High-quality PDF export using jsPDF and html2canvas
- **Print Support**: Direct printing with optimized print styles
- **Multiple Formats**: Various export options for different use cases

### 📱 Mobile Experience

- **Responsive Design**: Fully mobile-responsive interface
- **Touch-Friendly**: Optimized for touch interactions
- **Mobile Customization Panel**: Slide-out panel for mobile devices
- **Accessible Actions**: Easy access to all features on mobile devices

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Components**: Radix UI primitives with custom components
- **Icons**: Lucide React

### State Management

- **Redux Toolkit**: For global state management
- **React Redux**: React bindings for Redux

### Export & Printing

- **jsPDF**: PDF generation
- **html2canvas**: HTML to canvas conversion for high-quality PDF export

### Development Tools

- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/openinvo.git
   cd openinvo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
openinvo/
├── app/                          # Next.js 15 App Router
│   ├── create/                   # Invoice creation page
│   ├── preview/                  # Invoice preview page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Redux provider wrapper
├── components/                   # React components
│   ├── invoiceComponents/        # Invoice creation components
│   │   ├── actionBtn.tsx        # Action buttons component
│   │   ├── authorizedSignatory.tsx # Signatory component
│   │   ├── businessDetails.tsx  # Business details form
│   │   ├── clientDetails.tsx    # Client details form
│   │   ├── InvoDetails.tsx      # Invoice header details
│   │   ├── invoiceItems.tsx     # Invoice items management
│   │   └── Notes.tsx           # Notes and terms component
│   ├── previewComponents/        # Invoice preview components
│   │   ├── actBtn.tsx           # Preview action buttons
│   │   ├── customization.tsx    # Appearance customization
│   │   └── invoiceRef.tsx       # Invoice template component
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx           # Button component
│   │   ├── card.tsx            # Card component
│   │   ├── input.tsx           # Input component
│   │   └── ...                 # Other UI components
│   ├── commonHeader.tsx         # Common page header
│   ├── ctaSection.tsx          # Call-to-action section
│   ├── featureGrid.tsx         # Features grid component
│   ├── footer.tsx              # Footer component
│   └── header.tsx              # Main header component
├── lib/                         # Utility functions
│   └── utils.ts                # Common utilities
├── store/                       # Redux store
│   ├── invoiceSlice.ts         # Invoice state management
│   └── store.ts                # Store configuration
├── public/                      # Static assets
└── ...config files             # Configuration files
```

## 🎯 Usage Guide

### Creating an Invoice

1. **Navigate to Create Page**: Go to `/create` or click "Create Invoice" from the home page
2. **Fill Invoice Details**: Add invoice number, date, and due date
3. **Add Business Information**: Enter your company details, GST information, and upload logo
4. **Add Client Information**: Enter customer details and shipping information if different
5. **Add Invoice Items**: Add products/services with quantities, prices, and tax rates
6. **Add Notes**: Include any additional terms, conditions, or notes
7. **Add Signatory**: Include authorized signatory information
8. **Generate Invoice**: Click "Generate Invoice" to proceed to preview

### Previewing and Customizing

1. **Review Invoice**: Check all details in the preview
2. **Customize Appearance**: Use the customization panel to modify styling
3. **Mobile View**: On mobile, tap "Customize Appearance" to access the customization panel
4. **Export Options**: Choose from Print, Save as PDF, or Edit Invoice

### Mobile Experience

- **Responsive Design**: All features are accessible on mobile devices
- **Touch-Friendly**: Optimized for touch interactions
- **Slide-out Panel**: Customization panel slides in from the side on mobile
- **Accessible Actions**: Action buttons are positioned for easy thumb access

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization

The application supports various customization options:

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Typography**: Customize fonts and text styles
- **Layout**: Adjust spacing and layout configurations
- **Components**: Extend or modify existing components

## 🔧 API Reference

### Redux Store Structure

```typescript
interface InvoiceState {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  businessDetails: BusinessDetails;
  clientDetails: ClientDetails;
  notes: string;
  isIndia: boolean;
  currency: string;
  authorizedSignatory: {
    name: string;
    designation: string;
    signature: string | null;
  };
}
```

### Key Actions

- `updateInvoiceDetails`: Update invoice header information
- `updateBusinessDetails`: Update business information
- `updateClientDetails`: Update client information
- `addItem`: Add new invoice item
- `updateItem`: Update existing invoice item
- `removeItem`: Remove invoice item
- `updateNotes`: Update invoice notes
- `updateSignatory`: Update authorized signatory

## 🎨 Styling

The application uses Tailwind CSS for styling with custom components and animations:

- **Design System**: Consistent color palette and typography
- **Responsive Design**: Mobile-first approach with breakpoint-specific styles
- **Animations**: Smooth transitions and micro-interactions
- **Print Styles**: Optimized styles for printing and PDF generation

## 🐛 Troubleshooting

### Common Issues

1. **Hydration Errors**: Ensure all table structures use proper `<thead>`, `<tbody>`, and `<tfoot>` elements
2. **PDF Generation**: Check for console errors if PDF generation fails
3. **Mobile Responsiveness**: Test on various devices and screen sizes
4. **State Persistence**: Redux state resets on page refresh (by design)

### Performance Optimization

- Images are optimized using Next.js Image component
- Code splitting with dynamic imports where applicable
- Tailwind CSS purging removes unused styles in production
- Components are memoized where appropriate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code consistency
- Test on multiple devices and browsers
- Ensure accessibility standards are met
- Write clear, descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help getting started:

- Create an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

**Made with ❤️ by the OpenInvo Team**

_Create professional invoices with ease and style._
