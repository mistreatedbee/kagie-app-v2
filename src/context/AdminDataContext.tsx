/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { adminResources, AdminRecord } from '../data/adminMockData';

export interface AdminToast {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

interface AdminDataContextValue {
  resources: Record<string, AdminRecord[]>;
  toasts: AdminToast[];
  addRecord: (resourceKey: string, record: AdminRecord) => void;
  updateRecord: (resourceKey: string, recordId: string, updates: Partial<AdminRecord>) => void;
  deleteRecord: (resourceKey: string, recordId: string) => void;
  bulkDeleteRecords: (resourceKey: string, recordIds: string[]) => void;
  changeStatus: (resourceKey: string, recordIds: string[], status: string) => void;
  addToast: (toast: Omit<AdminToast, 'id'>) => void;
  dismissToast: (toastId: string) => void;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

const createInitialResources = () =>
  adminResources.reduce<Record<string, AdminRecord[]>>((accumulator, resource) => {
    accumulator[resource.key] = resource.initialRecords;
    return accumulator;
  }, {});

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<Record<string, AdminRecord[]>>(createInitialResources);
  const [toasts, setToasts] = useState<AdminToast[]>([]);

  const addToast = useCallback((toast: Omit<AdminToast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((toastId: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  }, []);

  const appendAuditLog = useCallback((name: string, description: string) => {
    const log: AdminRecord = {
      id: `audit-${Date.now()}`,
      name,
      owner: 'Kagie Admin',
      category: 'Admin Action',
      status: 'Complete',
      date: new Date().toISOString().slice(0, 10),
      description
    };

    setResources((current) => ({
      ...current,
      auditLogs: [log, ...(current.auditLogs || [])]
    }));
  }, []);

  const addRecord = useCallback(
    (resourceKey: string, record: AdminRecord) => {
      // TODO: persist created admin records through the production API.
      setResources((current) => ({
        ...current,
        [resourceKey]: [record, ...(current[resourceKey] || [])]
      }));
      appendAuditLog('Record created', `${record.name} was created in ${resourceKey}.`);
    },
    [appendAuditLog]
  );

  const updateRecord = useCallback(
    (resourceKey: string, recordId: string, updates: Partial<AdminRecord>) => {
      // TODO: replace local state update with authenticated admin API mutation.
      setResources((current) => ({
        ...current,
        [resourceKey]: (current[resourceKey] || []).map((record) =>
          record.id === recordId ? { ...record, ...updates } : record
        )
      }));
      appendAuditLog('Record updated', `${recordId} was updated in ${resourceKey}.`);
    },
    [appendAuditLog]
  );

  const deleteRecord = useCallback(
    (resourceKey: string, recordId: string) => {
      // TODO: enforce role permissions before destructive production deletes.
      setResources((current) => ({
        ...current,
        [resourceKey]: (current[resourceKey] || []).filter((record) => record.id !== recordId)
      }));
      appendAuditLog('Record deleted', `${recordId} was deleted from ${resourceKey}.`);
    },
    [appendAuditLog]
  );

  const bulkDeleteRecords = useCallback(
    (resourceKey: string, recordIds: string[]) => {
      setResources((current) => ({
        ...current,
        [resourceKey]: (current[resourceKey] || []).filter((record) => !recordIds.includes(record.id))
      }));
      appendAuditLog('Bulk delete', `${recordIds.length} records were deleted from ${resourceKey}.`);
    },
    [appendAuditLog]
  );

  const changeStatus = useCallback(
    (resourceKey: string, recordIds: string[], status: string) => {
      setResources((current) => ({
        ...current,
        [resourceKey]: (current[resourceKey] || []).map((record) =>
          recordIds.includes(record.id) ? { ...record, status } : record
        )
      }));
      appendAuditLog('Status changed', `${recordIds.length} ${resourceKey} record(s) changed to ${status}.`);
    },
    [appendAuditLog]
  );

  const value = useMemo(
    () => ({
      resources,
      toasts,
      addRecord,
      updateRecord,
      deleteRecord,
      bulkDeleteRecords,
      changeStatus,
      addToast,
      dismissToast
    }),
    [resources, toasts, addRecord, updateRecord, deleteRecord, bulkDeleteRecords, changeStatus, addToast, dismissToast]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used inside AdminDataProvider.');
  }

  return context;
}
