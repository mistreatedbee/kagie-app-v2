import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  Eye,
  FileDown,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
  X
} from 'lucide-react';
import { AdminColumn, AdminFilter, AdminRecord } from '../../data/adminMockData';
import { AdminToast, useAdminData } from '../../context/AdminDataContext';

const statusStyles: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  verified: 'bg-green-50 text-green-700 border-green-200',
  paid: 'bg-green-50 text-green-700 border-green-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  published: 'bg-green-50 text-green-700 border-green-200',
  complete: 'bg-green-50 text-green-700 border-green-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  resolved: 'bg-blue-50 text-blue-700 border-blue-200',
  sent: 'bg-blue-50 text-blue-700 border-blue-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  scheduled: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  draft: 'bg-gray-50 text-gray-700 border-gray-200',
  paused: 'bg-gray-50 text-gray-700 border-gray-200',
  warning: 'bg-orange-50 text-orange-700 border-orange-200',
  urgent: 'bg-orange-50 text-orange-700 border-orange-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  failed: 'bg-red-50 text-red-700 border-red-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  suspended: 'bg-red-50 text-red-700 border-red-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  hidden: 'bg-red-50 text-red-700 border-red-200',
  flagged: 'bg-red-50 text-red-700 border-red-200',
  escalated: 'bg-red-50 text-red-700 border-red-200'
};

const formatValue = (value: unknown) => {
  if (typeof value === 'number') return value.toLocaleString('en-ZA');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value || '-');
};

