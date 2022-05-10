import { preloadInvoice, sanitizeInvoice } from './invoiceUtils';
import { getInvoice_1 } from '../test/entities';

describe('invoiceUtils', () => {
  it('should sanitize invoice', () => {
    expect(sanitizeInvoice(getInvoice_1())).toEqual({
      billingCompanyId: null,
      items: [
        {
          amount: 1,
          detail: 'test',
          serviceId: '678150f6-c824-4a0d-b004-f4a46b7e97ac',
        },
        {
          amount: null,
          detail: null,
          serviceId: null,
        },
      ],
      notes: 'Test',
      projectId: '1',
    });
  });

  it('should preload invoice', () => {
    expect(
      preloadInvoice({
        company: { id: 'cbafec09-d90e-46bb-a75d-d4431400fa87', name: 'Nicks Brothers LLC' },
        dueDate: null,
        id: '8452adc6-e39f-4478-8b73-ea115db8ff45',
        invoiceDate: '2021-01-06T00:00:00',
        invoiceNumber: 31,
        items: [{ amount: 15, detail: 'asd', service: { id: 'fcf9e0aa-0b8b-4e22-b9d9-2c0442f71839', name: 'Enrollment Free' } }],
        notes: null,
        paymentDate: null,
        project: { id: '035b8add-07d1-4506-a379-3f482c181b0a', name: 'Tandil Bar - Rodo' },
        status: 0,
        subtotal: 255,
        taxAmount: 7.65,
        total: 262.65,
      })
    ).toEqual({
      project: { id: '035b8add-07d1-4506-a379-3f482c181b0a', name: 'Tandil Bar - Rodo' },
      company: { id: 'cbafec09-d90e-46bb-a75d-d4431400fa87', name: 'Nicks Brothers LLC' },
      notes: '',
      items: [{ amount: 15, detail: 'asd', service: { id: 'fcf9e0aa-0b8b-4e22-b9d9-2c0442f71839', name: 'Enrollment Free' } }],
    });
  });
});
