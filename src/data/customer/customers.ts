export interface CustomerData {
  id: number
  first_name: string
  last_name: string
  email: string
  /** Custom field extensions on the datastore level */
  extensions?: {
    [fieldName: string]: string | number
  }
}

/**
 * Since the CRM service is tenant aware:
 * the customer data is different for each tenant,
 * although the customer ID is unique across tenants.
 */
export const customerData: { [tenantId: string]: CustomerData[] } = {
  T1: [
    {
      id: 1,
      first_name: 'Ingmar',
      last_name: 'Filov',
      email: 'ifilov0@example.com',
      extensions: {
        customT1Field1: 'Custom Field Value ABC',
      },
    },
    {
      id: 2,
      first_name: 'Gleda',
      last_name: 'Rosendahl',
      email: 'grosendahl1@example.com',
    },
    {
      id: 3,
      first_name: 'Jodi',
      last_name: 'Gilligan',
      email: 'jgilligan2@example.com',
      extensions: {
        customT1Field1: 'Custom Field Value XYZ',
      },
    },
    {
      id: 4,
      first_name: 'Angele',
      last_name: 'Engley',
      email: 'aengley3@example.com',
    },
    {
      id: 5,
      first_name: 'Broddie',
      last_name: 'Salling',
      email: 'bsalling4@example.com',
    },
    {
      id: 6,
      first_name: 'Fabe',
      last_name: 'Mayhou',
      email: 'fmayhou5@example.com',
    },
    {
      id: 7,
      first_name: 'Christen',
      last_name: 'Izkovicz',
      email: 'cizkovicz6@example.com',
    },
    {
      id: 8,
      first_name: 'Kerwin',
      last_name: 'Timcke',
      email: 'ktimcke7@example.com',
    },
    {
      id: 9,
      first_name: 'Rayshell',
      last_name: 'Raikes',
      email: 'rraikes8@example.com',
    },
    {
      id: 10,
      first_name: 'Lacie',
      last_name: 'Tick',
      email: 'ltick9@example.com',
    },
    {
      id: 11,
      first_name: 'Julieta',
      last_name: 'Bugby',
      email: 'jbugbya@example.com',
    },
    {
      id: 12,
      first_name: 'Inna',
      last_name: 'Baldin',
      email: 'ibaldinb@example.com',
    },
  ],
  T2: [
    {
      id: 13,
      first_name: 'Georgianna',
      last_name: 'Stenning',
      email: 'gstenningc@example.com',
    },
    {
      id: 14,
      first_name: 'Lorrie',
      last_name: 'Woodes',
      email: 'lwoodesd@example.com',
    },
    {
      id: 15,
      first_name: 'Dasya',
      last_name: 'Havelin',
      email: 'dhaveline@example.com',
    },
    {
      id: 16,
      first_name: 'Janna',
      last_name: 'Beekman',
      email: 'jbeekmanf@example.com',
    },
    {
      id: 17,
      first_name: 'Carlie',
      last_name: 'Divill',
      email: 'cdivillg@example.com',
    },
  ],
}
