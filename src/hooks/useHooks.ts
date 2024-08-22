// import useSWR from 'swr';
// import { Donor, Donation, Project, Expense, StaffMember } from '../types';
// import { fetchGraphQL, formatDateLocal, getDonationTypeLabel } from '../utils/functions';

// const fetcher = (query: string) => fetchGraphQL(query).then(data => data);

// // Donors Hooks
// export const useDonors = () => {
//   const { data, error, mutate } = useSWR<{ donors: Donor[] }>(
//     `query { donors { id name number address } }`,
//     fetcher
//   );

//   const addDonor = async (newDonor: Omit<Donor, 'id'>) => {
//     const mutation = `
//       mutation {
//         addDonor(name: "${newDonor.name}", number: "${newDonor.number}", address: "${newDonor.address}") {
//           id name number address
//         }
//       }
//     `;
//     const result = await fetchGraphQL(mutation);
//     mutate();
//     return result.addDonor;
//   };

//   const updateDonor = async (updatedDonor: Donor) => {
//     // Implement the update mutation here
//     // Then revalidate the cache
//     mutate();
//   };

//   return {
//     donors: data?.donors || [],
//     isLoading: !error && !data,
//     isError: error,
//     addDonor,
//     updateDonor,
//   };
// };

// // Donation Hooks
// export const useDonations = () => {
//   const { data, error, mutate } = useSWR<{ donations: any[] }>(
//     `query {
//       donations {
//         id
//         donor { id name number address }
//         date
//         amount
//         type
//         project { id name budget startDate endDate status }
//       }
//     }`,
//     fetcher
//   );

//   const transformedDonations = data?.donations.map((donation: any) => ({
//     id: donation.id,
//     donor: donation.donor.name,
//     date: formatDateLocal(parseInt(donation.date)),
//     amount: donation.amount,
//     type: getDonationTypeLabel(donation.type),
//     project: donation.project ? donation.project.name : '-',
//   })).reverse() || [];

//   const addDonation = async (newDonation: Omit<Donation, 'id'>) => {
//     const mutation = `
//       mutation {
//         addDonation(donorId: "${newDonation.donor}", date: "${newDonation.date}", amount: ${newDonation.amount}, type: "${newDonation.type}", projectId: "${newDonation.project}", receiptImage: "${newDonation.receiptImage}", isAnonymous: ${newDonation.isAnonymous}) {
//           id
//           donor { id name number address }
//           date
//           amount
//           type
//           project { id name budget startDate endDate status }
//           receiptImage
//           isAnonymous
//         }
//       }
//     `;
//     const result = await fetchGraphQL(mutation);
//     mutate();
//     return result.addDonation;
//   };

//   const updateDonation = async (updatedDonation: Donation) => {
//     // Implement the update mutation here
//     // Then revalidate the cache
//     mutate();
//   };

//   return {
//     donations: transformedDonations,
//     isLoading: !error && !data,
//     isError: error,
//     addDonation,
//     updateDonation,
//   };
// };

// // Expenses Hooks
// export const useExpenses = () => {
//   const { data, error, mutate } = useSWR<{ expenses: any[] }>(
//     `query {
//       expenses {
//         id
//         date
//         category
//         amount
//         notes
//         utilityType
//         staffMember
//         project { id name budget startDate endDate status }
//         receiptFile
//       }
//     }`,
//     fetcher
//   );

//   const transformedExpenses = data?.expenses.map((expense: any) => ({
//     id: expense.id,
//     category: expense.category,
//     date: formatDateLocal(parseInt(expense.date)),
//     amount: expense.amount,
//     notes: expense.notes,
//     receiptFile: expense.receiptFile,
//   })).reverse() || [];