const downloadCsv = (filename: string, records: AdminRecord[], columns: AdminColumn[]) => {
  const header = columns.map((column) => column.label).join(',');
  const rows = records.map((record) =>
    columns
      .map((column) => {
        const value = formatValue(record[column.key]).replace(/"/g, '""');
        return `"${value}"`;
      })
      .join(',')
  );
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export function StatusBadge({ status }: { status: string }) {
  const className = statusStyles[status.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
}

export function UserAvatar({ name, image }: { name: string; image?: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  if (image) {
    return <img src={image} alt={name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />;
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-xs font-bold text-white">
      {initials || 'KA'}
    </div>
  );
}

export function StatCard({
  label,
  value,
  trend,
  icon: Icon,
  accent = 'red'
}: {
  label: string;
  value: string;
  trend?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent?: 'red' | 'green' | 'blue' | 'orange';
}) {
  const accents = {
    red: 'bg-[#E50914]/10 text-[#E50914]',
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
    orange: 'bg-orange-50 text-orange-700'
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accents[accent]}`}>
          <Icon size={21} />
        </div>
        {trend && <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">{trend}</span>}
      </div>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#111827]">{value}</p>
    </motion.div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...'
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="relative block min-w-0 flex-1">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-3 text-sm font-medium text-[#111827] outline-none transition focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10"
      />
    </label>
  );
}

export function FilterDropdown({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="min-w-[150px]">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-bold text-[#111827] outline-none focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10">
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DateRangePicker() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <input
        type="date"
        className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-bold text-[#111827] outline-none focus:border-[#E50914]"
      />
      <input
        type="date"
        className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-bold text-[#111827] outline-none focus:border-[#E50914]"
      />
    </div>
  );
}

export function ExportButton({
  onCsv,
  onPdf
}: {
  onCsv: () => void;
  onPdf: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onCsv}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-bold text-[#111827] transition hover:border-[#E50914]/30 hover:text-[#E50914]">
        <Download size={16} />
        CSV
      </button>
      <button
        onClick={onPdf}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-bold text-[#111827] transition hover:border-[#E50914]/30 hover:text-[#E50914]">
        <FileDown size={16} />
        PDF
      </button>
    </div>
  );
}

export function Pagination({
  page,
  pageCount,
  onPageChange
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#E5E7EB] px-4 py-3">
      <p className="text-sm font-semibold text-gray-500">
        Page {page} of {Math.max(pageCount, 1)}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#111827] disabled:opacity-40">
          <ChevronLeft size={17} />
        </button>
        <button
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page >= pageCount}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#111827] disabled:opacity-40">
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onClose
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-[#111827]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">{message}</p>
              </div>
              <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-bold text-[#111827]">
                Cancel
              </button>
              <button onClick={onConfirm} className="rounded-xl bg-[#E50914] px-4 py-2 text-sm font-bold text-white">
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FormModal({
  open,
  title,
  fields,
  initialValues,
  onSubmit,
  onClose
}: {
  open: boolean;
  title: string;
  fields: string[];
  initialValues?: Partial<AdminRecord>;
  onSubmit: (values: Partial<AdminRecord>) => void;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Partial<AdminRecord>>(initialValues || {});

  React.useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.form
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(values);
            }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-lg font-black text-[#111827]">{title}</h3>
              <button type="button" onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field} className={field === 'description' ? 'sm:col-span-2' : ''}>
                  <span className="mb-1 block text-xs font-black uppercase tracking-wide text-gray-500">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </span>
                  {field === 'description' ? (
                    <textarea
                      value={String(values[field] || '')}
                      onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
                      rows={4}
                      className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm font-medium outline-none focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10"
                    />
                  ) : (
                    <input
                      value={String(values[field] || '')}
                      onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
                      className="h-11 w-full rounded-xl border border-[#E5E7EB] px-3 text-sm font-medium outline-none focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10"
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-bold text-[#111827]">
                Cancel
              </button>
              <button type="submit" className="rounded-xl bg-[#E50914] px-4 py-2 text-sm font-bold text-white">
                Save
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DetailDrawer({
  open,
  record,
  onClose
}: {
  open: boolean;
  record: AdminRecord | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && record && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30">
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#E50914]">Detail view</p>
                <h3 className="mt-1 text-2xl font-black text-[#111827]">{record.name}</h3>
              </div>
              <button onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {Object.entries(record).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-[#E5E7EB] bg-[#F5F6FA] p-3">
                  <p className="text-xs font-black uppercase tracking-wide text-gray-500">{key}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-[#111827]">{formatValue(value)}</p>
                </div>
              ))}
            </div>
            <ActivityTimeline
              items={[
                'Created in mock admin workspace',
                'Reviewed by Kagie Admin',
                'Awaiting backend API sync'
              ]}
            />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ActionMenu({
  onView,
  onEdit,
  onStatus,
  onDelete
}: {
  onView: () => void;
  onEdit: () => void;
  onStatus: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((current) => !current)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#111827] hover:border-[#E50914]/30">
        <MoreHorizontal size={17} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-xl">
            {[
              ['View details', Eye, onView],
              ['Edit', Edit3, onEdit],
              ['Change status', Check, onStatus],
              ['Delete', Trash2, onDelete]
            ].map(([label, Icon, handler]) => (
              <button
                key={String(label)}
                onClick={() => {
                  setOpen(false);
                  (handler as () => void)();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold text-[#111827] hover:bg-[#F5F6FA]">
                {React.createElement(Icon as React.ComponentType<{ size?: number }>, { size: 16 })}
                {String(label)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EmptyState({
  title = 'No records found',
  message = 'Try changing your search or filters.',
  actionLabel,
  onAction
}: {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E50914]/10 text-[#E50914]">
        <Search size={24} />
      </div>
      <h3 className="text-lg font-black text-[#111827]">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-gray-500">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="mt-4 rounded-xl bg-[#E50914] px-4 py-2 text-sm font-bold text-white">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="h-12 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-black text-[#111827]">{title}</h3>
      <div className="h-72">{children}</div>
    </motion.div>
  );
}

export function AdminTabs({
  tabs,
  active,
  onChange
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-black transition ${
            active === tab ? 'bg-[#E50914] text-white' : 'text-gray-500 hover:bg-[#F5F6FA] hover:text-[#111827]'
          }`}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export function ActivityTimeline({ items }: { items: string[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <h4 className="mb-4 text-sm font-black text-[#111827]">Activity Timeline</h4>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E50914] text-xs font-black text-white">
                {index + 1}
              </span>
              {index < items.length - 1 && <span className="h-full w-px bg-[#E5E7EB]" />}
            </div>
            <p className="pb-4 text-sm font-semibold text-gray-600">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToastViewport({ toasts, onDismiss }: { toasts: AdminToast[]; onDismiss: (toastId: string) => void }) {
  const colors = {
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-800',
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    warning: 'border-orange-200 bg-orange-50 text-orange-800'
  };

  return (
    <div className="fixed right-4 top-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            className={`rounded-2xl border p-4 shadow-lg ${colors[toast.type || 'info']}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black">{toast.title}</p>
                {toast.message && <p className="mt-1 text-sm opacity-80">{toast.message}</p>}
              </div>
              <button onClick={() => onDismiss(toast.id)} className="rounded-lg p-1 opacity-70 hover:bg-white/60">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function AdminDataTable({
  resourceKey,
  title,
  singular,
  records,
  columns,
  filters,
  formFields
}: {
  resourceKey: string;
  title: string;
  singular: string;
  records: AdminRecord[];
  columns: AdminColumn[];
  filters: AdminFilter[];
  formFields: string[];
}) {
  const { addRecord, updateRecord, deleteRecord, bulkDeleteRecords, changeStatus, addToast } = useAdminData();
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState(columns[0]?.key || 'name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [drawerRecord, setDrawerRecord] = useState<AdminRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<AdminRecord | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const pageSize = 6;

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records
      .filter((record) => {
        const matchesSearch =
          !query ||
          Object.values(record).some((value) => String(value || '').toLowerCase().includes(query));
        const matchesFilters = Object.entries(filterValues).every(([key, value]) => !value || String(record[key]) === value);
        return matchesSearch && matchesFilters;
      })
      .sort((first, second) => {
        const firstValue = String(first[sortKey] || '');
        const secondValue = String(second[sortKey] || '');
        return sortDirection === 'asc' ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
      });
  }, [records, search, filterValues, sortKey, sortDirection]);

  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected = paginatedRecords.length > 0 && paginatedRecords.every((record) => selectedIds.includes(record.id));

  const toggleSort = (key: string) => {
    setSortKey(key);
    setSortDirection((current) => (sortKey === key && current === 'asc' ? 'desc' : 'asc'));
  };

  const submitRecord = (values: Partial<AdminRecord>, existing?: AdminRecord | null) => {
    const nextRecord: AdminRecord = {
      id: existing?.id || `${resourceKey}-${Date.now()}`,
      name: String(values.name || existing?.name || `New ${singular}`),
      status: String(values.status || existing?.status || 'Pending'),
      date: String(existing?.date || new Date().toISOString().slice(0, 10)),
      description: String(values.description || existing?.description || 'Created in the mock admin dashboard.'),
      ...existing,
      ...values
    };

    if (existing) {
      updateRecord(resourceKey, existing.id, nextRecord);
      addToast({ title: `${singular} updated`, message: `${nextRecord.name} has been updated.`, type: 'success' });
    } else {
      addRecord(resourceKey, nextRecord);
      addToast({ title: `${singular} created`, message: `${nextRecord.name} is now visible in the table.`, type: 'success' });
    }

    setEditingRecord(null);
    setIsAdding(false);
  };

  const renderCell = (record: AdminRecord, column: AdminColumn) => {
    const value = record[column.key];

    if (column.type === 'status') return <StatusBadge status={formatValue(value)} />;
    if (column.type === 'currency') return <span className="font-black text-[#111827]">R{Number(value || 0).toLocaleString('en-ZA')}</span>;
    if (column.type === 'rating') return <span className="font-black text-[#111827]">{formatValue(value)} / 5</span>;
    if (column.type === 'image') {
      return value ? <img src={String(value)} alt={record.name} className="h-12 w-16 rounded-xl object-cover" /> : <UserAvatar name={record.name} />;
    }
    if (column.type === 'boolean') return <StatusBadge status={value ? 'Active' : 'Draft'} />;

    return <span className="line-clamp-2 text-sm font-semibold text-gray-600">{formatValue(value)}</span>;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row">
            <SearchInput
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              placeholder={`Search ${title.toLowerCase()}...`}
            />
            <DateRangePicker />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <FilterDropdown
                key={filter.key}
                label={filter.label}
                value={filterValues[filter.key] || ''}
                options={filter.options}
                onChange={(value) => {
                  setFilterValues((current) => ({ ...current, [filter.key]: value }));
                  setPage(1);
                }}
              />
            ))}
            <ExportButton
              onCsv={() => {
                downloadCsv(`${resourceKey}.csv`, filteredRecords, columns);
                addToast({ title: 'CSV exported', message: `${filteredRecords.length} ${title.toLowerCase()} exported.`, type: 'success' });
              }}
              onPdf={() => addToast({ title: 'PDF export queued', message: 'TODO: connect server-side PDF export.', type: 'info' })}
            />
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E50914] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#c90812]">
              <Plus size={17} />
              Add
            </button>
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#111827] p-3 text-white">
            <p className="text-sm font-bold">{selectedIds.length} selected</p>
            <div className="flex flex-wrap gap-2">
              {['Approved', 'Suspended', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    changeStatus(resourceKey, selectedIds, status);
                    addToast({ title: 'Bulk status updated', message: `${selectedIds.length} records changed to ${status}.`, type: 'success' });
                    setSelectedIds([]);
                  }}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-white/20">
                  Mark {status}
                </button>
              ))}
              <button
                onClick={() =>
                  setConfirmAction({
                    title: 'Delete selected records?',
                    message: 'This removes the selected mock records from the current admin session.',
                    onConfirm: () => {
                      bulkDeleteRecords(resourceKey, selectedIds);
                      addToast({ title: 'Records deleted', message: `${selectedIds.length} records removed.`, type: 'warning' });
                      setSelectedIds([]);
                    }
                  })
                }
                className="rounded-lg bg-[#E50914] px-3 py-2 text-xs font-black text-white">
                Delete selected
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E7EB]">
            <thead className="bg-[#F5F6FA]">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={(event) => {
                      const pageIds = paginatedRecords.map((record) => record.id);
                      setSelectedIds((current) =>
                        event.target.checked
                          ? Array.from(new Set([...current, ...pageIds]))
                          : current.filter((id) => !pageIds.includes(id))
                      );
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-[#E50914] focus:ring-[#E50914]"
                  />
                </th>
                {columns.map((column) => (
                  <th key={column.key} className="whitespace-nowrap px-4 py-3 text-left">
                    <button
                      onClick={() => toggleSort(column.key)}
                      className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wide text-gray-500 hover:text-[#E50914]">
                      {column.label}
                      <ChevronDown size={14} className={sortKey === column.key && sortDirection === 'desc' ? 'rotate-180' : ''} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {paginatedRecords.map((record) => (
                <tr key={record.id} className="transition hover:bg-[#F5F6FA]">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(record.id)}
                      onChange={(event) => {
                        setSelectedIds((current) =>
                          event.target.checked ? [...current, record.id] : current.filter((id) => id !== record.id)
                        );
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-[#E50914] focus:ring-[#E50914]"
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key} className="max-w-[240px] whitespace-nowrap px-4 py-3 align-middle">
                      {renderCell(record, column)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ActionMenu
                        onView={() => setDrawerRecord(record)}
                        onEdit={() => setEditingRecord(record)}
                        onStatus={() => {
                          const nextStatus = record.status === 'Active' || record.status === 'Published' ? 'Suspended' : 'Approved';
                          changeStatus(resourceKey, [record.id], nextStatus);
                          addToast({ title: 'Status updated', message: `${record.name} is now ${nextStatus}.`, type: 'success' });
                        }}
                        onDelete={() =>
                          setConfirmAction({
                            title: `Delete ${singular.toLowerCase()}?`,
                            message: `${record.name} will be removed from this mock dashboard session.`,
                            onConfirm: () => {
                              deleteRecord(resourceKey, record.id);
                              addToast({ title: `${singular} deleted`, message: `${record.name} was removed.`, type: 'warning' });
                            }
                          })
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginatedRecords.length === 0 ? (
          <div className="p-4">
            <EmptyState
              actionLabel="Clear filters"
              onAction={() => {
                setSearch('');
                setFilterValues({});
              }}
            />
          </div>
        ) : (
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        )}
      </div>

      <FormModal
        open={isAdding}
        title={`Add ${singular}`}
        fields={formFields}
        initialValues={{ status: filters[0]?.options[0] || 'Pending' }}
        onSubmit={(values) => submitRecord(values)}
        onClose={() => setIsAdding(false)}
      />
      <FormModal
        open={Boolean(editingRecord)}
        title={`Edit ${singular}`}
        fields={formFields}
        initialValues={editingRecord || undefined}
        onSubmit={(values) => submitRecord(values, editingRecord)}
        onClose={() => setEditingRecord(null)}
      />
      <ConfirmModal
        open={Boolean(confirmAction)}
        title={confirmAction?.title || ''}
        message={confirmAction?.message || ''}
        confirmLabel="Confirm"
        onConfirm={() => {
          confirmAction?.onConfirm();
          setConfirmAction(null);
        }}
        onClose={() => setConfirmAction(null)}
      />
      <DetailDrawer open={Boolean(drawerRecord)} record={drawerRecord} onClose={() => setDrawerRecord(null)} />
    </div>
  );
}

export function UploadPlaceholder() {
  return (
    <button className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#E5E7EB] px-4 py-3 text-sm font-black text-gray-500 hover:border-[#E50914] hover:text-[#E50914]">
      <Upload size={16} />
      Upload placeholder
    </button>
  );
}
