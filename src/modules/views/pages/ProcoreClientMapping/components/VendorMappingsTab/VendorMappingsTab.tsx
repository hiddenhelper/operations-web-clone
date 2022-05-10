import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { GeneralModel, ProcoreModel } from '../../../../../models';
import { IProcoreSaveVendorMapping } from '../../../../../models/procore';
import Mapping, { INewMapping } from '../Mapping';

export interface IVendorMappingsTabProps {
  clientId: string;
  procoreVendors?: {
    clientId: string;
    vendors: ProcoreModel.IProcoreVendors;
  };
  procoreVendorMappings?: {
    clientId: string;
    mappings: ProcoreModel.IProcoreVendorMappings;
  };
  procoreVendorsLoading: GeneralModel.ILoadingStatus;
  procoreVendorMappingsLoading: GeneralModel.ILoadingStatus;
  procoreVendorMappingsSaving: GeneralModel.ILoadingStatus;
  fetchProcoreVendors: (clientId: string) => void;
  fetchProcoreVendorMappings: (clientId: string) => void;
  saveProcoreVendorMappings: (clientId: string, mappings: IProcoreSaveVendorMapping[]) => void;
}

const VendorMappingsTab = ({
  clientId,
  procoreVendors,
  procoreVendorMappings,
  procoreVendorsLoading,
  procoreVendorMappingsLoading,
  procoreVendorMappingsSaving,
  fetchProcoreVendors,
  fetchProcoreVendorMappings,
  saveProcoreVendorMappings,
}: IVendorMappingsTabProps) => {
  const vendorMappingsReady = useMemo(() => procoreVendors?.clientId === clientId && procoreVendors?.vendors?.items && procoreVendorMappings?.mappings?.items, [
    clientId,
    procoreVendors,
    procoreVendorMappings,
  ]);

  const vendorMappingsIsLoading = useMemo(() => procoreVendorMappingsLoading?.isLoading || procoreVendorsLoading?.isLoading, [
    procoreVendorsLoading,
    procoreVendorMappingsLoading,
  ]);

  const vendorMappingsLoadingError = useMemo(() => procoreVendorMappingsLoading?.hasError || procoreVendorsLoading?.hasError, [
    procoreVendorsLoading,
    procoreVendorMappingsLoading,
  ]);

  const vendorOptions = useMemo(
    () => procoreVendors?.vendors?.items?.map(item => ({ id: item.id, name: item.name, extraId: item.taxpayerIdentificationNumber })),
    [procoreVendors]
  );

  const vendorItems = useMemo(
    () =>
      procoreVendorMappings?.mappings?.items?.map(item => ({
        id: item.company.id,
        name: item.company.name,
        extraId: item.company.taxpayerIdentificationNumber,
        status: item.mappingStatus,
        mapId: item.procoreVendorId,
        isDisabled: item.isDisabled,
      })),
    [procoreVendorMappings]
  );

  useEffect(() => {
    if (!vendorMappingsReady) {
      fetchProcoreVendors(clientId);
      fetchProcoreVendorMappings(clientId);
    }
  }, [clientId, fetchProcoreVendors, fetchProcoreVendorMappings, vendorMappingsReady]);

  const saveVendorMappings = useCallback(
    (mappings: INewMapping[]) => {
      saveProcoreVendorMappings(
        clientId,
        mappings.map(mapping => ({ vendorCompanyId: mapping.itemId, procoreVendorId: mapping.mapId, isDisabled: mapping.disabled }))
      );
    },
    [clientId, saveProcoreVendorMappings]
  );

  return (
    <>
      {vendorMappingsIsLoading && 'Loading...'}
      {vendorMappingsLoadingError && 'Error while loading Procore Data...'}
      {!vendorMappingsLoadingError && vendorMappingsReady && (
        <Mapping
          onSave={saveVendorMappings}
          options={vendorOptions}
          items={vendorItems}
          vendorMode={true}
          saving={procoreVendorMappingsSaving?.isLoading || procoreVendorMappingsLoading?.isLoading}
        />
      )}
    </>
  );
};

export default memo(VendorMappingsTab);