//   const addExpense = async (newExpense: Omit<Expense, 'id'>) => {
//     const mutation = `
//       mutation {
//         addExpense(date: "${newExpense.date}", category: "${newExpense.category}", amount: ${newExpense.amount}, notes: "${newExpense.notes}", utilityType: "${newExpense.utilityType}", staffMember: "${newExpense.staffMember}", projectId: "${newExpense.project}", receiptFile: "${newExpense.receiptFile}") {
//           id
//           date
//           category
//           amount
//           notes
//           utilityType
//           staffMember
//           project { id name budget startDate endDate status }
//           receiptFile
//         }
//       }
//     `;
//     const result = await fetchGraphQL(mutation);
//     mutate();
//     return result.addExpense;
//   };

//   const updateExpense = async (updatedExpense: Expense) => {
//     // Implement the update mutation here
//     // Then revalidate the cache
//     mutate();
//   };

//   return {
//     expenses: transformedExpenses,
//     isLoading: !error && !data,
//     isError: error,
//     addExpense,
//     updateExpense,
//   };
// };

// // StaffMembers Hooks
// export const useStaffMembers = () => {
//   const { data, error, mutate } = useSWR<{ staffMembers: StaffMember[] }>(
//     `query { staffMembers { id name number salary } }`,
//     fetcher
//   );

//   const addStaffMember = async (newStaffMember: Omit<StaffMember, 'id'>) => {
//     const mutation = `
//       mutation {
//         addStaffMember(name: "${newStaffMember.name}", number: "${newStaffMember.number}", salary: ${newStaffMember.salary}) {
//           id name number salary
//         }
//       }
//     `;
//     const result = await fetchGraphQL(mutation);
//     mutate();
//     return result.addStaffMember;
//   };

//   const updateStaffMember = async (updatedStaffMember: StaffMember) => {
//     // Implement the update mutation here
//     // Then revalidate the cache
//     mutate();
//   };

//   return {
//     staffMembers: data?.staffMembers || [],
//     isLoading: !error && !data,
//     isError: error,
//     addStaffMember,
//     updateStaffMember,
//   };
// };

// // Projects Hooks
// export const useProjects = () => {
//   const { data, error, mutate } = useSWR<{ projects: Project[] }>(
//     `query { projects { id name budget startDate endDate status } }`,
//     fetcher
//   );

//   const addProject = async (newProject: Omit<Project, 'id'>) => {
//     const mutation = `
//       mutation {
//         addProject(name: "${newProject.name}", budget: ${newProject.budget}, startDate: "${newProject.startDate}", endDate: "${newProject.endDate}", status: "${newProject.status}") {
//           id name budget startDate endDate status
//         }
//       }
//     `;
//     const result = await fetchGraphQL(mutation);
//     mutate();
//     return result.addProject;
//   };

//   const updateProject = async (updatedProject: Project) => {
//     // Implement the update mutation here
//     // Then revalidate the cache
//     mutate();
//   };

//   return {
//     projects: data?.projects || [],
//     isLoading: !error && !data,
//     isError: error,
//     addProject,
//     updateProject,
//   };
// };

// // Combined Hook for All Data
// export const useAllData = () => {
//   const donors = useDonors();
//   const donations = useDonations();
//   const projects = useProjects();
//   const expenses = useExpenses();
//   const staffMembers = useStaffMembers();

//   return {
//     ...donors,
//     ...donations,
//     ...projects,
//     ...expenses,
//     ...staffMembers,
//     isLoading: donors.isLoading || donations.isLoading || projects.isLoading || expenses.isLoading || staffMembers.isLoading,
//     isError: donors.isError || donations.isError || projects.isError || expenses.isError || staffMembers.isError,
//   };
// };

import { useState, useEffect } from 'react';
import { Donor, Donation, Project, Expense, StaffMember } from '../types';
import { fetchGraphQL, formatDateLocal, getDonationTypeLabel } from '../utils/functions';

