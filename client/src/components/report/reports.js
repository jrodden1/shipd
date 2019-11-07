import React from 'react';

const Reports = ({ reports }) => {
   return (
      <div>
         Total Packages: {reports.totalPackages}
      </div>
   );
}

export default Reports;
