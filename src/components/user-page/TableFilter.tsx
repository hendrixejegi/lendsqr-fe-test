import '@/scss/table-filter.scss';

import { type SubmitHandler, useForm } from 'react-hook-form';

export type FilterInputs = {
  organization: string;
  username: string;
  email: string;
  date: string;
  tel: string;
  status: string;
};

export const TableFilter = ({
  organizations,
  updateFilters,
}: {
  organizations: string[];
  updateFilters(data: FilterInputs): void;
}) => {
  const statuses: Status[] = ['active', 'blacklisted', 'pending'];

  const { register, handleSubmit, reset } = useForm<FilterInputs>({
    defaultValues: {
      organization: '',
      username: '',
      email: '',
      date: '',
      tel: '',
      status: '',
    },
  });

  const onSubmit: SubmitHandler<FilterInputs> = (data) => {
    updateFilters(data);

    // Close popover
    const popover = document.getElementById('table-filter') as HTMLElement & {
      hidePopover?: () => void;
    };
    if (popover?.hidePopover) {
      popover.hidePopover();
    }
  };

  return (
    <div popover="auto" id="table-filter" className="table-filter">
      <form id="user-table-filter" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="organization">Organization</label>
          <select
            {...register('organization')}
            id="organization"
            className="input"
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option value={org} key={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            {...register('username')}
            type="text"
            id="username"
            className="input"
            placeholder="User"
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="input"
            placeholder="User"
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">Date</label>
          <input
            {...register('date')}
            type="date"
            id="date"
            className="input"
            placeholder="User"
          />
        </div>
        <div className="input-container">
          <label htmlFor="tel">Phone Number</label>
          <input
            {...register('tel')}
            type="tel"
            id="tel"
            className="input"
            placeholder="User"
          />
        </div>
        <div className="input-container">
          <label htmlFor="status">Status</label>
          <select {...register('status')} id="status" className="input">
            <option value="">Select</option>
            {statuses.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            reset();
            updateFilters({
              date: '',
              email: '',
              organization: '',
              status: '',
              tel: '',
              username: '',
            });
          }}
        >
          Reset
        </button>
        <button form="user-table-filter" type="submit" className="button">
          Filter
        </button>
      </div>
    </div>
  );
};