// Donors Hooks
export const useDonors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const query = `
        query {
          donors {
            id
            name
            number
            address
          }
        }
      `;

      const data = await fetchGraphQL(query);
      setDonors(data.donors.sort((a:Donor, b:Donor) => a.name.localeCompare(b.name)));
    };

    fetchDonors();
  }, []);

  const addDonor = async (newDonor: Omit<Donor, 'id'>) => {
    const mutation = `
      mutation {
        addDonor(name: "${newDonor.name}", number: "${newDonor.number}", address: "${newDonor.address}") {
          id
          name
          number
          address
        }
      }
    `;

    const data = await fetchGraphQL(mutation);
    const addedDonor: Donor = data.addDonor;

    setDonors(prevDonors => [...prevDonors, addedDonor]);
  };

  const updateDonor = async (updatedDonor: Donor) => {
    // Implement the logic to update donor in the database if necessary
    // For now, just updating the local state
    setDonors(prevDonors =>
      prevDonors.map(donor => donor.id === updatedDonor.id ? updatedDonor : donor)
    );
  };

  return { donors, addDonor, updateDonor };
};

// Donation Hooks
export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const query = `
        query {
          donations {
            id
            donor {
              id
              name
              number
              address
            }
            date
            amount
            type
            project {
              id
              name
              budget
              startDate
              endDate
              status
            }
          }
        }
      `;

      const data = await fetchGraphQL(query);
      const transformedDonations = data.donations.map((donation: any) => ({
        id: donation.id,
        donor: donation.donor.name, // Flatten donor's name
        date: formatDateLocal(parseInt(donation.date)),
        amount: donation.amount,
        type: getDonationTypeLabel(donation.type),
        project: donation.project ? donation.project.name : '-',
      }));
      setDonations(transformedDonations.reverse());
    };

    fetchDonations();
  }, []);

  const addDonation = async (newDonation: Omit<Donation, 'id'>) => {
    const mutation = `
      mutation {
        addDonation(donorId: "${newDonation.donor}", date: "${newDonation.date}", amount: ${newDonation.amount}, type: "${newDonation.type}", projectId: "${newDonation.project}", receiptImage: "${newDonation.receiptImage}", isAnonymous: ${newDonation.isAnonymous}) {
          id
          donor {
            id
            name
            number
            address
          }
          date
          amount
          type
          project {
            id
            name
            budget
            startDate
            endDate
            status
          }
          receiptImage
          isAnonymous
        }
      }
    `;

    const data = await fetchGraphQL(mutation);
    const addedDonation: Donation = data.addDonation;

    setDonations(prevDonations => [...prevDonations, addedDonation]);
  };

  const updateDonation = async (updatedDonation: Donation) => {
    // Implement the logic to update donation in the database if necessary
    // For now, just updating the local state
    setDonations(prevDonations =>
      prevDonations.map(donation => donation.id === updatedDonation.id ? updatedDonation : donation)
    );
  };

  return { donations, addDonation, updateDonation };
};



