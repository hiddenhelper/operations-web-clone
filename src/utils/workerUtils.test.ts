import { preloadWorker, sanitizeWorker, sanitizeCertification, preloadConsentForm } from './workerUtils';
import {
  getAddress_1,
  getEthnicity_1,
  getIdentificationType_1,
  getPrimaryLanguage_1,
  getSkilledTrade_1,
  getWorker_1,
  getWorkerCertification_1,
  getIdentificationGeographicLocation_1,
  getConsentForm_1,
  getDate_1,
  getJobTitle_1,
  getLanguageTurnerProtocol_1,
  getSocJobTitle_1,
  getTradeStatus_1,
  getTrades_1,
} from '../test/entities';
import { AddressModel, ConsentFormModel, WorkerModel } from '../modules/models';

describe('workerUtils', () => {
  it('should preloadWorker', () => {
    expect(
      preloadWorker({
        id: '11029ead-e3eb-48d5-a658-cd818a70719f',
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
        mobilePhoneNumber: '+16122222222',
        email: 'test@test.com',
        dateOfBirth: '2001-01-01T00:00:00',
        gender: 0,
        ethnicity: getEthnicity_1(),
        socialSecurityNumber: '123456789',
        isVeteran: false,
        primaryLanguage: getPrimaryLanguage_1(),
        phoneNumber: '',
        identificationNumber: '11223344',
        identificationGeographicLocation: getIdentificationGeographicLocation_1(),
        identificationGeographicLocationId: getIdentificationGeographicLocation_1().id,
        otherTrade: 'Plumbing',
        address: getAddress_1(),
        emergencyContactName: 'Jane',
        emergencyContactPhone: '',
        emergencyContactRelationship: 'Wife',
        trades: [getSkilledTrade_1()],
        allergies: null,
        identificationType: getIdentificationType_1(),
        identificationTypeId: getIdentificationType_1().id,
        isSupervisor: false,
        laborUnionNumber: null,
        isSkilled: true,
        invitationStatus: WorkerModel.WorkerStatus.ACTIVE,
        isAffiliatedToLaborUnion: false,
        inviteMethod: WorkerModel.InviteMethod.MOBILE_PHONE,
      })
    ).toEqual(getWorker_1());
  });

  it('should maintain null values', () => {
    expect(preloadWorker(WorkerModel.getFallbackWorker())).toEqual(WorkerModel.getFallbackWorker());
  });

  it('should sanitizeWorker', () => {
    expect(
      sanitizeWorker({
        ...getWorker_1(),
        phoneNumber: '1 (619) 12345678',
        mobilePhoneNumber: '1 (619) 87654321',
        emergencyContactPhone: '1 (619) 11223344',
        socialSecurityNumber: '12-345-678',
        trades: [getSkilledTrade_1()],
        gender: '' as any,
        address: { city: 'Dallas', borough: AddressModel.Borough.MANHATTAN } as any,
      })
    ).toEqual({
      ...getWorker_1(),
      phoneNumber: '161912345678',
      mobilePhoneNumber: '161987654321',
      emergencyContactPhone: '161911223344',
      socialSecurityNumber: '12345678',
      tradesIds: [getSkilledTrade_1().id],
      trades: [getSkilledTrade_1().id],
      gender: null,
      companyId: null,
      address: { city: 'Dallas', borough: null },
    });
  });

  it('should sanitizeWorker 2', () => {
    expect(
      sanitizeWorker({
        ...getWorker_1(),
        mobilePhoneNumber: null,
        address: {
          ...AddressModel.getFallbackAddress(),
          city: 'New York',
          borough: undefined,
        },
      })
    ).toEqual({
      ...getWorker_1(),
      companyId: null,
      emergencyContactPhone: null,
      mobilePhoneNumber: null,
      phoneNumber: null,
      trades: [getSkilledTrade_1().id],
      address: {
        ...AddressModel.getFallbackAddress(),
        city: 'New York',
      },
    });
  });

  it('should sanitizeCertification', () => {
    expect(sanitizeCertification(getWorkerCertification_1())).toEqual({
      ...getWorkerCertification_1(),
      projectId: null,
    });
  });

  it('should preloadConsentForm', () => {
    expect(
      preloadConsentForm({
        id: '65ccba24-f14e-daab-1ffc-7f7264c75444',
        firstName: 'Christian',
        middleName: 'Manuel',
        lastName: 'Ristango',
        mobilePhoneNumber: '+12133734253',
        email: 'some@email.test',
        dateOfBirth: getDate_1(),
        gender: 0,
        ethnicity: getEthnicity_1(),
        socialSecurityNumber: '123456789',
        isVeteran: false,
        primaryLanguage: getPrimaryLanguage_1(),
        phoneNumber: '+12133734253',
        otherProjectSkilledTrade: 'TEST',
        identificationNumber: '11223344',
        identificationType: getIdentificationType_1(),
        identificationGeographicLocation: getIdentificationGeographicLocation_1(),
        jobTitle: getJobTitle_1(),
        jobTitleId: null,
        tradeStatus: getTradeStatus_1(),
        tradeStatusId: null,
        otherTrade: 'Plumbing',
        address: AddressModel.getFallbackAddress(),
        emergencyContactName: 'Jane',
        emergencyContactPhone: '+12133734253',
        emergencyContactRelationship: 'Wife',
        isSkilled: true,
        isSupervisor: false,
        company: { id: '2', name: 'Warren Brothers Construction' },
        allergies: null,
        paymentType: WorkerModel.PaymentType.HOURLY,
        isAffiliatedToLaborUnion: false,
        laborUnionNumber: '373425',
        yearsOfExperience: 1,
        socJobTitle: getSocJobTitle_1(),
        socJobTitleId: null,
        licensePlate: null,
        invitationStatus: WorkerModel.WorkerProjectInvitationStatus.ACTIVE,
        trades: getTrades_1(),
        skilledTrades: getTrades_1(),
        signatureUrl: 'test',
        supervisorPhone: '+1 (213) 431-4343',
        hardHatNumber: '324123',
        supervisorName: 'supervisor name',
        section3Employee: 0,
        referredById: '1',
        projectId: '65ccba24-f14e-daab-1ffc-7f7264c75444',
        dateOfHire: 1594828379742 as any,
        consentFormFields: getConsentForm_1().consentFormFields,
        createdAt: 1594828379742 as any,
        languageTurnerProtocol: getLanguageTurnerProtocol_1(),
        languageTurnerProtocolId: null,
        projectSkilledTrade: getSkilledTrade_1(),
        projectSkilledTradeId: null,
        hourlyRatePay: 1234,
        section3Resident: 0,
        stepStatus: 0,
        eligibleToWorkInUs: 0,
        lgbtq: 0,
        legalInformation:
          'Lea atentamente la sección Consentimiento del usuario ("Consentimiento del usuario", "Consentimiento"). Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de este Consentimiento.\n\nSu empleador o contratista general controlador requiere Field Control Analytics ("nosotros", "nosotros" o "nuestro"). Recopilamos cierta información sobre cada individuo con acceso a esta aplicación móvil. Entiendo que mi foto digital se utilizará con fines de identificación. Entiendo y estoy de acuerdo con lo siguiente:\n\n1. Mi foto se puede utilizar con fines de identificación relacionados con esta aplicación móvil.\n\n2. Los datos capturados a través de esta aplicación móvil pueden compartirse con el contratista general o su agente autorizado.\n\n3. Entiendo y acepto que ciertos datos personales pueden ser compartidos con Contratistas Generales o su agente autorizado.\n\n4. Entiendo que se me puede solicitar que realice una encuesta de certificación COVID-19 todos los días antes de ingresar al lugar de trabajo para ayudar al contratista general o al gerente del lugar de trabajo en el trabajo en sus esfuerzos por prevenir la propagación del coronavirus en el lugar de trabajo.\n\n5. Entiendo que esta encuesta está disponible para mí electrónicamente a través de una aplicación móvil ofrecida por Field Control Analytics Inc. ("FCA"). Entiendo que el uso de la aplicación móvil para la encuesta es un requisito para mantener el estado de mi insignia activa. Entiendo que la información que proporcione a través de esta solicitud solo se compartirá con el contratista general y / o el administrador del lugar de trabajo, y no será almacenada, retenida ni utilizada por FCA para ningún otro propósito.',
        consentFormName: 'Términos y condiciones para la plataforma y aplicación móvil FCA Freedom',
      })
    ).toEqual(getConsentForm_1());
  });

  it('preloadConsentForm should maintain null values', () => {
    expect(preloadConsentForm(ConsentFormModel.getFallbackConsentForm())).toEqual(ConsentFormModel.getFallbackConsentForm());
  });
});
