import InvoiceClassMock from "./mocks/InvoiceClassMock";
import InvoiceController from '../../src/controllers/invoice-controller';


describe('Redundancia de datos en la clase Invoice', () => {
  it('Se ve si se maneja correctamente cuando hay un fallo en Invoice Class cuando se rechaza una factura', async () => {
    const controller = InvoiceController.getInstance();

    // Sobrescribimos invoicesArray manualmente con mocks
    const mockInvoice = new InvoiceClassMock(
        123, 
        '2024-01-01',
        'pharmacy1',
        'medicine1',
        10,
        'Pendiente',
        'usuario1',
        'id123',
        null
    );
    
    controller['invoicesArray'] = [mockInvoice as any];

    await expect(
      controller.setInvoiceState(123, 'Rechazada', 'usuario1', 'medicine1', 10, 'id123')
    ).resolves.toBeDefined;
  });
it('Se ve si se manja correctamente un fallo en Invoice Class cuando se filtran facturas', async () => {
    const controller = InvoiceController.getInstance();

    // Sobrescribimos invoicesArray manualmente con mocks
    const mockInvoice = new InvoiceClassMock(
        123, 
        '2024-01-01',
        'pharmacy1',
        'medicine1',
        10,
        'Pendiente',
        'usuario1',
        'id123',
        null
    );
    
    controller['invoicesArray'] = [mockInvoice as any];
    const stateFilter = { Aprobada: 'false', Rechazada: 'false', EnEspera: 'true' };
    const dateRangeFilter = { start: '2025-06-04', end: '2025-06-14' };
    const searchInvoiceNumber = '';
    const userFilter = 'oscarCliente';

    await expect(
      controller.filterInvoices(stateFilter, dateRangeFilter, searchInvoiceNumber, userFilter)
    ).resolves.toBeDefined;
  });
});