// Expenses Hooks
export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const query = `
        query {
          expenses {
            id
            date
            category
            amount
            notes
            utilityType
            staffMember {
              id
              name
              number
              salary
            }
            project {
              id
              name
              budget
              startDate
              endDate
              status
            }
            receiptFile
          }
        }
      `;

      const data = await fetchGraphQL(query);
      const transformedExpenses = data.expenses.map((expense: Expense) => ({
        id: expense.id,
        category: expense.category, // Flatten donor's name
        date: formatDateLocal(parseInt(expense.date)),
        amount: expense.amount,
        notes: getDonationTypeLabel(expense.notes),
        receiptFile: expense.receiptFile,
      }));
      setExpenses(transformedExpenses.reverse());
    };

    fetchExpenses();
  }, []);

  const addExpense = async (newExpense: Omit<Expense, 'id'>) => {
    const mutation = `
      mutation {
        addExpense(date: "${newExpense.date}", category: "${newExpense.category}", amount: ${newExpense.amount}, notes: "${newExpense.notes}", utilityType: "${newExpense.utilityType}", staffMember: "${newExpense.staffMember}", projectId: "${newExpense.project}", receiptFile: "${newExpense.receiptFile}") {
          id
          date
          category
          amount
          notes
          utilityType
          staffMember {
            id
            name
            number
            salary
          }
          project {
            id
            name
            budget
            startDate
            endDate
            status
          }
          receiptFile
        }
      }
    `;

    const data = await fetchGraphQL(mutation);
    const addedExpense: Expense = data.addExpense;

    setExpenses(prevExpenses => [...prevExpenses, addedExpense]);
  };

  const updateExpense = async (updatedExpense: Expense) => {
    // Implement the logic to update expense in the database if necessary
    // For now, just updating the local state
    setExpenses(prevExpenses =>
      prevExpenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense)
    );
  };

  return { expenses, addExpense, updateExpense };
};
// StaffMembers Hooks
export const useStaffMembers = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      const query = `
        query {
          staffMembers {
            id
            name
            number
            salary
          }
        }
      `;

      const data = await fetchGraphQL(query);
      setStaffMembers(data.staffMembers);
    };

    fetchStaffMembers();
  }, []);

  const addStaffMember = async (newStaffMember: Omit<StaffMember, 'id'>) => {
    const mutation = `
      mutation {
        addStaffMember(name: "${newStaffMember.name}", number: "${newStaffMember.number}", salary: ${newStaffMember.salary}) {
          id
          name
          number
          salary
        }
      }
    `;

    const data = await fetchGraphQL(mutation);
    const addedStaffMember: StaffMember = data.addStaffMember;

    setStaffMembers(prevStaffMembers => [...prevStaffMembers, addedStaffMember]);
  };

  const updateStaffMember = async (updatedStaffMember: StaffMember) => {
    // Implement the logic to update staff member in the database if necessary
    // For now, just updating the local state
    setStaffMembers(prevStaffMembers =>
      prevStaffMembers.map(staffMember =>
        staffMember.id === updatedStaffMember.id ? updatedStaffMember : staffMember
      )
    );
  };

  return { staffMembers, addStaffMember, updateStaffMember };
};
// Projects Hooks
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `
        query {
          projects {
            id
            name
            budget
            startDate
            endDate
            status
          }
        }
      `;

      const data = await fetchGraphQL(query);
      setProjects(data.projects);
    };

    fetchProjects();
  }, []);

  const addProject = async (newProject: Omit<Project, 'id'>) => {
    const mutation = `
      mutation {
        addProject(name: "${newProject.name}", budget: ${newProject.budget}, startDate: "${newProject.startDate}", endDate: "${newProject.endDate}", status: "${newProject.status}") {
          id
          name
          budget
          startDate
          endDate
          status
        }
      }
    `;

    const data = await fetchGraphQL(mutation);
    const addedProject: Project = data.addProject;

    setProjects(prevProjects => [...prevProjects, addedProject]);
  };

  const updateProject = async (updatedProject: Project) => {
    // Implement the logic to update project in the database if necessary
    // For now, just updating the local state
    setProjects(prevProjects =>
      prevProjects.map(project => project.id === updatedProject.id ? updatedProject : project)
    );
  };

  return { projects, addProject, updateProject };
};

// Combined Hook for All Data
export const useAllData = () => {
  const { donors, addDonor, updateDonor } = useDonors();
  const { donations, addDonation, updateDonation } = useDonations();
  const { projects, addProject, updateProject } = useProjects();
  const { expenses, addExpense, updateExpense } = useExpenses();
  const { staffMembers, addStaffMember, updateStaffMember } = useStaffMembers();

  return {
    donors,
    addDonor,
    updateDonor,
    donations,
    addDonation,
    updateDonation,
    projects,
    addProject,
    updateProject,
    expenses,
    addExpense,
    updateExpense,
    staffMembers,
    addStaffMember,
    updateStaffMember
  };
};