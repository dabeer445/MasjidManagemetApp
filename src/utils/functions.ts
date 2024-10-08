import { API_URL, DonationTypes } from "./const";

export const formatCurrency = (amount: number): string => {
  return `PKR ${amount.toLocaleString()}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatReportDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(parseInt('20' + year), parseInt(month) - 1, parseInt(day));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  const formattedDay = date.getDate();
  const formattedMonth = monthNames[date.getMonth()];
  const formattedYear = date.getFullYear();

  return `${formattedDay}${getDaySuffix(formattedDay)} ${formattedMonth}, ${formattedYear}`;
};
export const fetchGraphQL = async (query: string, variables?: Record<string, any>) => {
  const Endpoint = API_URL + "/graphql";

  try {
    const response = await fetch(Endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers here if needed
        // 'Authorization': `Bearer ${your_auth_token}`
      },
      body: JSON.stringify({ 
        query,
        variables // Include variables if they are provided
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error('GraphQL operation failed');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching GraphQL:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};


export const formatDateLocal = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

  return `${day}/${month}/${year}`;
};

export const getDonationTypeLabel = (value: string): string => {
  const type = DonationTypes.find(type => type.value === value);
  return type ? type.label : value; // Return the label or the original value if not found
};


