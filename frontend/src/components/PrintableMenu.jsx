import React from 'react';

const PrintableMenu = React.forwardRef(({ menuTitle, menuItems }, ref) => {
  if (!menuItems || menuItems.length === 0) {
    return null; // Or a message indicating an empty menu
  }

  return (
    <div ref={ref} className="p-8 font-sans">
      <style>
        {`
          @media print {
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Times New Roman', Times, serif; /* Classic menu font */
            }
            .printable-menu-container {
              width: 100%;
              margin: 0 auto;
            }
            .menu-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 15px;
            }
            .menu-title {
              font-size: 28px; /* Slightly larger for print */
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            .menu-date {
                font-size: 16px;
                color: #555;
            }
            .menu-item {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .item-name {
              font-size: 20px; /* Slightly larger for print */
              font-weight: bold;
              color: #444;
              margin-bottom: 5px;
            }
            .item-description {
              font-size: 14px; /* Slightly smaller for print */
              color: #666;
              margin-left: 15px;
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>
      <div className="printable-menu-container">
        <div className="menu-header">
          <h1 className="menu-title">
            {menuTitle || 'Our Special Menu'}
          </h1>
          <p className="menu-date">Generated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        {menuItems.map((item, index) => (
          <div key={item.id + '-' + index} className="menu-item">
            <h2 className="item-name">{item.name}</h2>
            <p className="item-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PrintableMenu; 