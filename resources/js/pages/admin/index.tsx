import { Head } from '@inertiajs/react';
import { CreditCard, DollarSign, ShieldCheck, Users, UserCheck } from 'lucide-react';

type AdminUser = {
  name: string;
  email: string;
};

type Payment = {
  id: number;
  amount: string;
  currency: string;
  status: string;
  provider: string | null;
  payment_reference: string | null;
  paid_at: string | null;
  user: AdminUser;
};

type Props = {
  totalUsers: number;
  activeUsers: number;
  paidUsers: number;
  paymentCount: number;
  totalRevenue: string | number;
  recentPayments: Payment[];
};

const formatMoney = (amount: string | number, currency = 'USD') =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(Number(amount));

export default function AdminDashboard({
  totalUsers,
  activeUsers,
  paidUsers,
  paymentCount,
  totalRevenue,
  recentPayments,
}: Props) {
  const stats = [
    { label: 'Total users', value: totalUsers, icon: Users, iconClass: 'text-blue-600' },
    { label: 'Active now', value: activeUsers, icon: UserCheck, iconClass: 'text-emerald-600' },
    { label: 'Paid users', value: paidUsers, icon: ShieldCheck, iconClass: 'text-violet-600' },
    { label: 'Payments', value: paymentCount, icon: CreditCard, iconClass: 'text-amber-600' },
    { label: 'Revenue', value: formatMoney(totalRevenue), icon: DollarSign, iconClass: 'text-slate-600' },
  ];

  return (
    <>
      <Head title="Admin dashboard" />

      <main className="space-y-8 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Admin center</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Users & payments</h1>
            <p className="mt-2 text-slate-500">Monitor account activity and successful payments in one place.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            Active users = login activity in last 30 minutes
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                  <Icon className={`size-5 ${stat.iconClass}`} />
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">Recent payments</h2>
            <p className="mt-1 text-sm text-slate-500">Successful and pending payment records from your users.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Provider</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Paid at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{payment.user.name}</p>
                      <p className="text-xs text-slate-500">{payment.user.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {formatMoney(payment.amount, payment.currency)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{payment.provider ?? 'Manual'}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${payment.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {payment.paid_at ? new Date(payment.paid_at).toLocaleString() : 'Not paid'}
                    </td>
                  </tr>
                ))}
                {recentPayments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No payment records yet. Connect your payment provider to start recording payments.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}

AdminDashboard.layout = {
  breadcrumbs: [
    {
      title: 'Admin dashboard',
      href: '/admin',
    },
  ],
};
